export const DEFAULT_MAPPING_TEXT = `Name: Example mapping

C1 to D0
G#1 to A3
B5 to F-1`;

export interface NoteMapping {
  from: string;
  to: string;
}

export interface MappingConfig {
  name?: string;
  mappings: NoteMapping[];
}

export class MappingConfigParser {
  parse(text: string): MappingConfig {
    const config: MappingConfig = { mappings: [] };

    const lines = text.split('\n');
    if (lines.length === 0) {
      throw new Error('Empty mapping config file');
    }

    let startLine = 0;
    if (lines[0].toLowerCase().startsWith('name:')) {
      config.name = lines[0].split(':')[1].trim();
      startLine = 1;
    }

    for (let i = startLine; i < lines.length; ++i) {
      const line = lines[i];
      if (line.trim().length === 0) {
        continue;
      }

      config.mappings.push(this.parseLine(line, i + 1));
    }

    return config;
  }

  private parseLine(line: string, lineNumber: number): NoteMapping {
    const tokens = line.split('to');
    if (tokens.length !== 2) {
      throw new Error(`Invalid syntax on line ${lineNumber}: "${line}"`);
    }

    return {
      from: tokens[0].trim(),
      to: tokens[1].trim(),
    };
  }
}
