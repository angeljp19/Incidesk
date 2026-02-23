import { useChat } from "../sockets/chatMessage/useChat";
import { UseOnlineUser } from "../sockets/onlineUser/useOnlineUser";
import { useState } from "react";

interface MsgInterface {
  msg: string;
  user: string;
  userId: number;
  hora: string;
}

interface OnlineUser {
  id: number;
  nombre: string;
}

export function CajaChat() {
  const user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user as string);

  const [message, setMessage] = useState("");
  const { messages, sendMessage } = useChat(userObj);
  const { onlineUsers } = UseOnlineUser();

  return (
    <div className="flex w-full h-full bg-gray-100 rounded-3xl shadow-xl overflow-hidden">

      {/* SIDEBAR USUARIOS ONLINE */}
      <aside className="w-20 bg-gray-900 text-white flex flex-col items-center py-4 gap-4">
        {onlineUsers.map((user: OnlineUser) => (
          <UserAvatar key={user.id} name={user.nombre} />
        ))}
      </aside>

      {/* CHAT */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex flex-col gap-2 h-full overflow-y-auto">
          {messages.map((msg, index) =>
            msg.userId === userObj.id ? (
              <MensajePropio key={index} msg={msg} />
            ) : (
              <MensajeAjeno key={index} msg={msg} />
            )
          )}
        </div>

        <div className="flex shadow-[0px_2px_5px_rgba(0,0,0,0.5)] rounded-full overflow-hidden">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            type="text"
            className="text-sm bg-white outline-none pl-4 py-2 w-full"
          />
          <button
            onClick={() => sendMessage(message)}
            className="bg-blue-700 text-white px-4 text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function UserAvatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();

  const bgColor = stringToColor(name);

  return (
    <div
      title={name}
      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold shadow"
      style={{ backgroundColor: bgColor }}
    >
      {initial}
    </div>
  );
}

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return `hsl(${hash % 360}, 70%, 50%)`;
}

function MensajePropio({ msg }: { msg: MsgInterface }) {
  return (
    <div className="flex justify-end">
      <div className="bg-blue-600 text-white p-3 rounded-2xl max-w-xs shadow">
        <p className="text-sm">{msg.msg}</p>
        <span className="block text-xs opacity-70 text-right mt-1">
          {new Date(msg.hora).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

function MensajeAjeno({ msg }: { msg: MsgInterface }) {
  return (
    <div className="flex justify-start">
      <div className="bg-white p-3 rounded-2xl max-w-xs shadow">
        <p className="text-xs font-semibold text-gray-600 mb-1">{msg.user}</p>
        <p className="text-sm">{msg.msg}</p>
        <span className="block text-xs opacity-60 mt-1">
          {new Date(msg.hora).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
