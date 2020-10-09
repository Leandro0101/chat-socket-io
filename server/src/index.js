const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log("conectado");

    socket.on('chat.message', (data) => {
        io.emit('chat.message', data);
    });
    
    socket.on('disconnect', () => {
        console.log('Disconneted');
    });
    

});

console.log('a');


http.listen(3001);