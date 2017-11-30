/**
 * Created by rishabhkhanna on 30/11/17.
 */
var socket = io();
$(function () {
    var msg = $('#msg');
    var submit = $('#submit');
    var chat = $('#chat');

    submit.click(function () {
        socket.emit('new_message', {
         msg : msg.val()
        })
    });

    socket.on('get_msg', function (data) {
        console.log(data);
        chat.append("<li>" + data.new_msg + "</li>")
    })
});