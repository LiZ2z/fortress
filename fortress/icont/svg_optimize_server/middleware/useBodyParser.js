const parseJson = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

const resolveBody = (data, req) => {
  const { headers } = req;
  const contentType = headers['content-type'];
  if (/^application\/json/.test(contentType)) {
    return parseJson(data);
  }
  return data;
};

/**
 *
 */
const receiveBody = (req) => {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk.toString();
    });
    req.on('end', () => {
      resolve(data);
    });
    req.on('error', (error) => {
      reject(error);
    });
  });
};

module.exports = function useBodyParser() {
  const bodyParser = async (ctx, next) => {
    const { method } = ctx.req;

    if (['GET', 'HEAD', 'OPTIONS', 'TRACE', 'CONNECT'].includes(method)) {
      ctx.getBody = () => undefined;
      await next();
      return;
    }

    const body = await receiveBody(ctx.req);
    ctx.getBody = () => resolveBody(body, ctx.req);

    await next();
  };

  return bodyParser;
};
