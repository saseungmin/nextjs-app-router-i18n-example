export type Language = 'ko' | 'en' | 'ja';

export type I18nConfig = {
  locales: Language[];
  defaultLocale: Language;
  defaultNameSpace: string;
};
