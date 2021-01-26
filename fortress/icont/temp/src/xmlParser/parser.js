const htmlparser2 = require('htmlparser2');

const createParser = () => {
  let ast = [];
  let processTags = [];
  let openTag;

  /**
   * 清除所有状态
   * */
  const clear = () => {
    ast = [];
    processTags = [];
    openTag = undefined;
  };

  /**
   * 获取结果
   * */
  const getAst = () => {
    if (processTags.length !== 0) {
      // 如果还有待处理的数据，此时获取结果ast是错误行为
    }
    const result = ast;

    clear();

    return result;
  };

  /**
   * 解释器
   * */
  const htmlParser = new htmlparser2.Parser(
    {
      onopentagname(name) {
        openTag = {
          tag: name,
          attrs: {},
          children: [],
        };
      },

      onattribute(name, value) {
        openTag.attrs[name] = value;
      },

      onopentag(name) {
        if (openTag.tag !== name) {
          // error
          return;
        }
        const lastProcessTag = processTags[processTags.length - 1];

        if (lastProcessTag) {
          lastProcessTag.children.push(openTag);
        }

        processTags.push(openTag);

        openTag = undefined;
      },

      onclosetag(name) {
        const finishedTag = processTags.pop();

        if (!finishedTag) {
          // errror
          return;
        }

        if (finishedTag.tag !== name) {
          // error
          return;
        }

        if (processTags.length === 0) {
          ast.push(finishedTag);
        }

        openTag = undefined;
      },

      onerror() {
        console.log('err:');
      },
    },
    { xmlMode: true, decodeEntities: true }
  );

  return {
    parse: chunk => htmlParser.write(chunk),
    getAst,
  };
};

module.exports = createParser;
