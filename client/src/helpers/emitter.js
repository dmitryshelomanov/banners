class EventEmitter {
  constructor() {
    this.events = {}
    this.instance = null
  }

  on(name, callback) {
    if (!this.events[name]) {
      this.events[name] = callback
    }
  }

  emit(name, ...rest) {
    if (this.events[name]) {
      return this.events[name](...rest)
    }
    throw new Error(`event ${name} not found`)
  }

  clearStare() {
    this.events = {}
    console.log(`this events was cleared ! ${JSON.stringify(this.events)}`)
  }
}

export default new EventEmitter()
