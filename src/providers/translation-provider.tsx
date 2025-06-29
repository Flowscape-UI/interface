import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    TranslationContext,
    type Language,
    type TranslateParams,
    type TranslateResponse,
} from '@/context/translation-context';

// --- API Functions ---
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

const getLanguages = async (): Promise<Language[]> => {
    const response = await fetch(`${API_URL}/get-supported-languages`);
    if (!response.ok) {
        throw new Error('Network response was not ok when fetching languages.');
    }
    return response.json();
};

const postTranslate = async ({
    text,
    languageTo,
    languageFrom = 'en',
}: TranslateParams): Promise<TranslateResponse> => {
    if (languageFrom === languageTo) return { translated_text: text };
    const response = await fetch(`${API_URL}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language_to: languageTo, language_from: languageFrom }),
    });
    if (!response.ok) {
        const errorData = await response
            .json()
            .catch(() => ({ detail: 'Translation request failed.' }));
        throw new Error(errorData.detail || 'Failed to translate text.');
    }
    return response.json();
};

export function TranslationProvider({ children }: { children: ReactNode }) {
    const [isDetecting, setIsDetecting] = useState(true);
    const queryClient = useQueryClient();
    const [translatingKeys, setTranslatingKeys] = useState<Set<string>>(new Set());
    const [currentLanguage, _setCurrentLanguage] = useState<string>(
        () => localStorage.getItem('currentLanguage') || 'en',
    );
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
        error: languagesError,
    } = useQuery<Language[], Error>({
        queryKey: ['languages'],
        queryFn: getLanguages,
        staleTime: Infinity,
    });

    const {
        mutate,
        isPending: isTranslating,
        error: translationError,
    } = useMutation<TranslateResponse, Error, TranslateParams>({
        mutationFn: postTranslate,
        onSuccess: (data, variables) => {
            const key = `${variables.languageTo}:${variables.text}:${variables.languageFrom || 'en'}`;
            queryClient.setQueryData(['translation', key], data);
            setTranslatingKeys((prev) => {
                const next = new Set(prev);
                next.delete(key);
                return next;
            });
        },
        onError: (_err, variables) => {
            const key = `${variables.languageTo}:${variables.text}:${variables.languageFrom || 'en'}`;
            setTranslatingKeys((prev) => {
                const next = new Set(prev);
                next.delete(key);
                return next;
            });
        },
    });

    useEffect(() => {
        const detectAndSetLanguage = async () => {
            if (localStorage.getItem('currentLanguage')) {
                setIsDetecting(false);
                return;
            }
            if (isLoadingLanguages || !languages) return;

            try {
                const response = await fetch('http://ip-api.com/json/?fields=status,countryCode');
                if (response.ok) {
                    const data = await response.json();
                    if (data.status === 'success' && data.countryCode) {
                        const detectedLangCode = data.countryCode.toLowerCase();
                        const isSupported = languages.some(
                            (lang) => lang.code === detectedLangCode,
                        );
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

    const t = useCallback(
        (text: string, languageFrom: string = 'en'): string => {
            const languageTo = currentLanguage;
            if (languageTo === languageFrom) return text;

            const newKey = `${languageTo}:${text}:${languageFrom}`;
            const newCachedTranslation = queryClient.getQueryData<TranslateResponse>([
                'translation',
                newKey,
            ]);

            if (isDetecting) return text;
            if (newCachedTranslation) return newCachedTranslation.translated_text;

            if (!translatingKeys.has(newKey)) {
                setTranslatingKeys((prev) => new Set(prev).add(newKey));
                mutate({ text, languageTo, languageFrom });
            }

            const previousLanguage = previousLanguageRef.current;
            if (previousLanguage !== languageTo) {
                const oldKey = `${previousLanguage}:${text}:${languageFrom}`;
                const oldCachedTranslation = queryClient.getQueryData<TranslateResponse>([
                    'translation',
                    oldKey,
                ]);
                if (oldCachedTranslation) return oldCachedTranslation.translated_text;
            }

            return text;
        },
        [mutate, queryClient, translatingKeys, currentLanguage, isDetecting],
    );

    const value = {
        t,
        currentLanguage,
        setCurrentLanguage,
        isTranslating,
        translationError,
        languages,
        isLoadingLanguages,
        languagesError,
    };

    return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}
