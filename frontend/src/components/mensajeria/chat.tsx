import { SlOptionsVertical } from "react-icons/sl";
import { LuSend, LuMessageSquare } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";

import { useState, useRef, useEffect } from "react";
import { usePrivateChat } from "../../sockets/chatMessage/usePrivateChat";
import { TicketsChatModal } from "./ticketsChatModal";
import { UserAvatar } from "./usuarios";

/* ================== Interfaces ================== */

interface MsgInterface {
  id?: number;
  contenido: string;
  user: string;
  usuario_id: number;
  created_at: string;
  Usuario?: {
    nombre: string;
  };
}

interface User {
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

interface ChatProps {
  toUser: User;
  setNuevoMensaje: (msg: any) => void;
  onBack?: () => void;
  conversationId?: number;
  history: MsgInterface[];
}

/* ================== Componente ================== */

export function Chat({
  toUser,
  setNuevoMensaje,
  onBack,
  conversationId,
  history,
}: ChatProps) {
  const user = sessionStorage.getItem("user");
  const userObj: User = JSON.parse(user as string);

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState<MsgInterface[]>([]);
  const [showTickets, setShowTickets] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages: socketMessages, sendMessage } = usePrivateChat(
    userObj,
    toUser,
    conversationId
  );

  /* ================== Cargar conversación ================== */

  useEffect(() => {
    const loadConversation = async () => {
      if (toUser.id === 0) return;

      setAllMessages([]);
      setAllMessages(history);
    };

    loadConversation();
  }, [toUser.id]);

  /* ================== Socket ================== */

  useEffect(() => {
    if (!socketMessages.length) return;

    const lastMsg = socketMessages[socketMessages.length - 1];
    setNuevoMensaje(lastMsg);
    setAllMessages((prev) => [...prev, lastMsg]);
  }, [socketMessages]);

  /* ================== Auto scroll ================== */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  /* ================== Render ================== */

  return (
    <div className="flex w-full h-full flex-col bg-gray-50">
      {toUser.id !== 0 ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-white border-b border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              {/* Back móvil */}
              <button
                onClick={onBack}
                className="md:hidden text-gray-500 text-lg"
              >
                ←
              </button>

              <UserAvatar name={toUser.nombre} />

              <div className="leading-tight">
                <h5 className="text-sm md:text-base font-semibold text-gray-800">
                  {toUser.nombre} {toUser.apellido}
                </h5>
              </div>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-3 md:px-5 py-2 space-y-2 no-scrollbar">
            {allMessages.map((msg, index) =>
              msg.usuario_id === userObj.id ? (
                <MensajePropio key={index} msg={msg} />
              ) : (
                <MensajeAjeno key={index} msg={msg} />
              )
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 md:px-5 py-2 md:py-3 border-t border-gray-300">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!message.trim()) return;
                sendMessage(message);
                setNuevoMensaje(message);
                setMessage("");
              }}
              className="flex items-center gap-2 bg-gray-200 rounded-xl px-3 py-2 md:p-4"
            >
              <input
                className="flex-1 resize-none bg-transparent outline-none text-sm md:text-base"
                placeholder="Escribe un mensaje…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowTickets(true)}
                className="text-gray-600"
              >
                <IoTicketOutline size={18} className="md:size-6" />
              </button>

              <button type="submit" className="text-blue-600">
                <LuSend size={18} className="md:size-6" />
              </button>
            </form>
          </div>
        </>
      ) : (
        /* Estado vacío */
        <div className="flex flex-1 items-center justify-center text-center px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <LuMessageSquare size={28} className="text-gray-500" />
            </div>

            <h3 className="text-base md:text-lg font-semibold text-gray-700">
              Ningún chat seleccionado
            </h3>

            <p className="text-sm text-gray-500">
              Selecciona una conversación para comenzar.
            </p>
          </div>
        </div>
      )}

      {showTickets && (
        <TicketsChatModal
          onClose={() => setShowTickets(false)}
          setMessage={setMessage}
        />
      )}
    </div>
  );
}

/* ================== Mensajes ================== */

function MensajePropio({ msg }: { msg: MsgInterface }) {
  return (
    <div className="flex justify-end">
      <div className="bg-blue-600 text-white px-3 py-2 rounded-2xl max-w-[80%] md:max-w-xs shadow">
        <p className="text-sm whitespace-pre-wrap">{msg.contenido}</p>
        <span className="block text-[10px] opacity-70 text-right mt-1">
          {new Date(msg.created_at).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

function MensajeAjeno({ msg }: { msg: MsgInterface }) {
  return (
    <div className="flex justify-start">
      <div className="bg-white px-3 py-2 rounded-2xl max-w-[80%] md:max-w-xs shadow">
        {msg.Usuario && (
          <p className="text-[10px] font-semibold text-gray-600 mb-1">
            {msg.Usuario.nombre}
          </p>
        )}
        <p className="text-sm whitespace-pre-wrap">{msg.contenido}</p>
        <span className="block text-[10px] opacity-60 mt-1">
          {new Date(msg.created_at).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
