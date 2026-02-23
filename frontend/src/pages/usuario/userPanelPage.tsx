import { MensajeBienvenida } from "../../components/mensajeBienvenida";
import { Link } from "react-router-dom";
import { MdCreate } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { RiProfileFill } from "react-icons/ri";
import { IoIosHelpCircle } from "react-icons/io";
import { CajaNotificaciones } from "../../components/cajaNotificaciones";

import laptop from "../../assets/womanLaptop.png";

export function UserPanelPage() {
  const user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user as string);

  return (
    <div className="flex w-full h-full flex-col text-[#133463] pt-5 px-5  space-y-5 items-center ">
      <div className="flex flex-col lg:flex-row w-full h-full gap-5">
        <div className="flex flex-col bg-gray-100 lg:h-full w-full lg:w-2/3 p-4 lg:p-10 rounded-2xl lg:rounded-t-2xl gap-5">
          <div className="relative flex w-full h-48 bg-blue-700 rounded-2xl shadow-xl overflow-visible">
            <div className="flex flex-col w-full lg:w-1/2 p-6 gap-2">
              <MensajeBienvenida nombre={userObj.nombre} color="#ffffff" />

              <p className="text-white font-light">
                Reporta tus incidencias al equipo de tecnologia y consulta el
                estado de tus solicitudes
              </p>
            </div>

            <div className="hidden absolute right-0 bottom-0 h-full lg:flex items-end">
              <img
                src={laptop}
                alt="womanLaptop"
                className="h-[140%] translate-x-6 translate-y-5 pointer-events-none select-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 w-full text-center">
            <CardUI>
              <Link
                to="/user/crearTicket"
                className="flex w-full h-full flex-col items-center justify-between p-5"
              >
                <div className="bg-linear-to-b from-green-400 to-green-500 p-1 rounded-lg">
                  <MdCreate size={25} color="white" />
                </div>
                <h4 className="text-sm font-bold">Crear Solicitud</h4>
                <span className="text-xs">Comunica al equipo TI</span>
              </Link>
            </CardUI>
            <CardUI>
              <Link
                to="/user/solicitudes"
                className="flex w-full h-full flex-col items-center justify-between p-5"
              >
                <div className="bg-linear-to-b from-blue-400 to-blue-500 p-1 rounded-lg">
                  <IoTicket size={25} color="white" />
                </div>
                <h4 className="text-sm font-bold">Mis Solicitudes</h4>
                <span className="text-xs">
                  Consulta tus solicitudes abiertas
                </span>
              </Link>
            </CardUI>
            <CardUI>
              <Link
                to="/user/perfilPreferencias"
                className="flex w-full h-full flex-col items-center justify-between p-5"
              >
                <div className="bg-linear-to-b from-violet-400 to-violet-500 p-1 rounded-lg">
                  <RiProfileFill size={25} color="white" />
                </div>
                <h4 className="text-sm font-bold">Perfil y Preferencias</h4>
                <span className="text-xs">
                  Consulta y actualiza tu información personal
                </span>
              </Link>
            </CardUI>
            <CardUI>
              <Link
                to="/user/ayuda"
                className="flex w-full h-full flex-col items-center justify-between p-5"
              >
                <div className="bg-linear-to-b from-gray-400 to-gray-500 p-1 rounded-lg">
                  <IoIosHelpCircle size={25} color="white" />
                </div>
                <h4 className="text-sm font-bold">Ayuda</h4>
                <span className="text-xs">
                  Encuentra respuestas y aprende a usar el sistema
                </span>
              </Link>
            </CardUI>
          </div>
        </div>
        <div className="flex max-h-[50svh] lg:max-h-screen lg:h-full w-full lg:w-1/3 justify-center">
          <CajaNotificaciones />
        </div>
      </div>
    </div>
  );
}

function CardUI({ children }: any) {
  return (
    <div className="bg-gray-50 rounded-3xl shadow-xl flex flex-col items-center transition-all duration-100 hover:bg-gray-100">
      {children}
    </div>
  );
}
