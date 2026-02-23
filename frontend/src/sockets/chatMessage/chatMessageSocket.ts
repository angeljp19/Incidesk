import { socket } from "../socket";

interface MsgInterface {
  msg: string;
  user: string;
  userId: number;
  hora: string;
}

export function sendChatMessage(msg: MsgInterface) {
  socket.emit("chat:send", msg);
}
export function registerChatListeners(onMessage: (msg: MsgInterface) => void) {
  socket.on("message", onMessage);
}
export function unregisterChatListeners(onMessage: (msg: MsgInterface) => void) {
  socket.off("message", onMessage);
}
