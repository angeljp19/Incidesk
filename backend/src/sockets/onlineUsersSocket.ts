import { Server, Socket } from "socket.io";

interface OnlineUser {
  id: number;
  nombre: string;
  socketId: string;
}

const onlineUsers: OnlineUser[] = [];

export function onlineUsersSocket(socket: Socket, io: Server) {
  socket.on("online:connect", (user: any) => {
    const exists = onlineUsers.some((u) => u.id === user.id);
    if (!exists) {
      onlineUsers.push({
        id: user.id,
        nombre: user.nombre,
        socketId: socket.id,
      });
    }

    socket.join(`user:${user.id}`);

    io.emit("online:users", onlineUsers);
  });

  socket.on("online:sync", () => {
    io.emit("online:users", onlineUsers)
  })

  socket.on("disconnect", () => {
    const index = onlineUsers.findIndex((u) => u.socketId === socket.id);

    if (index !== -1) {
      onlineUsers.splice(index, 1);
      io.emit("online:users", onlineUsers);
    }
  });
}
