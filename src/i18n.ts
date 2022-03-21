import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  zh: {
    translation: {},
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zh",
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
