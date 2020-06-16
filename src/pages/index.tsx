import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import { MappingConfigView } from '../components/MappingConfigView';
import { MappingService } from '../services/mappingService';
import { MidiFilesView } from '../components/MidiFilesView';
import { Page } from '../components/Page';

export default function Home() {
  const [midiFiles, setMidiFiles] = React.useState<File[]>([]);
  const [mappingText, setMappingText] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();

  const onMidiFilesSelected = (files: File[]) => {
    setMidiFiles([...midiFiles, ...files]);
  };

  const onFileDeleteClick = (deleteFile: File) => {
    const updatedFiles = midiFiles.filter(file => file !== deleteFile);
    setMidiFiles(updatedFiles);
  };

  const onMapClick = async () => {
    try {
      setLoading(true);

      const mappingService = new MappingService(mappingText);
      await mappingService.mapAndDownload(midiFiles);

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
          <MappingConfigView text={mappingText} onTextChange={text => setMappingText(text)} />
        </Box>
      </Box>

      <Box marginTop={4} marginBottom={2} display="flex" justifyContent="center">
        <Button
          style={{ width: '200px' }}
          variant="contained"
          size="large"
          disabled={isLoading}
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
