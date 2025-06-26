import { useState, useCallback } from 'react';
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
    const queryClient = useQueryClient();
    const [translatingKeys, setTranslatingKeys] = useState<Set<string>>(new Set());
    const [currentLanguage, _setCurrentLanguage] = useState<string>(() => localStorage.getItem('currentLanguage') || 'en');

    const setCurrentLanguage = (lang: string) => {
        localStorage.setItem('currentLanguage', lang);
        _setCurrentLanguage(lang);
    };

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

    const t = useCallback((text: string, languageFrom: string = 'en'): string => {
        const languageTo = currentLanguage;
        if (languageTo === languageFrom) {
            return text;
        }

        const key = `${languageTo}:${text}:${languageFrom}`;
        const cachedTranslation = queryClient.getQueryData<TranslateResponse>(['translation', key]);

        if (cachedTranslation) {
            return cachedTranslation.translated_text;
        }

        if (!translatingKeys.has(key)) {
            setTranslatingKeys(prev => new Set(prev).add(key));
            mutate({ text, languageTo, languageFrom });
        }

        return text;
    }, [mutate, queryClient, translatingKeys, currentLanguage]);

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
