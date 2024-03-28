import express from 'express'
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv/config'
import bcrypt from 'bcrypt';
const userRouter = express.Router();

const url = process.env.DATA_URL;
const client = new MongoClient(url, { family: 4 });
const dbName = 'disford';

const findUser = async function(username) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');

    const user = await collection.findOne({name: username});
    await client.close();

    return user;
}

const addUser = async function(username,password) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    const user = { name: username, password: hashedPassword, friends: [] };
    await collection.insertOne(user);

    client.close();
}

const addUserFriend = async function(username,password,friend) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');

    const user = await findUser(username);
    if(!user) {
        throw new Error("User not found");
    } else if(!await bcrypt.compare(password, user.password)) {
        throw new Error("Incorrect password");
    }

    user.friends.push(friend); // status = {username: "joe1", isAccepted: true}

    await collection.replaceOne({name: username}, user);

    await client.close();
    return "done";
}

userRouter.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if(username == undefined || password == undefined) {
            res.status(400).json("Did not use username/password cannot make account.");
        } else if(await findUser(username) == null) {
            await addUser(username, password);
            res.status(200).json(username);
        } else {
            res.status(400).json("Username is taken!");
        }
    } catch(e) {
        res.status(500).json("Server error please contact support.\n"+e);
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if(username == undefined || password == undefined) {
            res.status(400).json("Did not use username/password login to the account.");
        } else if(await findUser(username) == null) {
            res.status(400).json("User doesn't exist!");
        } else {
            const user = await findUser(username);

            if(await bcrypt.compare(password, user.password)) {
                res.status(200).json("Logged in!");
            } else {
                res.status(200).json("Wrong password!");
            }
        }
    } catch(e) {
        res.status(500).json("Server error please contact support.\n"+e);
    }
});

userRouter.post('/addFriend', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const friend = req.body.friend;

        if(username == undefined || password == undefined || friend == undefined) {
            res.status(400).json("Did not use username/password/friend.");
        } else if(await findUser(username) == null) {
            res.status(400).json("Friend doesn't exist!");
        } else {
            await addUserFriend(username, password, {username: friend, isAccepted: false});
            res.status(200).json("Added friend to pending.");
            /*
            user {
                username,
                password,
                friends: [{username: "joe", isAccepted: true}, {username: "joe1", isAccepted: false}]
            }
            */
        }
    } catch(e) {
        res.status(500).json("Server error please contact support.\n"+e);
    }
});

export default userRouter;