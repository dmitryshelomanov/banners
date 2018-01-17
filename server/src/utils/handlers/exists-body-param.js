module.exports = params => (ctx, next) => {
  const { body } = ctx.request

  for (let i = 0; i < params.length; i++) {
    const param = params[i]

    if (!(param in body)) {
      ctx.status = 404
      ctx.body = `param ${param} not found in body`
      return
    }
  }
  return next()
}
