class Ctx {
  constructor() {
    this.req = {}
    this.body = null
    this.status = null
  }

  setRequest(key, value) {
    if (typeof this.req[key] === 'undefined') {
      this.req[key] = value
      return
    }
    throw new Error(`request has method ${JSON.stringify(key)}`)
  }

  get request() {
    return this.req
  }
}

module.exports = {
  Ctx,
}
