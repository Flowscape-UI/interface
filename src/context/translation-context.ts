import { createContext } from 'react';

// --- Type Definitions ---
export interface Language {
    code: string;
    language: string;
}

export interface TranslateParams {
    text: string;
    languageTo: string;
    languageFrom?: string;
}

export interface TranslateResponse {
    translated_text: string;
}

export interface TranslationContextType {
    t: (text: string, languageFrom?: string) => string;
    currentLanguage: string;
    setCurrentLanguage: (language: string) => void;
    isTranslating: boolean;
    translationError: Error | null;
    languages: Language[] | undefined;
    isLoadingLanguages: boolean;
    languagesError: Error | null;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);
