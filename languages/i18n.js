import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./english.json";
import portuguese from "./portuguese.json";
import * as RNLocalize from "react-native-localize";

const languageDetector = {
  type: "languageDetector",

  async: "true",
  detect: (callback) => {
    return callback(RNLocalize.getLocales()[0].languageCode);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    resources: { en: english, pt: portuguese },
    react: { useSuspense: false },
  });
export default i18next;
