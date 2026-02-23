import { useState, useEffect } from "react";
import {
  joinPrivateChat,
  offPrivateMessage,
  onPrivateMessage,
  sendPrivateMessage,
} from "./privateChatMessage";

export function usePrivateChat(
  fromUser: any,
  toUser: any,
  conversation_id?: number
) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    joinPrivateChat(fromUser.id, toUser.id);

    const onMessage = (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    };

    onPrivateMessage(onMessage);

    return () => {
      offPrivateMessage(onMessage);
    };
  }, [toUser.id]);

  const sendMessage = (text: string) => {
    const msg = {
      usuario_id: fromUser.id,
      contenido: text,
      toUserId: toUser.id,
      Usuario: { nombre: fromUser.nombre },
      conversationId: conversation_id,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [
      ...prev,
      { ...msg, created_at: new Date().toISOString() },
    ]);
    sendPrivateMessage(msg);
  };

  return { messages, sendMessage };
}
