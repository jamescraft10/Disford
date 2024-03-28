import express from 'express'
import dotenv from 'dotenv/config'
import { Server } from 'socket.io'
import http from 'http'
import { MongoClient } from 'mongodb';

import userRouter from './routes/user.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.json());
app.use("/api/user", userRouter);

server.listen(3000, () => {
    console.log('listening on *:3000');
});

/*
messages {
    James1-James2: {
        {name: "James1", "msg": "Hello!", "time": "2:46 PM 3/24/2024"},
        {name: "James2", "msg": "Hi!", "time": "2:46 PM 3/24/2024"}
    },
    James3-James2: {
        {name: "James3", "msg": "Hello!", "time": "2:46 PM 3/24/2024"},
        {name: "James2", "msg": "Hi!", "time": "2:46 PM 3/24/2024"}
    },
}
*/