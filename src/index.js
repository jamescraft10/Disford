const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require("fs");

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/Docs/main.html");
});

app.get('/main', (req, res) => {
  fs.readFile(__dirname + '/Docs/index.html', (err, data) => {
    if (err) throw err;
    res.write(data);

    fs.readFile(__dirname + '/db.txt', (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  });
});

app.get('/Scripts/main.js', (req, res) => {
  res.sendFile(__dirname + "/Scripts/main.js");
});

app.get('/Scripts/math.js', (req, res) => {
  res.sendFile(__dirname + "/Scripts/math.js");
});

app.get('/Styles/main.css', (req, res) => {
  res.sendFile(__dirname + "/Styles/main.css");
});

app.get('/Styles/math.css', (req, res) => {
  res.sendFile(__dirname + "/Styles/math.css");
});

app.get('/Images/Logo.png', (req, res) => {
  res.sendFile(__dirname + "/Images/math.png");
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        fs.appendFileSync(__dirname + '/db.txt', `<script>AddText(\'${msg}\');</script>`); // Puts Message In File
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});