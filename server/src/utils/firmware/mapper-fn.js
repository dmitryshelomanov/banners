module.exports = function mapperFn(mapData, nextHtml) {
  return new Promise(async (res, rej) => {
    try {
      res(await mapData(nextHtml))
    }
    catch (error) {
      rej(error)
    }
  })
}
