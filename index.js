// npm i express socket.io
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require("fs");
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.static('public'));

app.get('/chat', (req, res) => {
  fs.readFile(__dirname + '/chat.html', (err, data) => {
    if (err) throw err;
    res.write(data);

    fs.readFile(__dirname + '/db.txt', (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        fs.appendFileSync(__dirname + '/db.txt', `<script>a(\'${msg}\');</script>`); // Puts Message In File
        io.emit('chat message', msg);
    });

    socket.on('image', (image) => {
      fs.appendFileSync(__dirname + '/db.txt', `<script>i(\'${image}\');</script>`);
      io.emit('image', image);
    });
});

app.get('*', function(req, res){
  res.status(404).send('404 Not Found <a href=\"/\">Disford home</a>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});