import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { CiCircleAlert } from "react-icons/ci";
import NotificacionesAPI from "../api/notificaciones";
import { NotificacionPopOver } from "./notificacionPopOver";

interface notificacion {
  id: number;
  titulo: string;
  tipo_id: number;
  entidad_id: number;
  receptor_id?: number;
  hexColor: string;
  fecha: Date;
  activo: boolean;
  receptor: {
    id: number;
    nombre: string;
    apellido: string;
  } | null;
  info: string;
}
export function CajaNotificaciones() {
  const [notificaciones, setNotificaciones] = useState<notificacion[]>([]);
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  const user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user as string);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      const noti = await NotificacionesAPI.getAll();

      if (userObj.rol_id === 3) {
        setNotificaciones(noti);
        return;
      }

      setNotificaciones(noti.filter((n: any) => n.receptor_id === userObj.id));
    };

    fetchNotificaciones();
  }, []);

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2 text-gray-800 font-semibold">
          <FaRegBell className="text-blue-600" />
          <span>Notificaciones</span>
        </div>

      
      </div>

      {/* LISTA */}
      <div
        className="flex flex-col gap-2 h-full overflow-auto pr-1"
        onScroll={() => setOpenPopoverId(null)}
      >
        {notificaciones.length === 0 && (
          <div className="text-sm text-gray-500 text-center py-6">
            No hay notificaciones nuevas
          </div>
        )}

        {notificaciones.map((notificacion) => (
          <NotificacionPopOver
            key={notificacion.id}
            titulo={notificacion.titulo}
            info={notificacion.info}
            open={openPopoverId === notificacion.id}
            onClose={() => setOpenPopoverId(null)}
          >
            <div
              onMouseEnter={() => setOpenPopoverId(notificacion.id)}
              className="
                flex items-center gap-3
                bg-gray-50 hover:bg-blue-50
                p-3 rounded-xl
                cursor-pointer
                transition-all duration-150
                border border-transparent hover:border-blue-200
              "
            >
              {/* ICONO */}
              <div
                style={{ backgroundColor: notificacion.hexColor }}
                className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
              >
                <CiCircleAlert size={22} className="text-white" />
              </div>

              {/* TEXTO */}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-medium text-gray-800 truncate">
                  {notificacion.titulo}
                </span>

                <span className="text-xs text-gray-500">
                  {new Date(notificacion.fecha).toLocaleDateString("es-VE")} ·{" "}
                  {new Date(notificacion.fecha).toLocaleTimeString("es-VE")}
                </span>
              </div>
            </div>
          </NotificacionPopOver>
        ))}
      </div>
    </div>
  );
}
