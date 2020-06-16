import { IMappingConfig } from './mappingConfig';

import { Midi, Track } from '@tonejs/midi';

type Note = Track['notes'][0];

interface MappedFile {
  name: string;
  data: Blob;
}

const PITCH_OFFSETS = {
  C: 0,
  'C#': 1,
  D: 2,
  'D#': 3,
  E: 4,
  F: 5,
  'F#': 6,
  G: 7,
  'G#': 8,
  A: 9,
  'A#': 10,
  B: 11,
};

const OCTAVE_OFFSET = 1;

export class MidiMapper {
  constructor(private readonly config: IMappingConfig) {}

  async mapFile(midiFile: File): Promise<MappedFile> {
    const data = await midiFile.arrayBuffer();
    const midi = new Midi(data);

    midi.tracks.forEach(track => {
      track.notes.forEach(note => this.mapNote(note));
    });

    return {
      name: `${midiFile.name} - Mapped.mid`,
      data: new Blob([midi.toArray()]),
    };
  }

  async mapFiles(midiFiles: File[]) {
    return Promise.all(midiFiles.map(file => this.mapFile(file)));
  }

  private mapNote(note: Note) {
    const mapping = this.config.mappings.find(m => m.from === note.name);
    if (mapping) {
      note.midi = this.noteNameToMidiValue(mapping.to);
    }
  }

  private noteNameToMidiValue(name: string): number {
    let pitch = '';
    let octave = 0;
    if (name[1] === '#') {
      pitch = name.substr(0, 2);
      octave = parseInt(name.substr(2));
    } else {
      pitch = name[0];
      octave = parseInt(name.substr(1));
    }

    const pitchOffset = PITCH_OFFSETS[pitch];
    const adjustedOctave = octave + OCTAVE_OFFSET;
    return adjustedOctave * 12 + pitchOffset;
  }
}
