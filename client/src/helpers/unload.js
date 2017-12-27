import socket from 'socket.io-client'
import { baseURL } from '../config'


export default () => {
  const io = socket(`${baseURL}`)

  return io
}
