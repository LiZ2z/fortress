module.exports = function useResponse() {
  return async function response(ctx, next) {
    ctx.json = (data) => {
      const jsonStr = JSON.stringify(data);
      ctx.res
        .writeHead(200, {
          'Content-Type': 'application/json',
        })
        .end(jsonStr);
    };

    ctx.fail = (reason) => {
      ctx.json({
        status: 'fail',
        data: undefined,
        message: String(reason),
      });
    };

    ctx.success = (data) => {
      ctx.json({
        status: 'success',
        data,
        message: undefined,
      });
    };

    await next();
  };
};
