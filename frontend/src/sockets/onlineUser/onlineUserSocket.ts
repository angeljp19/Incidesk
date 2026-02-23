import { socket } from "../socket";

export function connectUser(user: any){
    socket.emit("online:connect", user)
}

export function syncOnlineUsers(){
  socket.emit("online:sync")
}

export function registerOnlineUsersListener(
  callback: (users: any[]) => void
) {
  socket.on("online:users", callback);
}

export function unregisterOnlineUsersListener(
  callback: (users: any[]) => void
) {
  socket.off("online:users", callback);
}