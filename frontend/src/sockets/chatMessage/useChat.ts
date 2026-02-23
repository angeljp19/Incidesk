import { useState, useEffect } from "react";
import {
  sendChatMessage,
  registerChatListeners,
  unregisterChatListeners,
} from "./chatMessageSocket";

interface MsgInterface {
  msg: string;
  user: string;
  userId: number;
  hora: string;
}



export function useChat(user:any) {
  const [messages, setMessages] = useState<MsgInterface[]>([]);



  useEffect(() => {
    const onMessage = (msg: MsgInterface) => {
      setMessages((prev) => [...prev, msg]);

    };

    registerChatListeners(onMessage);

    return () => {
      unregisterChatListeners(onMessage);
    };
  }, []);

  const sendMessage = (text: string) => {
    const msg: MsgInterface = {
      msg: text,
      user: user.nombre,
      userId: user.id,
      hora: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, msg]);
    sendChatMessage(msg);
  };

  return {
    messages,
    sendMessage,
  };
}

