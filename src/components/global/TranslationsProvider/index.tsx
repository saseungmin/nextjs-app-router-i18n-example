'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import { i18n as i18nType } from 'i18next';

import { i18nConfig } from 'src/utils/i18n';
import { Language } from '@/types/i18n';
import initI18nInstance from 'app/i18n';

let i18n: i18nType | undefined;

interface Props {
  lang: Language;
  translationsData: Record<string, string>;
}

function TranslationsProvider({ children, lang, translationsData }: PropsWithChildren<Props>) {
  const [instance, setInstance] = useState<i18nType | undefined>(i18n);

  useEffect(() => {
    const init = async () => {
      if (!i18n) {
        const newInstance = await initI18nInstance({ lang, translationsData });
        i18n = newInstance;
        setInstance(newInstance);
        return;
      }

      if (i18n.language !== lang) {
        i18n.addResourceBundle(lang, i18nConfig.defaultNameSpace, translationsData);
        i18n.changeLanguage(lang);
      }
    };

    init();
  }, [lang, translationsData]);

  if (!instance) {
    return null;
  }

  return (
    <I18nextProvider i18n={instance} defaultNS={i18nConfig.defaultNameSpace}>
      {children}
    </I18nextProvider>
  );
}

export default TranslationsProvider;
