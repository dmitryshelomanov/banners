const { exec } = require('child_process')


module.exports = (command) => {
  return new Promise((res, rej) => {
    const e = exec(command, (error, stdout) => {
      if (error && error.cmd !== 'cd server && npm run pm2:kill') {
        return rej(error)
      }

      res()
    })

    e.stdout.on('data', (data) => console.log(data))
  })
}
