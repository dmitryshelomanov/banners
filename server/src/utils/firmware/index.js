const cheerio = require('cheerio')
const debug = require('debug')('banner:firmware-util')
const fs = require('fs-extra')
const { Area, Rules, Sequelize } = require('../../models')
const { process, area } = require('../temp-path')()
const computed = require('./computed')
const asyncMap = require('./mapper')
const resolveFn = require('./resolve-fn')
const mapperFn = require('./mapper-fn')


module.exports = async ({ nameFolder, area: areaName, fileName }) => {
  const rs = []
  const data = await Area.findOne({
    include: [{
      model: Rules,
      attributes: {
        exclude: ['id'],
      },
      where: {
        type: {
          [Sequelize.Op.ne]: 'size',
        },
      },
    }],
    where: {
      name: areaName,
    },
  })

  try {
    const path = process(`${nameFolder}/${fileName}`)
    const $ = cheerio.load(await fs.readFile(path))

    if (data === null) {
      throw new Error('rules not found')
    }

    for (let i = 0; i < data.rules.length; i++) {
      const hooks = computed(data.rules[i])

      if (hooks !== null) {
        debug(`push hook from ${data.rules[i].type}`)
        rs.push(hooks)
      }
    }

    asyncMap(rs, mapperFn, $.html())
      .then(async (lastResolve) => {
        await resolveFn(lastResolve, data, area(nameFolder, areaName), fileName)
      })
      .catch(error => console.log('error', error))
  }
  catch (error) {
    throw error
  }
}
