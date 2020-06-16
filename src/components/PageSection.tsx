import React from 'react';
import { Box, BoxProps, Typography, useTheme } from '@material-ui/core';

interface PageSectionProps extends BoxProps {
  title: string;
  headerRight?: React.ReactElement;
}

export const PageSection: React.FC<PageSectionProps> = ({
  title,
  headerRight,
  children,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Box
      bgcolor="white"
      borderRadius={4}
      overflow="auto"
      flex={1}
      display="flex"
      flexDirection="column"
      {...rest}
    >
      <Box
        bgcolor={theme.palette.grey[200]}
        padding={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">{title}</Typography>
        {headerRight}
      </Box>
      {children}
    </Box>
  );
};
