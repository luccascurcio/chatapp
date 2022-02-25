import express from 'express';
import http from 'http';
import io from 'socket.io';
import mongoose from 'mongoose';
import routes from './routes.js';
import cors from 'cors';

class App {
    constructor() {
        this.app = express();
        this.server = http.Server(this.app)
        
        this.io = io(this.server);

        this.io.on('connection', socket => {
            socket.on('message', ({ channel, name, message}) => {
                io.emit('message', { channel, name, message})
            })
        })

        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(routes);

        mongoose.connect('mongodb://localhost:27017/chatdb',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
        console.log("Database MongoDB / Connected successfully");
        });


    }
}

export default new App().server;