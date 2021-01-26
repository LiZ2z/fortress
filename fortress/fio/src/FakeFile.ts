import fs from 'fs';
import path from 'path';

export default class FakeFile {
  dirname: string;

  basename: string;

  extname: string;

  content: Buffer;

  constructor(content: Buffer, pathname: string) {
    // this.pathname = pathname;
    this.dirname = path.dirname(pathname);
    this.extname = path.extname(pathname);
    this.basename = path.basename(pathname).slice(0, -this.extname.length);
    this.content = content;
  }

  get pathname(): string {
    return path.resolve(this.dirname, this.basename + this.extname);
  }

  async writeFile(
    options?: fs.WriteFileOptions & BufferEncoding
  ): Promise<void> {
    const { pathname, content } = this;

    try {
      return await fs.promises.writeFile(pathname, content, options);
    } catch (error) {
      // 写入文件，如果因为文件夹不存在报错，那我们会帮其创建文件夹，否则，抛出错误

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code !== 'ENOENT') {
        throw error;
      }

      await fs.promises.mkdir(this.dirname);
      // TODO 可能会出现死循环
      return this.writeFile(options);
    }
  }
}
