import http from "http"
import express from 'express';
import { Server } from "socket.io";
let app = express()

const server=http.createServer(app)
const  io=new Server(
   server, {
        cors:{
            origin: "http://localhost:5173"
        }
    }
)
export const userSocketMap = {}
export const getReceiverSocketId=(receiver)=>{
    return userSocketMap[receiver]
}
io.on("connection",(socket)=>{
    const userid = socket.handshake.query.userId
    console.log("Received userId:", userid);
    if (userid != undefined) {
        console.log(userid, socket.id)
        userSocketMap[userid]=socket.id

    } 
    io.emit("getOnlineUser", Object.keys(userSocketMap))
    socket.on("disconnect", ()=>{
        if (userid) {
            delete userSocketMap[userid];
        }
        io.emit("getOnlineUser", Object.keys(userSocketMap))
        console.log("Socket disconnected:", socket.id);
    })
})

export { app, server, io }