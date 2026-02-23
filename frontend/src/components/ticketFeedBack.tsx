import { useEffect } from "react";

interface TicketFeedbackModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (valor: "Muy buena" | "Buena" | "Regular" | "Mala") => void;
}

const opciones = [
  { label: "Muy buena", emoji: "⭐⭐⭐⭐" },
  { label: "Buena", emoji: "⭐⭐⭐" },
  { label: "Regular", emoji: "⭐⭐" },
  { label: "Mala", emoji: "⭐" },
] as const;

export function TicketFeedbackModal({
  open,
  onClose,
  onSubmit,
}: TicketFeedbackModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl animate-fadeIn"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          ¿Cómo fue tu experiencia?
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Tu opinión nos ayuda a mejorar el servicio en Incidesk
        </p>

        {/* Opciones */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {opciones.map((opcion) => (
            <button
              key={opcion.label}
              onClick={() => {
                onSubmit(opcion.label);
                onClose();
              }}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 p-4 transition hover:bg-blue-50 hover:border-blue-400"
            >
              <span className="text-3xl">{opcion.emoji}</span>
              <span className="font-medium text-gray-700">
                {opcion.label}
              </span>
            </button>
          ))}
        </div>

        {/* Acción secundaria */}
        <button
          onClick={onClose}
          className="mt-6 w-full text-center text-sm text-gray-400 hover:text-gray-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
