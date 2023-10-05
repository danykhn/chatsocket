import express from "express";
import http from 'http'
import { Server as SocketServer } from "socket.io";
import { resolve } from 'path'
import { PORT } from "./config.js";

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)

app.use(express.static(resolve('front/dist')))

io.on('connection', socket => {
    console.log('client connect', socket.id)
    socket.on('chatMensaje', (body) => {
        socket.broadcast.emit('mensajeBroad', {
            body,
            from: socket.id.slice(6)
        })
    })
})
server.listen(PORT)
console.log('server on :', PORT)