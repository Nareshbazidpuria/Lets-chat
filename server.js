const express = require('express')
const app = express()
const http = require('http').createServer(app)
let users= {};
const PORT = process.env.PORT || 80

http.listen(PORT, ()=>{
    console.log(`Listning on port ${PORT}`)
})

app.use(express.static(__dirname + '/Public'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})
// Socket
const io = require('socket.io')(http)

io.on('connection', (socket) =>{
    socket.on('new-user-joined', (name)=>{
        users[socket.id] = name;
        socket.broadcast.emit('new-user-joined', name);
    });
    socket.on('puo', ()=>{
        socket.emit('itc', users)
        socket.broadcast.emit('itcb', users)
    });
    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg)
    })
    socket.on('disconnect', (namee)=>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
        socket.broadcast.emit('leftprint', users)
    })
})

















// const express = require('express')
// const app = express()
// const http = require('http').createServer(app)
// let users= {};
// const PORT = process.env.PORT || 80

// http.listen(PORT, ()=>{
//     console.log(`Listning on port ${PORT}`)
// })

// app.use(express.static(__dirname + '/Public'))

// app.get('/', (req, res)=>{
//     res.sendFile(__dirname + '/index.html')
// })
// // Socket
// const io = require('socket.io')(http)

// io.on('connection', (socket) =>{
//     socket.on('new-user-joined', (name)=>{
//         users[socket.id] = name;
//         socket.broadcast.emit('new-user-joined', name);
//     });
//     socket.on('puo', ()=>{
//         socket.emit('itc', users, users[socket.id])
//         socket.broadcast.emit('itcb', users, users[socket.id])
//     });
//     socket.on('message', (msg)=>{
//         socket.broadcast.emit('message', msg)
//     })
//     socket.on('disconnect', ()=>{
//         socket.broadcast.emit('left', users[socket.id])
//         delete users[socket.id];
//         socket.broadcast.emit('leftprint', users)
//     })
// })