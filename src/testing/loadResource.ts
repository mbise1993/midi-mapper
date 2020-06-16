import * as fs from 'fs';
import * as path from 'path';

const BASE_PATH = path.join(__dirname, 'resources');

export const loadTextFile = (fileName: string): string => {
  return fs.readFileSync(path.join(BASE_PATH, fileName), 'utf8');
};

export const loadMidiFile = (fileName: string): File => {
  const data = fs.readFileSync(path.join(BASE_PATH, fileName));
  return new File([data], fileName);
};
