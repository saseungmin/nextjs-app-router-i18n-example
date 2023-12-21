import { initReactI18next } from 'react-i18next/initReactI18next';

import { createInstance } from 'i18next';

import { Language } from '@/types/i18n';
import { i18nConfig } from '@/utils/i18n';

type InitI18nInstance = {
  lang: Language;
  translationsData?: Record<string, string>;
};

const initI18nInstance = async ({ lang }: InitI18nInstance) => {
  const i18nInstance = createInstance();

  await i18nInstance.use(initReactI18next).init({
    debug: false,
    supportedLngs: i18nConfig.locales,
    fallbackLng: i18nConfig.defaultLocale,
    lng: lang,
    fallbackNS: i18nConfig.defaultNameSpace,
    defaultNS: i18nConfig.defaultNameSpace,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    ns: [i18nConfig.defaultNameSpace],
    // resources: {
    //   [lang]: {
    //     [i18nConfig.defaultNameSpace]: translationsData || undefined,
    //   },
    // },
    preload: typeof window === 'undefined' ? i18nConfig.locales : [],
  });

  return i18nInstance;
};

export default initI18nInstance;
