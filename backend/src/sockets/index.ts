import {io} from "../server"
import { chatSocket } from "./chatSocket"
import { onlineUsersSocket } from "./onlineUsersSocket"
import { registerPrivateChat } from "./chatPrivateSocket"

io.on("connection", (socket) => {
    chatSocket(socket, io)
    onlineUsersSocket(socket, io)
    registerPrivateChat(socket, io)
})