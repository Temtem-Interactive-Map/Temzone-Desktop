import Head from "next/head";
import packageJson from "../../package.json";

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{"Temzone " + packageJson.version}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
