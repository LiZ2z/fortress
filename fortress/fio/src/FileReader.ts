import { Readable } from 'stream';
import * as fs from 'fs';
import FakeFile from './FakeFile';

export default class FileReader extends Readable {
  private filenames: string[];

  private index: number;

  constructor(filenames: string[]) {
    super({ objectMode: true });

    this.filenames = filenames;
    this.index = 0;
  }

  // added in v14.13.1
  // _construct(callback: () => void) {
  //   this.index += 1;
  //   callback();
  // }

  async _read(): Promise<void> {
    const pathname = this.filenames[this.index];

    // 已经全部读取
    if (!pathname) {
      this.destroy();
      return;
    }

    let filehandle: fs.promises.FileHandle | undefined;

    try {
      // Open file for reading. An exception occurs if the file does not exist.
      filehandle = await fs.promises.open(pathname, 'r');
      const buffer = await filehandle.readFile();

      const fakeFile = new FakeFile(buffer, pathname);

      this.push(fakeFile);
      this.index += 1;
      if (this.index === this.filenames.length) {
        this.destroy();
      }
    } catch (error) {
      console.log(error);
    }

    if (filehandle) {
      filehandle.close();
    }
  }

  _destroy(error: null | Error, callback?: any): void {}
}
