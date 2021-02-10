import React from 'react';

import styles from './PageSection.module.scss';

interface PageSectionProps {
  title: string;
  headerRight?: React.ReactElement;
}

export const PageSection: React.FC<PageSectionProps> = React.forwardRef(
  ({ title, headerRight, children }, ref) => {
    return (
      <div ref={ref as any} className={styles.sectionContainer}>
        <div className={styles.headerContainer}>
          <h3>{title}</h3>
          {headerRight}
        </div>
        {children}
      </div>
    );
  },
);

PageSection.displayName = 'PageSection';
