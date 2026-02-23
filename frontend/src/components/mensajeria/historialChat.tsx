import { useEffect, useState } from "react";
import { UserAvatar } from "./usuarios";
import ChatsApi from "../../api/chat";

interface User {
  id: number;
  nombre: string;
  apellido: string;
}

interface Mensaje {
  id: number;
  contenido: string;
  created_at: string;
  usuario_id: number;
}

interface Conversacion {
  id: number;
  created_at: string;
  participantes: {
    Usuario: User;
  }[];
  mensajes: Mensaje[];
}

interface HistorialChatProps {
  setSelectedUser: (user: any) => void;
  nuevoMensaje?: string;
}

export function HistorialChat({
  setSelectedUser,
  nuevoMensaje,
}: HistorialChatProps) {
  const [conversaciones, setConversaciones] = useState<Conversacion[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadChats = async () => {
      const storedUser = sessionStorage.getItem("user");
      if (!storedUser) return;

      const userObj: User = JSON.parse(storedUser);
      setUser(userObj);

      const data: Conversacion[] = await ChatsApi.getUserConversations(
        userObj.id
      );

      const ordenadas = data
        .filter((conv) => conv.mensajes.length > 0)
        .sort((a, b) => {
          const fechaA = new Date(a.mensajes[0].created_at).getTime();
          const fechaB = new Date(b.mensajes[0].created_at).getTime();
          return fechaB - fechaA;
        });

      setConversaciones(ordenadas);
    };

    loadChats();
  }, [nuevoMensaje]);

  if (!user) return null;

  return (
    <div className="flex flex-col w-full h-full bg-[#F5F7FB] md:rounded-l-2xl overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-5 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-blue-700">
          Historial de chats
        </h2>
        <p className="text-xs text-gray-400">Conversaciones recientes</p>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {conversaciones.map((conv) => {
          const otroUsuario = conv.participantes
            .map((p) => p.Usuario)
            .find((u) => u.id !== user.id);

          if (!otroUsuario) return null;

          const ultimoMensaje = conv.mensajes[0];
          const fechaMensaje = new Date(ultimoMensaje.created_at);

          const mostrarHora = isToday(fechaMensaje)
            ? fechaMensaje.toLocaleTimeString("es-VE", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : fechaMensaje.toLocaleDateString("es-VE");

          return (
            <button
              key={conv.id}
              onClick={() => setSelectedUser(otroUsuario)}
              className="
              w-full
              flex items-center gap-3
              bg-white rounded-2xl px-4 py-3
              text-left
              shadow-sm
              transition-all duration-200
              hover:shadow-md hover:-translate-y-[1px]
              active:scale-[0.99]
              group
            "
            >
              {/* Avatar */}
              <UserAvatar
                name={`${otroUsuario.nombre}`}
              />

              {/* Texto */}
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex justify-between items-center gap-2">
                  <span className="font-medium text-gray-900 truncate group-hover:text-blue-700 transition">
                    {otroUsuario.nombre} {otroUsuario.apellido}
                  </span>

                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {mostrarHora}
                  </span>
                </div>

                <span className="text-sm text-gray-500 truncate">
                  {truncate(ultimoMensaje.contenido)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =======================
   Helpers
======================= */

function truncate(text: string, max = 40) {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
