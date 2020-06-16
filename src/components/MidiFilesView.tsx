import React from 'react';
import { Delete as DeleteIcon } from '@material-ui/icons';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';

import FileInput from './FileInput';
import { PageSection } from './PageSection';

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
  const onMidiFilesChange = (e: React.FormEvent<HTMLInputElement>) => {
    const updatedFiles: File[] = [];
    for (let i = 0; i < e.currentTarget.files.length; ++i) {
      updatedFiles.push(e.currentTarget.files.item(i));
    }

    onFilesSelected(updatedFiles);
  };

  return (
    <PageSection
      title="MIDI Files"
      headerRight={
        <FileInput inputText="" buttonText="Select MIDI Files" onChange={onMidiFilesChange} />
      }
    >
      <List>
        {files.map(file => (
          <>
            <ListItem key={file.name}>
              <ListItemText primary={file.name} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => onDeleteClick(file)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </PageSection>
  );
};
