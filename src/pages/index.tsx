import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
} from '@material-ui/core';

import { DEFAULT_MAPPING_TEXT } from '../services/mappingConfig';
import { MappingConfigView } from '../components/MappingConfigView';
import { MappingService } from '../services/mappingService';
import { MidiFilesView } from '../components/MidiFilesView';
import { Page } from '../components/Page';
import { storageService } from '../services/storageService';

const MIDDLE_C_STORAGE_KEY = 'middle-c';

export default function Home() {
  const [midiFiles, setMidiFiles] = React.useState<File[]>([]);
  const [middleC, setMiddleC] = React.useState(3);
  const [mappingText, setMappingText] = React.useState(DEFAULT_MAPPING_TEXT);
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    const storedMiddleC = storageService.getInt(MIDDLE_C_STORAGE_KEY);
    if (storedMiddleC) {
      setMiddleC(storedMiddleC);
    }
  }, []);

  const onMidiFilesSelected = (files: File[]) => {
    setMidiFiles([...midiFiles, ...files]);
  };

  const onFileDeleteClick = (deleteFile: File) => {
    const updatedFiles = midiFiles.filter(file => file !== deleteFile);
    setMidiFiles(updatedFiles);
  };

  const onMiddleCChange = (value: number) => {
    setMiddleC(value);
  };

  const onMappingTextChange = (text: string) => {
    setMappingText(text);
  };

  const onMapClick = async () => {
    try {
      setLoading(true);

      const mappingService = new MappingService(mappingText, middleC);
      await mappingService.mapAndDownload(midiFiles);

      storageService.setItem(MIDDLE_C_STORAGE_KEY, middleC);
      setError(undefined);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Box flex={1} display="flex">
        <MidiFilesView
          files={midiFiles}
          onFilesSelected={onMidiFilesSelected}
          onDeleteClick={onFileDeleteClick}
        />
        <Box marginLeft={2} flex={1} display="flex">
          <MappingConfigView
            middleC={middleC}
            text={mappingText}
            onMiddleCChange={onMiddleCChange}
            onTextChange={onMappingTextChange}
          />
        </Box>
      </Box>

      <Box marginTop={2} display="flex" justifyContent="center">
        <Button
          style={{ width: '200px' }}
          variant="contained"
          color="secondary"
          size="large"
          disabled={isLoading || midiFiles.length === 0}
          onClick={onMapClick}
        >
          Map It!
        </Button>
      </Box>

      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Link
          href="https://github.com/mbise1993/midi-mapper/issues/new"
          target="_blank"
          color="textPrimary"
        >
          Report an issue
        </Link>
      </Box>

      <Dialog open={!!error} onClose={() => setError(undefined)}>
        <DialogTitle>Mapping Error :(</DialogTitle>
        <DialogContent>{error}</DialogContent>
        <DialogActions>
          <Button onClick={() => setError(undefined)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
}
