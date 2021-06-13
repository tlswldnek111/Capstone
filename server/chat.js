const express = require('express')
const app = express()
const Server = require('http').createServer(app)
const Port = 3002
var ipconfig = require('./config/ipConfig');

Server.listen(Port, () => {
    console.log('채팅서버 실행 완료', ipconfig.ExternalIp + ':' + Port)
})
 
const io = require('socket.io')(Server, {
    cors: {
      origin: "http://" + ipconfig.domain + ":3000",
              //"http://" + ipconfig.ExternalIp + ":3000",
              //도메인을 사용 안할때 외부 아이피로 설정
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