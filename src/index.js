const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require("fs");

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/Docs/index.html");
});

app.get('/Styles/index.css', (req, res) => {
  res.sendFile(__dirname + "/Styles/index.css");
});

app.get('/chat', (req, res) => {
  fs.readFile(__dirname + '/Docs/chat.html', (err, data) => {
    if (err) throw err;
    res.write(data);

    fs.readFile(__dirname + '/db.txt', (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  });
});

app.get('/Scripts/chat.js', (req, res) => {
  res.sendFile(__dirname + "/Scripts/chat.js");
});

app.get('/Styles/chat.css', (req, res) => {
  res.sendFile(__dirname + "/Styles/chat.css");
});

app.get('/games', (req, res) => {
  res.sendFile(__dirname + "/Docs/games.html");
});

app.get('/Styles/games.css', (req, res) => {
  res.sendFile(__dirname + "/Styles/games.css");
});

app.get('/games/artclass', (req, res) => {
  res.sendFile(__dirname + "/Docs/artclass.html");
});

app.get('/games/typeracer', (req, res) => {
  res.sendFile(__dirname + "/Docs/typeracer.html");
});

app.get('/Images/Logo.png', (req, res) => {
  res.sendFile(__dirname + "/Images/Image.png");
});

app.get('/Images/Math.png', (req, res) => {
  res.sendFile(__dirname + "/Images/math.png");
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