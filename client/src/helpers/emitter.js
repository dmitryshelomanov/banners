export default class EventEmitter {
  constructor() {
    this.events = {}
    this.instance = null
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new EventEmitter()
      return this.instance
    }
    return this.instance
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
}
