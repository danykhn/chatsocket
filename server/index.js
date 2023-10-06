import express from "express";
import http from "http";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import { resolve, dirname } from "path";

import { PORT } from "./config.js";
import cors from "cors";

// Initializations
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(resolve("front/dist")));
let chatRoom = '';
let allUsers = [];
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("message", (data) => {
        console.log(data)
        socket.broadcast.emit("recived_msg", data);
    });

    socket.on('join_room', (data) => {
        const username = data
        allUsers.push({ id: socket.id, user: username.user });
        socket.emit('list_clientes', allUsers);
    })



});

server.listen(PORT);
console.log(`server on port ${PORT}`);