import React from 'react';

import { DEFAULT_MAPPING_TEXT } from '../services/mappingConfig';
import { MappingConfigView } from '../components/MappingConfigView';
import { MappingService } from '../services/mappingService';
import { MidiFilesView } from '../components/MidiFilesView';
import { Page } from '../components/Page';
import { storageService } from '../services/storageService';

const LOWEST_OCTAVE_STORAGE_KEY = 'lowest-octave';

export default function Index() {
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
      <MidiFilesView
        files={midiFiles}
        onFilesSelected={onMidiFilesSelected}
        onDeleteClick={onFileDeleteClick}
      />
      <MappingConfigView
        lowestOctave={lowestOctave}
        text={mappingText}
        onLowestOctaveChange={onLowestOctaveChange}
        onTextChange={onMappingTextChange}
      />
      <button
        className="mm-btn-primary"
        disabled={isLoading || midiFiles.length === 0}
        onClick={onMapClick}
      >
        Map It!
      </button>

      {Boolean(error) && (
        <div className="mm-dialog">
          <h2>Mapping Error :(</h2>
          <div className="mm-dialog-content">{error}</div>
          <button className="mm-btn-default" onClick={() => setError(undefined)}>
            OK
          </button>
        </div>
      )}
    </Page>
  );
}
