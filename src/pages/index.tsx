import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import { DEFAULT_MAPPING_TEXT } from '../services/mappingConfig';
import { MappingConfigView } from '../components/MappingConfigView';
import { MappingService } from '../services/mappingService';
import { MidiFilesView } from '../components/MidiFilesView';
import { Page } from '../components/Page';
import { storageService } from '../services/storageService';

const LOWEST_OCTAVE_STORAGE_KEY = 'lowest-octave';

export default function Home() {
  const [midiFiles, setMidiFiles] = React.useState<File[]>([]);
  const [lowestOctave, setLowestOctave] = React.useState(-1);
  const [mappingText, setMappingText] = React.useState(DEFAULT_MAPPING_TEXT);
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    const storedLowestOctave = storageService.getInt(LOWEST_OCTAVE_STORAGE_KEY);
    if (storedLowestOctave) {
      setLowestOctave(storedLowestOctave);
    }
  }, []);

  const onMidiFilesSelected = (files: File[]) => {
    setMidiFiles([...midiFiles, ...files]);
  };

  const onFileDeleteClick = (deleteFile: File) => {
    const updatedFiles = midiFiles.filter(file => file !== deleteFile);
    setMidiFiles(updatedFiles);
  };

  const onLowestOctaveChange = (value: number) => {
    setLowestOctave(value);
  };

  const onMappingTextChange = (text: string) => {
    setMappingText(text);
  };

  const onMapClick = async () => {
    try {
      setLoading(true);

      const mappingService = new MappingService(mappingText, lowestOctave);
      await mappingService.mapAndDownload(midiFiles);

      storageService.setItem(LOWEST_OCTAVE_STORAGE_KEY, lowestOctave);
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
            lowestOctave={lowestOctave}
            text={mappingText}
            onLowestOctaveChange={onLowestOctaveChange}
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
