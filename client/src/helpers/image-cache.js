export default class CacheLinks {
  constructor() {
    this.cache = new Map()
  }

  get(link) {
    if (!this.cache.has(link)) {
      this.add(link)
    }
    const version = this.cache.get(link)

    return `${link}?v=${version}`
  }

  add(link) {
    this.cache.set(link, 0)
  }

  update(link) {
    const version = this.cache.get(link)

    this.cache.set(link, version + 1)
    return this.get(link)
  }
}
