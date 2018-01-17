/* eslint-disable  no-return-assign */
module.exports = function asyncMap(arr, mapper) {
  return new Promise((res, rej) => {
    let q = Promise.resolve()

    Promise.all(arr.map(v => q = q.then((data = null) => mapper(v, data))))
      .then((end) => {
        res(end[end.length - 1])
      })
      .catch((error) => {
        rej()
      })
  })
}
