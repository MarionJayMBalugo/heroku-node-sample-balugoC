$("#SMS").hide();
$(function () {
    var names = $('#username').val();
    var username = $('#username');
    var users = [];
    var socket = io();

    socket.on('online', function (data) {
        $('#activeUser').empty()
        for (let i = 0; i < data.length; i++) {
           var user = data[i];
            $('#activeUser').append($("<li>").text(user));
        }
    })   
    $('#submitButton').click(function () {
        socket.emit('online', username.val());
        console.log(username.val());
        $('#userinterface').hide();
        $("#SMS").show();
        $('#disconnect').click(function () {

        })

    })
    $('form').submit(function () {
        socket.emit('chat message', username.val() + " : " + $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function (msg) {
        // $('#messages').append($('<li>').text(msg));
        console.log(msg.split(" : ")[0])
        if (username.val() == msg.split(" : ")[0]) {
            $('#messages').append($('<li style="padding:20px;border-radius:10px;background-color:Yellow;margin-left:340px;margin-top:30px;">').text(msg));
        } else {
            $('#messages').append($('<li style="padding:20px;border-radius:10px;background-color:green;color:white;margin-right:340px;margin-top:30px; ">').text(msg));
        }
    });


});
window.scrollTo(0, document.body.scrollHeight);


