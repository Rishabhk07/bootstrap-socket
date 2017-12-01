/**
 * Created by rishabhkhanna on 30/11/17.
 */
var socket = io();

$(function () {
    var msg = $('#msg');
    var submit = $('#submit');
    var chat = $('#chat');
    var online = $('#online');

    submit.click(function () {
        socket.emit('new_message', {
            username: username,
            msg: msg.val()
        })
    });



    socket.on('get_msg', function (data) {
        console.log(data);
        chat.append(createMessage(data.username, data.new_msg))
    })

    socket.on('prev', function(prev_msgs){
        for (i of prev_msgs){
            chat.append(createMessage(i.username, i.msg));

        }
    });

    socket.on('users', function (users) {
        for(i of users){
            online.append(createOnlineList(i));
        }
    })

    var username = prompt("Who you ?");

    socket.emit('user', username);

});

function createMessage(user, msg) {
    var msg = `<div class="list-group-item">
                    <div class="d-flex w-40 justify-content-between">
                        <h5 class="username">${user}</h5>
                    </div>
                    <p class="message">${msg}</p>
                </div>`;
    return msg;
}

function createOnlineList(user) {

    var list = `<li class="list-group-item">${user}</li>`
    return list;
}