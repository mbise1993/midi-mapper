import FileInput from './FileInput';
import React from 'react';
import { FaInfo as InfoIcon } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

import { DEFAULT_MAPPING_TEXT } from '../services/mappingConfig';
import { PageSection } from './PageSection';

import styles from './MappingConfigView.module.scss';

const LOWEST_OCTAVE_INFO_TEXT = `Set this to the lowest octave that your MIDI editor uses 
to ensure that the notes are mapped correctly`;

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
  const { getRootProps } = useDropzone({
    accept: 'text/plain',
    onDropAccepted: (files: File[]) => {
      files[0].text().then(onTextChange);
    },
  });

  const onFileSelected = async (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files.length > 0) {
      const text = await files.item(0).text();
      onTextChange(text);
    }
  };

  return (
    <PageSection
      {...getRootProps()}
      title="Mappings"
      headerRight={
        <div className={styles.headerRightContainer}>
          <InfoIcon title={LOWEST_OCTAVE_INFO_TEXT} />
          <select
            placeholder="Lowest octave"
            value={lowestOctave}
            onChange={e => onLowestOctaveChange(parseInt(e.target.value))}
          >
            <option value={-2}>-2</option>
            <option value={-1}>-1</option>
            <option value={0}>0</option>
          </select>
          <FileInput inputText="" buttonText="Import Mappings" onChange={onFileSelected} />
        </div>
      }
    >
      <input
        placeholder={DEFAULT_MAPPING_TEXT}
        value={text}
        onChange={e => onTextChange(e.target.value)}
      />
    </PageSection>
  );
};
