import { useState } from "react";
import { env } from "../env";

interface ImageViewerModalProps {
  ticket_id: number;
  onClose: () => void;
}

export function ImageViewerModal({ ticket_id, onClose }: ImageViewerModalProps) {
  const [imageError, setImageError] = useState(false);

  if (!ticket_id || ticket_id <= 0) return null;

  const imageUrl = `${env.BACK_URL}/tickets/archivo/${ticket_id}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 p-6"
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
        <div className="flex items-center justify-center max-h-[80vh] rounded-xl">
          {imageError ? (
            <p className="text-gray-500 text-sm text-center">
              Ninguna imagen ha sido cargada con este ticket.
            </p>
          ) : (
            <img
              src={imageUrl}
              alt="Vista previa"
              onError={() => setImageError(true)}
              className="max-h-[80vh] w-auto object-contain rounded-xl"
            />
          )}
        </div>
      </div>
    </div>
  );
}
