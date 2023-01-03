import i18next, { use } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Head from "next/head";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from "swr";
import packageJson from "../../package.json";
import en from "../locales/en.json";
import "../styles/globals.css";

use(LanguageDetector)
  .use(initReactI18next)
  .init({
    load: "languageOnly",
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en"],
    resources: {
      en,
    },
    interpolation: {
      // Not needed for react as it escapes by default
      escapeValue: false,
    },
  });

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 300,
        revalidateOnFocus: false,
      }}
    >
      <I18nextProvider i18n={i18next}>
        <Head>
          <title>{"Temzone " + packageJson.version}</title>
        </Head>

        {/* Main content */}
        <div className="flex h-screen select-none">
          <Component {...pageProps} />
        </div>

        {/* Notification queue */}
        <ToastContainer
          draggable={false}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          theme="dark"
          className="select-none"
        />
      </I18nextProvider>
    </SWRConfig>
  );
}
