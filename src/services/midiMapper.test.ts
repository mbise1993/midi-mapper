import { Midi } from '@tonejs/midi';

import { IMappingConfig } from './mappingConfig';
import { loadMidiFile } from '../test/loadResource';
import { MidiMapper } from './midiMapper';
import { MidiNoteUtils } from './midiNoteUtils';

const offset0Config: IMappingConfig = {
  mappings: [
    {
      from: 'C3',
      to: 'D4',
    },
    {
      from: 'C1',
      to: 'D2',
    },
    {
      from: 'F#0',
      to: 'G#1',
    },
    {
      from: 'F#2',
      to: 'G#3',
    },
    {
      from: 'F#4',
      to: 'G#5',
    },
    {
      from: 'C5',
      to: 'D6',
    },
  ],
};

const offset1Config: IMappingConfig = {
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

const offset2Config: IMappingConfig = {
  mappings: [
    {
      from: 'C1',
      to: 'D2',
    },
    {
      from: 'C-1',
      to: 'D0',
    },
    {
      from: 'F#-2',
      to: 'G#-1',
    },
    {
      from: 'F#0',
      to: 'G#1',
    },
    {
      from: 'F#2',
      to: 'G#3',
    },
    {
      from: 'C3',
      to: 'D4',
    },
  ],
};

const verifyOutput = async (midiData: Blob, octaveOffset: number, expectedSequence: string[]) => {
  const buffer = await midiData.arrayBuffer();
  const midi = new Midi(buffer);

  const actualSequence: string[] = [];
  midi.tracks.forEach(track => {
    track.notes.forEach(note => {
      const noteName = MidiNoteUtils.midiValueToNoteName(note.midi, octaveOffset);
      actualSequence.push(noteName);
    });
  });

  expect(actualSequence).toEqual(expectedSequence);
};

describe(MidiMapper.name, () => {
  it('correctly maps the notes with octave offset of 0', async () => {
    const file = loadMidiFile('test-midi.mid');
    const mapper = new MidiMapper(offset0Config, 0);

    const output = await mapper.mapFile(file);

    await verifyOutput(output.data, 0, [
      'D4',
      'C2',
      'D2',
      'C0',
      'G#1',
      'F#1',
      'G#3',
      'F#3',
      'G#5',
      'F#5',
      'D6',
      'C4',
      'D4',
    ]);
  });

  it('correctly maps the notes with octave offset of 1', async () => {
    const file = loadMidiFile('test-midi.mid');
    const mapper = new MidiMapper(offset1Config, 1);

    const output = await mapper.mapFile(file);

    await verifyOutput(output.data, 1, [
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

  it('correctly maps the notes with octave offset of 2', async () => {
    const file = loadMidiFile('test-midi.mid');
    const mapper = new MidiMapper(offset2Config, 2);

    const output = await mapper.mapFile(file);

    await verifyOutput(output.data, 2, [
      'D2',
      'C0',
      'D0',
      'C-2',
      'G#-1',
      'F#-1',
      'G#1',
      'F#1',
      'G#3',
      'F#3',
      'D4',
      'C2',
      'D2',
    ]);
  });

  it('returns the correct file name', async () => {
    const file = loadMidiFile('test-midi.mid');
    const mapper = new MidiMapper(offset1Config, 1);

    const output = await mapper.mapFile(file);

    expect(output.name).toMatch('test-midi - Mapped.mid');
  });
});
