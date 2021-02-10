import Head from 'next/head';
import React from 'react';
import { AppProps } from 'next/app';

import './global.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>MIDI Mapper</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
