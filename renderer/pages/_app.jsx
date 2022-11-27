import Head from "next/head";
import packageJson from "../../package.json";

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
