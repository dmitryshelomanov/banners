exports.init = app => app.use(async (ctx, next) => {
  try {
    await next()
  }
  catch (error) {
    ctx.status = error.status || 500
    ctx.body = error.message || error
  }
})
