import FileInput from './FileInput';
import React from 'react';
import { TextField } from '@material-ui/core';

import { PageSection } from './PageSection';

const PLACEHOLDER_TEXT = `Name: This is an example mapping

C1 to D0
G#1 to A3
B5 to F-1`;

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
      <TextField
        multiline
        variant="outlined"
        rows={30}
        placeholder={PLACEHOLDER_TEXT}
        value={text}
        onChange={e => onTextChange(e.target.value)}
      />
    </PageSection>
  );
};
