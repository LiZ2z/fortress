module.exports = function useCORS(whiteList = '*') {
  return async function CORS(ctx, next) {
    // 当客户端通过CORS进行跨域请求时，如果设置了「请求头」，浏览器会首先进行一次OPTIONS请求
    // 来询问服务端允许哪些跨域的请求头，如果服务端不允许客户端所设置的请求头，则客户的这次的请求
    // 将会失败。
    //
    if (ctx.req.method.toUpperCase() === 'OPTIONS') {
      ctx.res
        .writeHead(200, {
          'Access-Control-Allow-Origin': whiteList,
          'Access-Control-Allow-Headers': 'content-type',
        })
        .end();
      return;
    }

    // 默认
    ctx.res.setHeader('Access-Control-Allow-Origin', whiteList);
    await next();
  };
};
