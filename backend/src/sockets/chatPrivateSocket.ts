
import { Server, Socket } from "socket.io";
import ConversationService from "../services/conversation";

function getPrivateRoomId(userA: number, userB: number) {
  return `private:${[userA, userB].sort().join("-")}`;
}

export function registerPrivateChat(socket: Socket, io: Server) {
  socket.on("private:join", ({ fromUserId, toUserId }) => {
    const roomId = getPrivateRoomId(fromUserId, toUserId);
    socket.join(roomId);
  });

  socket.on("private:message", (payload) => {
    const { usuario_id, toUserId, contenido, conversationId } = payload;
    const roomId = getPrivateRoomId(usuario_id, toUserId);
    ConversationService.saveMessage(
      conversationId,
      usuario_id,
      contenido
    );
    socket.to(roomId).emit("private:message", {
      ...payload,
      hora: new Date().toISOString(),
    });

    io.to(`user:${toUserId}`).emit("private:notify", {
      conversationId,
      fromUserId: usuario_id,
      contenido
    });
  });
}
