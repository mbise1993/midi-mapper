import React from 'react';
import { FaTrash as DeleteIcon } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

import FileInput from './FileInput';
import { PageSection } from './PageSection';

import styles from './MidiFilesView.module.scss';

interface MidiFilesViewProps {
  files: File[];
  onFilesSelected(files: File[]): void;
  onDeleteClick(file: File): void;
}

export const MidiFilesView: React.FC<MidiFilesViewProps> = ({
  files,
  onFilesSelected,
  onDeleteClick,
}) => {
  const { getRootProps } = useDropzone({
    onDropAccepted: (files: File[]) => {
      onFilesSelected(files);
    },
  });

  const onMidiFilesChange = (e: React.FormEvent<HTMLInputElement>) => {
    const updatedFiles: File[] = [];
    for (let i = 0; i < e.currentTarget.files.length; ++i) {
      updatedFiles.push(e.currentTarget.files.item(i));
    }

    onFilesSelected(updatedFiles);
  };

  const renderPlaceholder = () => {
    return (
      <div className={styles.placeholderContainer}>
        <span>Drag and drop or select MIDI files to map</span>
      </div>
    );
  };

  const renderList = () => {
    return (
      <ul className="mm-list">
        {files.map(file => (
          <li key={file.name} className="mm-list-item">
            <span>{file.name}</span>
            <button className="mm-btn-icon" onClick={() => onDeleteClick(file)}>
              <DeleteIcon />
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <PageSection
      {...getRootProps()}
      title="MIDI Files"
      headerRight={
        <FileInput
          multiple
          inputText=""
          buttonText="Select MIDI Files"
          onChange={onMidiFilesChange}
        />
      }
    >
      {files.length === 0 ? renderPlaceholder() : renderList()}
    </PageSection>
  );
};
