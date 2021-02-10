import Image from 'next/image';
import React from 'react';
import { FaGithub as GithubIcon } from 'react-icons/fa';

import styles from './Header.module.scss';

const IMAGE_HEIGHT = 32;
const IMAGE_WIDTH = IMAGE_HEIGHT * 6.5;

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Image
        src="/logo.png"
        alt="MIDI Mapper"
        height={`${IMAGE_HEIGHT}px`}
        width={`${IMAGE_WIDTH}px`}
      />
      <a
        href="https://github.com/mbise1993/midi-mapper/blob/master/README.md"
        target="_blank"
        rel="noreferrer"
      >
        Documentation&nbsp;
        <GithubIcon size="1.5em" />
      </a>
    </div>
  );
};
