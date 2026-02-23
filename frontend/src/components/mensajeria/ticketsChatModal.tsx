import { useEffect, useState } from "react";
import TicketAPI from "../../api/tickets";

interface TicketsChatModalProps {
  onClose: () => void;
  setMessage: (msg: string) => void;
}

export function TicketsChatModal(props: TicketsChatModalProps) {
  const { onClose, setMessage } = props;
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user as any);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await TicketAPI.getAll();

        if (userObj.rol_id === 1) {
          setTickets(
            data.filter((t: any) => t.tecnico_asignado_id === userObj.id)
          );
        }

        if (userObj.rol_id === 3) {
          setTickets(data);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full md:w-[640px]
          max-h-[50vh]
          bg-white
          rounded-t-3xl md:rounded-3xl
          shadow-2xl
          flex flex-col
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Seleccionar ticket
            </h2>
            <p className="text-sm text-gray-500">
              Elige un ticket para enviarlo al chat
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {loading && (
            <p className="text-sm text-gray-500 text-center py-10">
              Cargando tickets…
            </p>
          )}

          {!loading && tickets.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-10">
              No hay tickets disponibles
            </p>
          )}

          {!loading &&
            tickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => {
                  const msg = formatTicketMessage(ticket);
                  setMessage(msg);
                  onClose();
                }}
                className="
                  w-full text-left
                  bg-gray-50 hover:bg-blue-50
                  border border-gray-200
                  rounded-2xl
                  p-4
                  transition
                  group
                "
              >
                {/* Header card */}
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-700">
                    #{ticket.id} — {ticket.titulo}
                  </h3>
                </div>

                {/* Descripción */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {ticket.descripcion}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                  <Badge color="blue">{ticket.CategoriaTicket.nombre}</Badge>

                  <Badge color="yellow">{ticket.PrioridadTicket.nombre}</Badge>

                  <Badge color="green">{ticket.EstadoTicket.nombre}</Badge>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "blue" | "yellow" | "green";
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

function formatTicketMessage(ticket: any) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleString("es-VE", {
      dateStyle: "short",
      timeStyle: "short",
    });
  console.log(ticket);
  return `
📄 Ticket #${ticket.id}
━━━━━━━━━━━━━━
📝 Título:
${ticket.titulo}

📌 Descripción:
${ticket.descripcion}

🏷️ Categoría: ${ticket.CategoriaTicket.nombre}
📊 Estado: ${ticket.EstadoTicket.nombre}
⚡ Prioridad: ${ticket.PrioridadTicket.nombre}

👤 Solicitante: ${ticket.solicitante.nombre} ${ticket.solicitante.apellido}
🧑‍🔧 Técnico asignado: ${ticket.tecnicoAsignado?.nombre ?? ""} ${
    ticket.tecnicoAsignado?.apellido ?? ""
  }

📅 Creado: ${formatDate(ticket.fecha_creacion)}
🔄 Última actualización: ${
    ticket.fecha_ultima_actualizacion
      ? formatDate(ticket.fecha_ultima_actualizacion)
      : ""
  }
`.trim();
}
