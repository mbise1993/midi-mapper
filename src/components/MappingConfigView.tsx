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

const LOWEST_OCTAVE_INFO_TEXT = `Set this to the lowest octave that your MIDI editor uses 
to ensure that the notes are mapped correctly`;

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
  lowestOctave: number;
  text: string;
  onLowestOctaveChange(value: number): void;
  onTextChange(text: string): void;
}

export const MappingConfigView: React.FC<MappingConfigViewProps> = ({
  lowestOctave,
  text,
  onLowestOctaveChange,
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
          <Tooltip arrow placement="left" enterDelay={10} title={LOWEST_OCTAVE_INFO_TEXT}>
            <InfoIcon />
          </Tooltip>
          <Box marginLeft={1}>
            <DenseSelect
              select
              variant="outlined"
              value={lowestOctave}
              InputProps={{
                style: {
                  backgroundColor: 'white',
                  height: '30px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                },
                startAdornment: (
                  <InputAdornment disableTypography position="start">
                    <Typography color="textSecondary">Lowest octave</Typography>
                  </InputAdornment>
                ),
              }}
              onChange={e => onLowestOctaveChange(parseInt(e.target.value))}
            >
              <MenuItem dense value={-2}>
                -2
              </MenuItem>
              <MenuItem dense value={-1}>
                -1
              </MenuItem>
              <MenuItem dense value={0}>
                0
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
