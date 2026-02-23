import { HistorialChat } from "../../components/mensajeria/historialChat";
import { Chat } from "../../components/mensajeria/chat";
import { Usuarios } from "../../components/mensajeria/usuarios";

import { useState } from "react";
import { useNotificationMessage } from "../../sockets/chatMessage/useNotificationMessage";

import ChatsApi from "../../api/chat";

interface UserInterface {
  activo: boolean;
  apellido: string;
  departamento: string;
  departamento_id: number;
  email: string;
  fecha_creacion: string;
  id: number;
  nombre: string;
  rol: string;
  rol_id: number;
  ultima_sesion: string;
}

const emptyUser: UserInterface = {
  activo: true,
  apellido: "",
  departamento: "",
  departamento_id: 0,
  email: "",
  fecha_creacion: "",
  id: 0,
  nombre: "",
  rol: "",
  rol_id: 0,
  ultima_sesion: "",
};

type MobileView = "list" | "chat" | "users";

export function PanelMensajeria() {
  const [selectedUser, setSelectedUser] = useState<UserInterface>(emptyUser);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [conversationId, setConversationId] = useState<number>();
  const [mobileView, setMobileView] = useState<MobileView>("list");

  useNotificationMessage(setNuevoMensaje);

  const user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user as string);

  const handleSelectUser = async (user: UserInterface) => {
    const conv = await ChatsApi.initConversation(userObj.id, user.id);

    const hist = await ChatsApi.getConversationMessages(conv.conversacionId);
    setConversationId(conv.conversacionId);
    setHistory(hist);
    setMobileView("chat");
    setSelectedUser(user);
  };

  return (
    <div className="w-full h-full flex relative overflow-hidden">
      {/* HISTORIAL DE CHATS */}
      <div
        className={`
          absolute md:static
          inset-0 md:inset-auto
          w-full md:w-1/4
          transition-transform duration-300
          ${mobileView === "list" ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <HistorialChat
          setSelectedUser={handleSelectUser}
          nuevoMensaje={nuevoMensaje}
        />
      </div>

      {/* CHAT */}
      <div
        className={`
          absolute md:static
          inset-0 md:inset-auto
          w-full md:flex-1
          transition-transform duration-300
          ${mobileView === "chat" ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0
        `}
      >
        <Chat
          toUser={selectedUser}
          setNuevoMensaje={setNuevoMensaje}
          onBack={() => setMobileView("list")}
          conversationId={conversationId}
          history={history}
        />
      </div>

      {/* USUARIOS */}
      <div
        className={`
          hidden
          md:flex
          absolute md:static
          inset-0 md:inset-auto
          w-full md:w-1/4
          transition-transform duration-300
          ${mobileView === "users" ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0
        `}
      >
        <Usuarios
          setSelectedUser={handleSelectUser}
          onClose={() => setMobileView("chat")}
        />
      </div>
    </div>
  );
}
