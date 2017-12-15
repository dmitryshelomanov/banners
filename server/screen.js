class Screen { 
  constructor(el, endCb) {
    this.el = el
    this.endCb = endCb
    this.prevImage = null
    this.isPause = false
    this.images = []
    this.interval = 200
    this.timer = null
  }
  capture() {
    let data = this.el.toDataURL('image/png')
    if (data === this.prevImage) { 
      return this.handleEnd()
    }
    console.log('capture')
    this.images.push(data)
    this.prevImage = data
  }
  start() {
    this.timer = setInterval(() => {
      if (this.isPause) return
      this.capture()
    }, this.interval)
  }
  pause(toggle) {
    this.isPause = toggle
  }
  handleEnd() {
    this.pause(true)
    window.clearInterval(this.timer)
    typeof this.endCb === 'function' && this.endCb()
  }
}

const wrap = document.getElementById('img')

const s = new Screen(
  document.getElementById('canvas'), function () { 
    for (let i = 0; i < s.images.lenght; i++) {
      setTimeout(() => {
        let img = new Image
        img.src = s.images[i]
        wrap.appendChild(img)
      }, 60)
    }
  }
)
s.start()