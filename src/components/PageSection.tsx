import React from 'react';

import styles from './PageSection.module.scss';

interface PageSectionProps {
  title: string;
  headerRight?: React.ReactElement;
}

export const PageSection: React.FC<PageSectionProps> = ({ title, headerRight, children }) => {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.headerContainer}>
        <h3>{title}</h3>
        {headerRight}
      </div>
      {children}
    </div>
  );
};
