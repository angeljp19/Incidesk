
import { socket } from "../socket";

export function joinPrivateChat(fromUserId: number, toUserId: number) {
  socket.emit("private:join", { fromUserId, toUserId });
}

export function sendPrivateMessage(payload: any) {
  socket.emit("private:message", payload);
}

export function onPrivateMessage(callback: (msg: any) => void) {
  socket.on("private:message", callback);
}

export function onMessageNotification(callback: (msg: any) => void) {
  socket.on("private:notify", callback);
}

export function offPrivateMessage(callback: (msg: any) => void) {
  socket.off("private:message", callback);
}

export function offMessageNotification(callback: (msg: any) => void) {
  socket.off("private:notify", callback);
}
