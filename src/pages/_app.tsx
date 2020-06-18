import Head from 'next/head';
import React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  withStyles,
} from '@material-ui/core';
import { AppProps } from 'next/app';
import { GitHub as GitHubIcon } from '@material-ui/icons';

import theme from '../theme';

const StyledToolbar = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})(Toolbar);

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>MIDI Mapper</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" color="transparent">
          <StyledToolbar>
            <img src="/logo.png" alt="MIDI Mapper" height="40px" />
            <Box display="flex" alignItems="center">
              <Link
                href="https://github.com/mbise1993/midi-mapper/blob/master/README.md"
                target="_blank"
                color="textPrimary"
                title="View on GitHub"
              >
                Documentation
              </Link>
              <Box marginLeft="4px">
                <GitHubIcon fontSize="small" />
              </Box>
            </Box>
          </StyledToolbar>
        </AppBar>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
