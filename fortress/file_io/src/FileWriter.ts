/* eslint-disable no-param-reassign */
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
  ensureDir(): void {
    try {
      // recursive, 递归创建文件夹。
      // 如果路径 `/a/b/c` 不存在，直接创建`/a/b/c/d` 就会报错，此时，需要将`recursive`设置为 true
      fs.mkdirSync(this.dir, { recursive: true });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }

  _write(fakeFile: FakeFile, encoding: any, callback: any): void {
    fakeFile.dirname = this.dir;

    fakeFile.writeFile().finally(callback);
  }
}
