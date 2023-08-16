import Head from "next/head";
import "@Pokedex/styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Pokedex App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
