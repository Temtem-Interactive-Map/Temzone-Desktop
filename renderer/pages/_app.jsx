import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from "swr";
import packageJson from "../../package.json";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig>
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
    </SWRConfig>
  );
}
