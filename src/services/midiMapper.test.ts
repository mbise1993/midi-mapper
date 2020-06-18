import { Midi } from '@tonejs/midi';

import { IMappingConfig } from './mappingConfig';
import { loadMidiFile } from '../testing/loadResource';
import { MidiMapper } from './midiMapper';

const config: IMappingConfig = {
  mappings: [
    {
      from: 'C2',
      to: 'D3',
    },
    {
      from: 'C0',
      to: 'D1',
    },
    {
      from: 'F#-1',
      to: 'G#0',
    },
    {
      from: 'F#1',
      to: 'G#2',
    },
    {
      from: 'F#3',
      to: 'G#4',
    },
    {
      from: 'C4',
      to: 'D5',
    },
  ],
};

const verifyOutput = async (midiData: Blob, expectedSequence: string[]) => {
  const buffer = await midiData.arrayBuffer();
  const midi = new Midi(buffer);

  const actualSequence: string[] = [];
  midi.tracks.forEach(track => {
    track.notes.forEach(note => actualSequence.push(note.name));
  });

  expect(actualSequence).toEqual(expectedSequence);
};

describe(MidiMapper.name, () => {
  it('correctly maps the notes', async () => {
    const file = loadMidiFile('test-file.mid');
    const mapper = new MidiMapper(config, 1);

    const output = await mapper.mapFile(file);

    await verifyOutput(output.data, [
      'D3',
      'C1',
      'D1',
      'C-1',
      'G#0',
      'F#0',
      'G#2',
      'F#2',
      'G#4',
      'F#4',
      'D5',
      'C3',
      'D3',
    ]);
  });

  it('returns the correct file name', async () => {
    const file = loadMidiFile('test-file.mid');
    const mapper = new MidiMapper(config, 1);

    const output = await mapper.mapFile(file);

    expect(output.name).toMatch('test-file - Mapped.mid');
  });
});
