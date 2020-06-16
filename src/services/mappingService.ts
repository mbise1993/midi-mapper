import FileSaver from 'file-saver';
import JSZip from 'jszip';

import { MappingConfigParser } from './mappingConfig';
import { MidiMapper } from './midiMapper';

export class MappingService {
  constructor(private readonly mappingText: string) {}

  async mapAndDownload(files: File[]) {
    const configParser = new MappingConfigParser();
    const config = configParser.parse(this.mappingText);

    const mapper = new MidiMapper(config);
    const mappedFiles = await mapper.mapFiles(files);

    const zip = new JSZip();
    zip.file('Mappings.txt', this.mappingText);
    mappedFiles.forEach(file => {
      zip.file(file.name, file.data);
    });

    const zippedFolder = await zip.generateAsync({ type: 'blob' });
    FileSaver.saveAs(zippedFolder, `ReMap MIDI - ${new Date().toLocaleString()}.zip`);
  }
}
