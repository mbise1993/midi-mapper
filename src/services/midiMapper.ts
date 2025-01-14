import { IMappingConfig } from './mappingConfig';

import { Midi, Track } from '@tonejs/midi';
import { MidiNoteUtils } from './midiNoteUtils';

type Note = Track['notes'][0];

interface MappedFile {
	name: string;
	data: Blob;
}

export class MidiMapper {
	constructor(
		private readonly config: IMappingConfig,
		private readonly octaveOffset: number,
	) {}

	async mapFile(midiFile: File): Promise<MappedFile> {
		const data = await midiFile.arrayBuffer();
		const midi = new Midi(data);

		for (const track of midi.tracks) {
			for (const note of track.notes) {
				this.mapNote(note);
			}
		}

		return {
			name: `${this.stripFileExtension(midiFile.name)} - Mapped.mid`,
			data: new Blob([midi.toArray()]),
		};
	}

	async mapFiles(midiFiles: File[]) {
		return Promise.all(midiFiles.map((file) => this.mapFile(file)));
	}

	private mapNote(note: Note) {
		const noteName = MidiNoteUtils.midiValueToNoteName(note.midi, this.octaveOffset);
		const mapping = this.config.mappings.find((m) => m.from === noteName);
		if (mapping) {
			note.midi = MidiNoteUtils.noteNameToMidiValue(mapping.to, this.octaveOffset);
		}
	}

	private stripFileExtension(fileName: string): string {
		const index = fileName.lastIndexOf('.');
		return index > -1 ? fileName.substring(0, index) : fileName;
	}
}
