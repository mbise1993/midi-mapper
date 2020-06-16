import { IMappingConfig } from './mappingConfig';

import { Midi, Track } from '@tonejs/midi';

type Note = Track['notes'][0];

interface MappedFile {
  name: string;
  data: Blob;
}

export class MidiMapper {
  constructor(private readonly config: IMappingConfig) {}

  async mapFile(midiFile: File): Promise<MappedFile> {
    const data = await midiFile.arrayBuffer();
    const midi = new Midi(data);

    midi.tracks.forEach(track => {
      track.notes.forEach(note => this.mapNote(note));
    });

    return {
      name: `${midiFile.name}_mapped.mid`,
      data: new Blob([midi.toArray()]),
    };
  }

  async mapFiles(midiFiles: File[]) {
    return Promise.all(midiFiles.map(file => this.mapFile(file)));
  }

  private mapNote(note: Note) {
    const mapping = this.config.mappings.find(m => m.from === note.name);
    if (mapping) {
      note.name = mapping.to;
    }
  }
}
