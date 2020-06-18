import FileSaver from 'file-saver';
import JSZip from 'jszip';

import { MappingConfigParser } from './mappingConfig';
import { MidiMapper } from './midiMapper';

export class MappingService {
  constructor(private readonly mappingText: string, private readonly middleC: number) {}

  async mapAndDownload(files: File[]) {
    const configParser = new MappingConfigParser();
    const config = configParser.parse(this.mappingText);

    if (this.middleC !== 3 && this.middleC !== 4) {
      throw new Error('The only supported middle C options are C3 and C4');
    }

    const mapper = new MidiMapper(config, this.middleC === 3 ? 1 : 0);
    const mappedFiles = await mapper.mapFiles(files);

    const zip = new JSZip();
    zip.file('Mappings.txt', this.mappingText);
    mappedFiles.forEach(file => {
      zip.file(file.name, file.data);
    });

    const zippedFolder = await zip.generateAsync({ type: 'blob' });
    FileSaver.saveAs(zippedFolder, 'Mapped MIDI.zip');
  }
}
