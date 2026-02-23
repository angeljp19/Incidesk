import { useState } from "react";
import TicketAPI from "../api/tickets";
import { useNavigate } from "react-router-dom";

interface FinalizarAbiertoModalProps {
  ticket_id: number;
  onClose: () => void;
}

export function FinalizarAbiertoModal({
  ticket_id,
  onClose,
}: FinalizarAbiertoModalProps) {
  const [solucionFinal, setSolucionFinal] = useState("");
  const [finalizarError, setFinalizarError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (!ticket_id || ticket_id <= 0) return null;

  const handleFinalizar = async () => {
    if (!solucionFinal.trim()) return;

    try {
      setLoading(true);
      setFinalizarError(false);

      await TicketAPI.finalizar(ticket_id, 4, solucionFinal);

      navigate("/techUser/solicitudesActuales");
    } catch (error) {
      setFinalizarError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
        >
          ✕
        </button>

        {/* CONTENIDO */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-gray-800 text-center">
            Finalizar ticket
          </h3>

          <p className="text-sm text-gray-600 text-center">
            Describe la solución aplicada antes de finalizar el ticket.
          </p>

          {/* TEXTAREA */}
          <textarea
            value={solucionFinal}
            onChange={(e) => setSolucionFinal(e.target.value)}
            placeholder="Describe aquí la solución final del ticket..."
            className="w-full min-h-[120px] resize-none rounded-xl border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {finalizarError && (
            <p className="text-sm text-red-600 text-center">
              Ha ocurrido un error al finalizar el ticket.
            </p>
          )}

          {/* BOTONES */}
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>

            <button
              onClick={handleFinalizar}
              disabled={loading || !solucionFinal.trim()}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Finalizando..." : "Finalizar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
