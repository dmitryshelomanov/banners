const { Area } = require('../models')


async function getArea(ctx) {
  try {
    ctx.body = await Area.findAll()
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, path) => router[method](
  path,
  getArea,
)
