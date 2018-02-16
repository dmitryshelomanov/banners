const exec = require('./promisify-exec')
const path = require('path')
const command = [
  'cd client && npm install',
  'cd client && npm run build',
  'cd server && npm install',
  'cd server && npm run pm2:kill',
  'cd server && npm run start'
]

async function start() {
  for (let i = 0; i < command.length; i++) {
    await exec(command[i])
  }
}

start()
  .catch(error => console.log(error))
