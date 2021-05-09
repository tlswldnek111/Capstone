const express = require('express')
const app = express()
const Server = require('http').createServer(app)
const Port = 3003

const ip = require("ip");
const myIp = ip.address();

Server.listen(Port, () => {
    console.log('채팅서버 실행 완료', 'http://localhost:' + Port)
})
 
const io = require('socket.io')(Server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log('사용자 접속: ', socket.client.id)

    socket.on('chat-msg', (msg) => {
        console.log('message: ', msg)
        io.emit('chat-msg', msg)
    })
})

module.exports = io;