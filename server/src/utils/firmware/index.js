const cheerio = require('cheerio')
const debug = require('debug')('banner:firmware-util')
const fs = require('fs-extra')
const { Area } = require('../../models')
const { types, tempPathGenerated } = require('../temp-path')
const computed = require('./computed')
const asyncMap = require('./mapper')
const resolveFn = require('./resolve-fn')
const mapperFn = require('./mapper-fn')
const sizeStarter = require('./hooks/check-size')
const checkStubExists = require('./check-stub-exists')

/**
 * Главная функция для прошивки банера
 * Соберет все правила из бд и создаст хуки
 * По которым проверит и если ок вернет 200
 * И сложит прошитое в папку firmware
 * Дальше проверить есть ли заглушка
 * И проверить размеры заглушки и архива
 * @param {*} param0
 */
module.exports = async ({ nameFolder, areaId, fileName, isGif }) => {
  const rs = []
  const data = await Area.getAreaInfo(areaId)
  const path = tempPathGenerated()

  if (data === null) {
    throw new Error(`data not found with id ${areaId}`)
  }

  const oldPath = path(types.PROCESS, nameFolder)
  const areaPath = path(types.FIRMWARE, nameFolder, data.name)

  try {
    const $ = cheerio.load(await fs.readFile(path(types.PROCESS, `${nameFolder}/${fileName}`)))

    await fs.copy(oldPath, areaPath)

    for (let i = 0; i < data.rules.length; i++) {
      const hooks = computed(data.rules[i])

      if (hooks !== null) {
        debug(`push hook from ${data.rules[i].type}`)
        rs.push(hooks)
      }
    }

    return asyncMap(rs, mapperFn, $.html())
      .then(async (lastResolve) => {
        await checkStubExists({ nameFolder, isGif })
        await resolveFn(lastResolve, data, areaPath, fileName)
        await sizeStarter({ nameFolder, areaId, fileName, isGif })

        return true
      })
      .catch((error) => {
        throw error
      })
  }
  catch (error) {
    throw error
  }
}
