import FileInput from './FileInput';
import React from 'react';
import { TextField, withStyles } from '@material-ui/core';

import { DEFAULT_MAPPING_TEXT } from '../services/mappingConfig';
import { PageSection } from './PageSection';

const MultilineTextField = withStyles({
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
  text: string;
  onTextChange(text: string): void;
}

export const MappingConfigView: React.FC<MappingConfigViewProps> = ({ text, onTextChange }) => {
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
        <FileInput inputText="" buttonText="Import Mapping File" onChange={onFileSelected} />
      }
    >
      <MultilineTextField
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
