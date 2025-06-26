import { useState, useCallback, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// --- Type Definitions ---

// Represents a single supported language
interface Language {
  code: string;
  language: string;
}

// The structure of the request body for the translation API
interface TranslateParams {
  text: string;
  languageTo: string;
  languageFrom?: string;
}

// The structure of the response from the translation API
interface TranslateResponse {
  translated_text: string;
}

// --- API Fetching Functions ---

/**
 * Fetches the list of supported languages from the server.
 * Corresponds to: GET /languages
 */

const API_URL = 'http://localhost:8000';

const getLanguages = async (): Promise<Language[]> => {
  const response = await fetch(`${API_URL}/get-supported-languages`); // Proxied via vite.config.ts
  if (!response.ok) {
    throw new Error('Network response was not ok when fetching languages.');
  }
  return response.json();
};

/**
 * Posts text to be translated to the server.
 * Corresponds to: POST /translate
 */
const postTranslate = async ({ text, languageTo, languageFrom = 'en' }: TranslateParams): Promise<TranslateResponse> => {
    if(languageFrom === languageTo) return { translated_text: text };
    const response = await fetch(`${API_URL}/translate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text,
            language_to: languageTo,
            language_from: languageFrom,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Translation request failed.' }));
        throw new Error(errorData.detail || 'Failed to translate text.');
    }

    return response.json();
};


// --- The Main Translation Hook ---

interface UseTranslationHook {
    /**
     * Function to trigger a translation. Returns the translated text or the original text if not yet translated.
     * @param text The text to translate.
     * @param languageFrom The source language code (optional, defaults to 'en').
     */
    t: (text: string, languageFrom?: string) => string;
    /**
     * The currently selected target language.
     */
    currentLanguage: string;
    /**
     * Function to set the target language.
     * @param language The language code to set.
     */
    setCurrentLanguage: (language: string) => void;
    /**
     * Boolean indicating if any translation is currently in progress.
     */
    isTranslating: boolean;
    /**
     * An error object if the last translation failed.
     */
    translationError: Error | null;
    /**
     * The list of supported languages.
     */
    languages: Language[] | undefined;
    /**
     * Boolean indicating if the language list is currently being fetched.
     */
    isLoadingLanguages: boolean;
    /**
     * An error object if fetching languages failed.
     */
    languagesError: Error | null;
}

/**
 * A hook for handling translations using TanStack Query.
 * Provides methods to fetch supported languages and translate text in a way similar to i18n libraries.
 */
export function useTranslation(): UseTranslationHook {
    const [isDetecting, setIsDetecting] = useState(true);
    const queryClient = useQueryClient();
    const [translatingKeys, setTranslatingKeys] = useState<Set<string>>(new Set());
        const [currentLanguage, _setCurrentLanguage] = useState<string>(() => localStorage.getItem('currentLanguage') || 'en');
    const previousLanguageRef = useRef<string>(currentLanguage);

    useEffect(() => {
        previousLanguageRef.current = currentLanguage;
    }, [currentLanguage]);

    const setCurrentLanguage = useCallback((lang: string) => {
        localStorage.setItem('currentLanguage', lang);
        _setCurrentLanguage(lang);
    }, []);

    const { 
        data: languages, 
        isLoading: isLoadingLanguages, 
        error: languagesError 
    } = useQuery<Language[], Error>({
        queryKey: ['languages'],
        queryFn: getLanguages,
        staleTime: Infinity,
    });

    const { mutate, isPending: isTranslating, error: translationError } = useMutation<TranslateResponse, Error, TranslateParams>({
        mutationFn: postTranslate,
        onSuccess: (data, variables) => {
            const key = `${variables.languageTo}:${variables.text}:${variables.languageFrom || 'en'}`;
            queryClient.setQueryData(['translation', key], data);
            setTranslatingKeys(prev => {
                const next = new Set(prev);
                next.delete(key);
                return next;
            });
        },
        onError: (_err, variables) => {
            const key = `${variables.languageTo}:${variables.text}:${variables.languageFrom || 'en'}`;
            setTranslatingKeys(prev => {
                const next = new Set(prev);
                next.delete(key);
                return next;
            });
        },
    });

    useEffect(() => {
        const detectAndSetLanguage = async () => {
            // Skip if a language is already set in localStorage
            if (localStorage.getItem('currentLanguage')) {
                setIsDetecting(false);
                return;
            }

            // Wait until languages are loaded
            if (isLoadingLanguages || !languages) {
                return;
            }

            try {
                const response = await fetch('http://ip-api.com/json/?fields=status,countryCode');
                if (response.ok) {
                    const data = await response.json();
                    if (data.status === 'success' && data.countryCode) {
                        const detectedLangCode = data.countryCode.toLowerCase();
                        const isSupported = languages.some(lang => lang.code === detectedLangCode);

                        if (isSupported) {
                            setCurrentLanguage(detectedLangCode);
                        }
                    }
                }
            } catch (error) {
                console.error('Error detecting language by IP:', error);
            } finally {
                setIsDetecting(false);
            }
        };

        detectAndSetLanguage();
    }, [languages, isLoadingLanguages, setCurrentLanguage]);

    const t = useCallback((text: string, languageFrom: string = 'en'): string => {
        const languageTo = currentLanguage;
        if (languageTo === languageFrom) {
            return text;
        }

        // 1. Check for the desired (new) translation
        const newKey = `${languageTo}:${text}:${languageFrom}`;
        const newCachedTranslation = queryClient.getQueryData<TranslateResponse>(['translation', newKey]);

        if (isDetecting) return text; // Return original text while detecting language

        if (newCachedTranslation) {
            return newCachedTranslation.translated_text;
        }

        // 2. If not found, start fetching it in the background
        if (!translatingKeys.has(newKey)) {
            setTranslatingKeys(prev => new Set(prev).add(newKey));
            mutate({ text, languageTo, languageFrom });
        }

        // 3. While it's fetching, try to return the previous language's translation to avoid flicker
        const previousLanguage = previousLanguageRef.current;
        if (previousLanguage !== languageTo) {
            const oldKey = `${previousLanguage}:${text}:${languageFrom}`;
            const oldCachedTranslation = queryClient.getQueryData<TranslateResponse>(['translation', oldKey]);
            if (oldCachedTranslation) {
                return oldCachedTranslation.translated_text;
            }
        }

        // 4. If all else fails, return the original text
        return text;
    }, [mutate, queryClient, translatingKeys, currentLanguage, isDetecting]);

    return {
        t,
        currentLanguage,
        setCurrentLanguage,
        isTranslating,
        translationError,
        languages,
        isLoadingLanguages,
        languagesError,
    };
};
