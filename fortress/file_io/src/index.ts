import glob from 'glob';
import FileReader from './FileReader';
import FileWriter from './FileWriter';

export const src = (pattern: string): FileReader => {
  const filenames = glob.sync(pattern);

  // TODO: filenames 可能是文件夹
  return new FileReader(filenames);
};

export const dest = (dir: string): FileWriter => {
  return new FileWriter(dir);
};
