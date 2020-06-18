import React from 'react';
import { Box, Button, ButtonProps, Typography } from '@material-ui/core';

interface FileInputProps {
  inputText?: string;
  buttonText?: string;
  buttonVariant?: ButtonProps['variant'];
  buttonColor?: ButtonProps['color'];
  multiple?: boolean;
  onChange(e: React.FormEvent<HTMLInputElement>): void;
}

export default function FileInput({
  inputText = 'Choose file...',
  buttonText = 'Browse',
  buttonVariant = 'contained',
  buttonColor,
  multiple = false,
  onChange,
}: FileInputProps) {
  return (
    <Box display="flex" alignItems="center">
      <Typography>{inputText}</Typography>
      <Button component="label" size="small" variant={buttonVariant} color={buttonColor}>
        {buttonText}
        <input hidden multiple={multiple} type="file" onChange={onChange} />
      </Button>
    </Box>
  );
}
