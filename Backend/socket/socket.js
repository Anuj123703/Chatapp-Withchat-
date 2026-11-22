
import http from "http";
import express from "express";
import { Server } from "socket.io";

let app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://chatapp-withchat-frontend.onrender.com",
        methods: ["GET", "POST"],
        credentials: true
    }
});

export const userSocketMap = {};

export const getReceiverSocketId = (receiver) => {
    return userSocketMap[receiver];
};

io.on("connection", (socket) => {
    const userid = socket.handshake.query.userId;

    console.log("Received userId:", userid);

    if (userid) {
        userSocketMap[userid] = socket.id;
    }

    io.emit("getOnlineUser", Object.keys(userSocketMap));

    console.log("Socket connected:", socket.id);

    socket.on("disconnect", () => {
        if (userid && userSocketMap[userid] === socket.id) {
            delete userSocketMap[userid];
        }

        io.emit("getOnlineUser", Object.keys(userSocketMap));

        console.log("Socket disconnected:", socket.id);
    });
});

export { app, server, io };
