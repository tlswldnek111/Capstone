const express = require('express')
const app = express()
const Server = require('http').createServer(app)
const Port = 3003

Server.listen(Port, () => {
    console.log('채팅서버 실행 완료', 'http://121.145.133.119:' + Port)
})
 
const io = require('socket.io')(Server, {
    cors: {
      origin: "http://gamjaserver.ddns.net:3000",
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