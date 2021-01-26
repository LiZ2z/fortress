import { Writable } from 'stream';
import fs from 'fs';
import path from 'path';
import process from 'process';
import FakeFile from './FakeFile';

export default class FileWriter extends Writable {
  private dir: string;

  constructor(dir: string) {
    super({ objectMode: true });
    this.dir = path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir);
    this.ensureDir();
  }

  /**
   * 确保文件夹存在
   */
  ensureDir() {
    try {
      fs.mkdirSync(this.dir);
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }

  _write(fakeFile: FakeFile, encoding: any, callback: any) {
    fakeFile.dirname = this.dir;

    fakeFile.writeFile().finally(callback);
  }
}
