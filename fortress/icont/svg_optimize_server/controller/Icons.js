/* eslint-disable class-methods-use-this */
const fs = require('fs');
const glob = require('glob');
const path = require('path');

module.exports = class Icons {
  constructor() {
    this.getIcons = this.getIcons.bind(this);
  }

  glob() {
    return new Promise((resolve, reject) => {
      glob(
        path.join(
          path.resolve(__dirname, '../../../../vision/icons/svgs'),
          '*.svg'
        ),
        (error, files) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(files);
        }
      );
    });
  }

  async getIcons(ctx, next) {
    await next();

    const filenames = await this.glob();

    const fileContents = await Promise.all(
      filenames.map((filename) =>
        fs.promises
          .open(filename)
          .then((fsHandler) => fsHandler.readFile({ encoding: 'utf-8' }))
      )
    );

    ctx.success(
      filenames.map((filename, i) => {
        return {
          filename,
          basename: path.basename(filename),
          content: fileContents[i],
        };
      })
    );
  }

  async updateIcon(ctx, next) {
    await next();

    const data = ctx.getBody();

    if (!data) {
      ctx.fail('error');
      return;
    }

    try {
      await fs.promises.writeFile(data.filename, data.content, {
        encoding: 'utf8',
      });
      ctx.success();
    } catch (error) {
      ctx.fail(error);
    }
  }
};
