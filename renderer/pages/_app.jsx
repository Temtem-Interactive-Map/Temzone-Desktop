import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Temzone</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
