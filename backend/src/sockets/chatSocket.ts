import {Server, Socket} from "socket.io"

export function chatSocket(socket: Socket, io: Server ){
    socket.on("chat:send", (message)=>{
        socket.broadcast.emit("message", message)
    })
}