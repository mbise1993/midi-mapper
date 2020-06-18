import FileInput from './FileInput';
import React from 'react';
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';

import { DEFAULT_MAPPING_TEXT } from '../services/mappingConfig';
import { PageSection } from './PageSection';

const DenseSelect = withStyles({
  root: {
    '& .MuiOutlinedInput-input': {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
  },
})(TextField);

const MultilineInput = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderWidth: 0,
      },
      '&:hover fieldset': {
        borderWidth: 0,
      },
      '&.Mui-focused fieldset': {
        borderWidth: 0,
      },
    },
  },
})(TextField);

interface MappingConfigViewProps {
  middleC: number;
  text: string;
  onMiddleCChange(value: number): void;
  onTextChange(text: string): void;
}

export const MappingConfigView: React.FC<MappingConfigViewProps> = ({
  middleC,
  text,
  onMiddleCChange,
  onTextChange,
}) => {
  const onFileSelected = async (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files.length > 0) {
      const text = await files.item(0).text();
      onTextChange(text);
    }
  };

  return (
    <PageSection
      title="Mappings"
      headerRight={
        <Box display="flex" alignItems="center">
          <DenseSelect
            select
            variant="outlined"
            value={middleC}
            InputProps={{
              style: {
                backgroundColor: 'white',
                height: '30px',
                paddingTop: '0px',
                paddingBottom: '0px',
              },
              startAdornment: (
                <InputAdornment disableTypography position="start">
                  <Typography color="textSecondary">Middle C</Typography>
                </InputAdornment>
              ),
            }}
            onChange={e => onMiddleCChange(parseInt(e.target.value))}
          >
            <MenuItem dense value={3}>
              C3
            </MenuItem>
            <MenuItem dense value={4}>
              C4
            </MenuItem>
          </DenseSelect>
          <Box marginLeft={1}>
            <FileInput inputText="" buttonText="Import Mapping File" onChange={onFileSelected} />
          </Box>
        </Box>
      }
    >
      <MultilineInput
        multiline
        variant="outlined"
        rows={20}
        placeholder={DEFAULT_MAPPING_TEXT}
        value={text}
        onChange={e => onTextChange(e.target.value)}
      />
    </PageSection>
  );
};
