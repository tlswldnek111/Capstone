import http from "http";
import express from "express";
import io from "socket.io";
const app = express();
const httpServer = http.createServer(app).listen(3003, () => {
    console.log("포트 3003에 연결되었습니다.");
});
const socketServer = io(httpServer);
socketServer.on("connection", socket => {
    console.log("connect client by Socket.io");
});
