import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaGithub as GithubIcon } from 'react-icons/fa';

import styles from './Page.module.scss';

export const Page: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>MIDI Mapper</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <div className={styles.header}>
        <Image src="/logo.png" alt="MIDI Mapper" height="40px" width="40px" />
        <div className="headerRight">
          <Link href="https://github.com/mbise1993/midi-mapper/blob/master/README.md">
            <a target="_blank">Documentation</a>
          </Link>
          <GithubIcon className="githubIcon" fontSize="small" />
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
