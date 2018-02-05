/* eslint-disable  no-return-assign */
module.exports = function asyncMap(arr, mapper, initialData = null) {
  let q = Promise.resolve()

  return Promise
    .all(arr.map((v) => q = q.then((data = initialData) => mapper(v, data))))
    .then((resolve) => resolve[resolve.length - 1])
}
