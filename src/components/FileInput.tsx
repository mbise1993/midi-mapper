import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';

interface FileInputProps {
  inputText?: string;
  buttonText?: string;
  multiple?: boolean;
  onChange(e: React.FormEvent<HTMLInputElement>): void;
}

export default function FileInput({
  inputText = 'Choose file...',
  buttonText = 'Browse',
  multiple = false,
  onChange,
}: FileInputProps) {
  return (
    <Box display="flex" alignItems="center">
      <Typography>{inputText}</Typography>
      <Button component="label" size="small" variant="contained" color="primary">
        {buttonText}
        <input hidden multiple={multiple} type="file" onChange={onChange} />
      </Button>
    </Box>
  );
}
