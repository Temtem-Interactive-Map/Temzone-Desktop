import Head from "next/head";
import packageJson from "package.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/globals.css";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 300,
        revalidateOnFocus: false,
      }}
    >
      <Head>
        <title>{"Temzone v." + packageJson.version}</title>
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
