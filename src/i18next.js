import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18next
  .use(initReactI18next)
  //   .use(i18nextBrowserLanguageDetector)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: "en",
    debug: true,
    // resources: {
    //   en: {
    //     translation: {
    //       welcomePage: {
    //         header: "Record daily water intake and track",
    //         name: "Water consumption tracker",
    //         tryTracker: "Try tracker",
    //         signIn: "Sign in",
    //       },
    //       advantagesSection: {
    //         happyCustomers_one:
    //           "Our <span>{{allUsersCount}} happy</span><br/> customer",
    //         happyCustomers_other:
    //           "Our <span>{{allUsersCount}} happy</span><br/> customers",
    //         habitDrive: "Habit drive",
    //         viewStatistics: "View statistics",
    //         personalRateSettings: "Personal rate setting",
    //       },
    //       error: {
    //         404: "Not found",
    //         unknown: "Some strange",
    //       },
    //     },
    //   },
    //   ua: {
    //     translation: {
    //       welcomePage: {
    //         header: "Реєструйте щоденне споживання води та відстежуйте його",
    //         name: "Трекер споживання води",
    //         tryTracker: "Спробуйте трекер",
    //         signIn: "Увійти",
    //       },
    //       advantagesSection: {
    //         happyCustomers_one:
    //           "Наш <span>{{allUsersCount}} щасливий</span><br/> клієнт",
    //         happyCustomers_two:
    //           "Наші <span>{{allUsersCount}} щасливиx</span><br/> клієнти",
    //         happyCustomers_other:
    //           "Наші <span>{{allUsersCount}} щасливих</span><br/> клієнтів",
    //         habitDrive: "Мотивація до звичок",
    //         viewStatistics: "Переглянути статистику",
    //         personalRateSettings: "Налаштування параметрів",
    //       },
    //       error: {
    //         404: "Not found",
    //         unknown: "Some strange",
    //       },
    //     },
    //   },
    // },
    interpolation: {
      escapeValue: false, // For React, this is typically false
    },
  });
