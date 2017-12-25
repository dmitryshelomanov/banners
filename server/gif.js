const GIFEncoder = require('gif-stream/encoder')
const neuquant = require('neuquant')
const fs = require('fs')
// encode an animated GIF file by writing pixels to it.
// you need to manually quantize the data to produce a palette and indexed pixels.
const q = neuquant.quantize(pixels)

const enc = new GIFEncoder(width, height, { palette: q.palette })

enc.pipe(fs.createWriteStream('out.gif'))

// write indexed data
enc.end(q.indexed)

// or, pipe data from another RGB stream
// boom: streaming image transcoding!
fs.createReadStream('rgb.png')
  .pipe(new PNGDecoder())
  .pipe(new neuquant.Stream())
  .pipe(new GIFEncoder())
  .pipe(fs.createWriteStream('out.gif'))

// maybe you want to preserve the original palette and indexing?
// you can do that too!
fs.createReadStream('rgb.png')
  .pipe(new GIFDecoder({indexed: true}))
  .pipe(new GIFEncoder())
  .pipe(fs.createWriteStream('out.gif'))
// somewhat useless example, but this may be useful for instance
// if you are breaking an animated GIF into multiple static GIFs
