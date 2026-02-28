import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TicketAPI from "../../api/tickets";
import ComentariosAPI from "../../api/comentarios";
import { ImageViewerModal } from "../../components/imageViewerModal";
import { FinalizarAbiertoModal } from "../../components/finalizarAbiertoModal";
import IncideskSkeleton from "../../components/incideskEskeleton";

// Ajustado a la estructura REAL del ticket que estás recibiendo
interface Ticket {
  id: number;
  titulo: string;
  descripcion: string;
  solicitante: { id: number; nombre: string; apellido: string };
  tecnicoAsignado: { id: number; nombre: string; apellido: string };
  CategoriaTicket: { id: number; nombre: string };
  EstadoTicket: { id: number; nombre: string };
  PrioridadTicket: { id: number; nombre: string };
  fecha_creacion: string;
  fecha_ultima_actualizacion: string;
  fecha_cierre: string | null;
  solucion_final: string | null;
}

export function SolicitudPage() {
  const [searchParams] = useSearchParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  // Espacio para comentarios (placeholder)
  const [comentariosPrivados, setComentariosPrivados] = useState<any[]>([]);
  const [comentariosPublicos, setComentariosPublicos] = useState<any[]>([]);
  const [imagenAbierta, setImagenAbierta] = useState(false);
  const [finalizarAbierto, setFinalizarAbierto] = useState(false);

  const [nuevoComentario, setNuevoComentario] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const id = searchParams.get("num");
      if (!id) return;
      try {
        const t = await TicketAPI.getById(parseInt(id));
        if (t.estado_id == 3 || t.estado_id == 4 || t.id == null) {
          throw new Error("Acceso no autorizado");
        }
        setTicket(t);

        const coms = await ComentariosAPI.getComentariosById(id);
        setComentariosPublicos(coms.filter((c: any) => !c.es_nota_interna));
        setComentariosPrivados(coms.filter((c: any) => c.es_nota_interna));
      } catch (error) {
        navigate("/techUser/solicitudesActuales");
      }
    };

    fetchData();
  }, []);

  const [vistaComentarios, setVistaComentarios] = useState<
    "publico" | "privado"
  >("publico");

  const createComentario = async () => {
    if (!nuevoComentario.trim()) return;
    try {
      const user = sessionStorage.getItem("user");
      const userObj = JSON.parse(user as string);
      await ComentariosAPI.create(
        ticket!.id,
        userObj.id,
        nuevoComentario,
        vistaComentarios === "privado" ? true : false
      );
      setNuevoComentario("");
      location.reload();
    } catch (error) {
      console.error("Error al crear comentario:", error);
    }
  };
  if (!ticket) return <IncideskSkeleton />

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:p-5 w-full h-full overflow-auto">
      {/* PANEL IZQUIERDO — INFORMACIÓN DEL TICKET */}
      <div className="bg-white flex flex-col shadow-lg rounded-2xl p-6 space-y-6 lg:overflow-auto no-scrollbar w-full lg:w-1/3">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Solicitud</p>
            <h2 className="text-2xl font-semibold text-blue-700">
              #{ticket.id}
            </h2>
          </div>

          <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
            {ticket.EstadoTicket.nombre}
          </span>
          <div className="flex gap-3">
            <button
              className="bg-blue-700 text-white font-semibold rounded-full p-2 text-xs"
              onClick={() => setImagenAbierta(!imagenAbierta)}
            >
              Ver imagen
            </button>
            <button
              className="bg-green-500 text-white font-semibold rounded-full p-2 text-xs"
              onClick={() => setFinalizarAbierto(!finalizarAbierto)}
            >
              Finalizar
            </button>
          </div>
        </div>

        {/* TÍTULO Y DESCRIPCIÓN */}
        <div className="bg-[#F5F7FB] rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {ticket.titulo}
          </h3>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {ticket.descripcion}
          </p>
        </div>

        {/* METADATA PRINCIPAL */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-gray-400">Prioridad</p>
            <span className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-700 font-medium text-xs">
              {ticket.PrioridadTicket.nombre}
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-gray-400">Categoría</p>
            <span className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-700 font-medium text-xs">
              {ticket.CategoriaTicket.nombre}
            </span>
          </div>

          <div>
            <p className="text-gray-400">Solicitante</p>
            <p className="text-gray-700 font-medium">
              {ticket.solicitante.nombre} {ticket.solicitante.apellido}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Técnico asignado</p>
            <p className="text-gray-700 font-medium">
              {ticket.tecnicoAsignado.nombre} {ticket.tecnicoAsignado.apellido}
            </p>
          </div>
        </div>

        {/* FECHAS */}
        <div className="bg-[#F5F7FB] rounded-xl p-4 text-sm space-y-2">
          <p>
            <span className="text-gray-400">Creado:</span>{" "}
            <span className="text-gray-700">
              {new Date(ticket.fecha_creacion).toLocaleString()}
            </span>
          </p>

          <p>
            <span className="text-gray-400">Última actualización:</span>{" "}
            <span className="text-gray-700">
              {new Date(ticket.fecha_ultima_actualizacion).toLocaleString()}
            </span>
          </p>

          {ticket.fecha_cierre && (
            <p>
              <span className="text-gray-400">Cerrado:</span>{" "}
              <span className="text-gray-700">
                {new Date(ticket.fecha_cierre).toLocaleString()}
              </span>
            </p>
          )}
        </div>

        {/* SOLUCIÓN FINAL */}
        {ticket.solucion_final && (
          <div className="border border-green-200 bg-green-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-green-700 mb-1">
              Solución final
            </h3>
            <p className="text-sm text-green-800 leading-relaxed">
              {ticket.solucion_final}
            </p>
          </div>
        )}
      </div>

      {/* PANEL DERECHO — COMENTARIOS */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col w-full lg:h-full">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Seguimiento del Ticket
        </h2>

        {/* TABS */}
        <div className="flex bg-[#F5F7FB] rounded-xl p-1 mb-4">
          <button
            onClick={() => setVistaComentarios("publico")}
            className={`flex-1 py-2 text-sm rounded-lg transition
      ${
        vistaComentarios === "publico"
          ? "bg-white shadow text-blue-600 font-semibold"
          : "text-gray-500"
      }`}
          >
            Comentarios públicos
          </button>

          <button
            onClick={() => setVistaComentarios("privado")}
            className={`flex-1 py-2 text-sm rounded-lg transition
      ${
        vistaComentarios === "privado"
          ? "bg-white shadow text-blue-600 font-semibold"
          : "text-gray-500"
      }`}
          >
            Notas internas
          </button>
        </div>

        {/* CONTENEDOR DE MENSAJES */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-[#F5F7FB] rounded-xl p-4 space-y-3">
          {vistaComentarios === "publico"
            ? comentariosPublicos.map((comentario) => (
                <div className="bg-white rounded-xl shadow p-4">
                  <p className="text-sm text-gray-700">
                    {comentario.contenido}
                  </p>
                  <div className="text-xs text-gray-400 mt-2">
                    {comentario.Usuario.nombre} {comentario.Usuario.apellido} ·{" "}
                    {formatFechaVE(comentario.fecha)}
                  </div>
                </div>
              ))
            : comentariosPrivados.map((comentario) => (
                <div className="bg-white rounded-xl shadow p-4">
                  <p className="text-sm text-gray-700">
                    {comentario.contenido}
                  </p>
                  <div className="text-xs text-gray-400 mt-2">
                    {comentario.Usuario.nombre} {comentario.Usuario.apellido} ·{" "}
                    {formatFechaVE(comentario.fecha)}
                  </div>
                </div>
              ))}
        </div>

        {/* INPUT */}
        <div className="mt-4">
          <textarea
            rows={3}
            onChange={(e) => setNuevoComentario(e.target.value)}
            value={nuevoComentario}
            placeholder="Escribe un comentario..."
            className="w-full border rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <div className="flex justify-end mt-2">
            <button
              onClick={createComentario}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm"
            >
              Enviar comentario
            </button>
          </div>
        </div>
      </div>
      {imagenAbierta && (
        <ImageViewerModal
          ticket_id={ticket.id}
          onClose={() => setImagenAbierta(!imagenAbierta)}
        />
      )}
      {finalizarAbierto && (
        <FinalizarAbiertoModal
          ticket_id={ticket.id}
          onClose={() => setFinalizarAbierto(!finalizarAbierto)}
        />
      )}
    </div>
  );
}

export function formatFechaVE(fechaISO: string) {
  return new Intl.DateTimeFormat("es-VE", {
    timeZone: "America/Caracas",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(fechaISO));
}
