import { io } from "socket.io-client";
import { env } from "../env";
import { UseOnlineUser } from "./onlineUser/useOnlineUser";

export const socket = io(env.BACK_URL, {
  autoConnect: true,
});

let currentUser: any = null;

export function registerSocketUser(user: any) {
  currentUser = user;

  if (socket.connected) {
    socket.emit("online:connect", user);
  }
}

socket.on("connect", () => {

  if (currentUser) {
    socket.emit("online:connect", currentUser);
    UseOnlineUser()
  }
});

socket.on("disconnect", () => {
  console.log("Socket desconectado");
});
