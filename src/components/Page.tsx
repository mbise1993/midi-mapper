import React from 'react';
import { Container, ContainerProps } from '@material-ui/core';

interface PageProps extends ContainerProps {}

export const Page: React.FC<PageProps> = ({ children, ...rest }) => {
  const style: React.CSSProperties = {
    height: 'calc(100vh - 64px)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <Container style={style} {...rest}>
      {children}
    </Container>
  );
};
