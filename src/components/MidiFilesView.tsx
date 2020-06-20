import React from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { useDropzone } from 'react-dropzone';

import FileInput from './FileInput';
import { PageSection } from './PageSection';

const PlaceholderText = withStyles({
  root: {
    textAlign: 'center',
  },
})(Typography);

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
      <Box
        width="100%"
        marginTop={12}
        padding={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <PlaceholderText variant="h6" color="textSecondary">
          Drag and drop or select MIDI files to map
        </PlaceholderText>
      </Box>
    );
  };

  const renderList = () => {
    return (
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
    );
  };

  return (
    <PageSection
      {...getRootProps()}
      title="MIDI Files"
      height="100%"
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
