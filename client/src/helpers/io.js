import socket from 'socket.io-client'
import { baseURL } from '../config'


const io = socket(`${baseURL}`)

export default io
