const fs = require('fs')
const { resolve } = require('path')


const copy = function(srcDir, dstDir) {
  let results = []
  const list = fs.readdirSync(srcDir)
  let src, dst

  list.forEach(function (file) {
    src = `${srcDir}/${file}`
    dst = `${dstDir}/${file}`
    const stat = fs.statSync(src)

    if (stat && stat.isDirectory()) {
      try {
        console.log('creating dir: ' + dst)
        fs.mkdirSync(dst)
      }
      catch (error) {
        console.log('directory already exists: ' + dst)
      }
      results = results.concat(copy(src, dst))
    }
    else {
      try {
        console.log('copying file: ' + dst)
        fs.writeFileSync(dst, fs.readFileSync(src))
      } catch(e) {
        console.log('could\'t copy file: ' + dst)
      }
      results.push(src)
    }
  })
  return results
}

copy(
  resolve(__dirname, '..', 'client/build/'),
  resolve(__dirname, '..', 'server/public/'),
)
