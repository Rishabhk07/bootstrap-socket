/**
 * Created by rishabhkhanna on 30/11/17.
 */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

let prevData= [];
app.use(express.static(path.join(__dirname, '/public_static')));
let users = {};
io.on('connection', (socket) => {
    socket.on('user', (data)=>{
       users[socket.id] = data;
       io.emit('users', users);
    });
    console.log("Socket connected with socket id : " + socket.id);
    socket.emit('prev', prevData);
    socket.on('new_message', (data) =>{
        prevData.push(data);
        console.log("message received : " + data.msg);
        io.emit('get_msg', {
            new_msg: data.msg,
            username: data.username
        });
    });

    socket.on('disconnect', ()=>{
        delete users[socket.id];
        io.emit('users', users)
    })

});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public_static/index.html');
});

server.listen('9090', () => console.log("Server started at port 9090"));

