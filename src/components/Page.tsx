import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaGithub as GithubIcon } from 'react-icons/fa';

import styles from './Page.module.scss';

export const Page: React.FC = ({ children }) => {
  return (
    <div>
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
