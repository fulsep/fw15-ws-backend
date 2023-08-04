require('dotenv').config({
    path:'.env'
})

const express = require('express')
const {createServer} = require('http')
const {Server} = require('socket.io')

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND || "http://localhost:5173"
    }
});

io.on("connection", (socket)=>{
    console.log('Client connected!')
    socket.on( "message", (msg)=>{
        io.emit("sendMessage", msg)
    })
})

app.get('/', (req, res)=> {
    return res.json({
        success: true,
        message: 'OK'
    })
})

// app.listen(8888, ()=>{
//     console.log('Running')
// })

const PORT = process.env.PORT || 8888
server.listen(PORT)