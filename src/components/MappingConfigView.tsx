import FileInput from './FileInput';
import React from 'react';
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import { InfoOutlined as InfoIcon } from '@material-ui/icons';

import { DEFAULT_MAPPING_TEXT } from '../services/mappingConfig';
import { PageSection } from './PageSection';

const MIDDLE_C_INFO_TEXT = `Different MIDI editors use different values 
for middle C. As a rule of thumb, if your editor's lowest note is C-2, 
this should be set to C3. If the lowest note is C-1, this should be set to 
C4`;

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
          <Tooltip arrow placement="left" enterDelay={10} title={MIDDLE_C_INFO_TEXT}>
            <InfoIcon />
          </Tooltip>
          <Box marginLeft={1}>
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
          </Box>
          <Box marginLeft={2}>
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
