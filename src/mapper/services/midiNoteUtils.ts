const PITCHES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export class MidiNoteUtils {
  static midiValueToNoteName(value: number, octaveOffset: number): string {
    const pitch = value % 12;
    const octave = Math.floor(value / 12) - octaveOffset;
    return `${PITCHES[pitch]}${octave}`;
  }

  static noteNameToMidiValue(name: string, octaveOffset: number): number {
    let pitch = '';
    let octave = 0;
    if (name[1] === '#') {
      pitch = name.substr(0, 2);
      octave = parseInt(name.substr(2));
    } else {
      pitch = name[0];
      octave = parseInt(name.substr(1));
    }

    const pitchOffset = PITCHES.indexOf(pitch);
    const adjustedOctave = octave + octaveOffset;
    return adjustedOctave * 12 + pitchOffset;
  }
}
