/**
 * Created by rishabhkhanna on 30/11/17.
 */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

app.use(express.static(path.join(__dirname, '/public_static')));

io.on('connection', (socket) => {
    console.log("Socket connected with socket id : " + socket.id);
    socket.on('new_message', (data) =>{
        console.log("message received : " + data.msg);
        io.sockets.emit('get_msg', {
            new_msg: data.msg
        });
    })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public_static/index.html');
});

server.listen('9090', () => console.log("Server started at port 9090"));

