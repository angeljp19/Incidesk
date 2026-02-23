import { Outlet } from "react-router-dom";
import { registerSocketUser } from "../sockets/socket";
import { useEffect } from "react";

import { Popover, Navbar } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logo3n from "../assets/3nlogo.png"


export default function TecnicoLayout() {
  useEffect(() => {
    const loadSocket = () => {
      const user = sessionStorage.getItem("user");
      if (user) {
        registerSocketUser(JSON.parse(user));
      }
    };

    loadSocket();
  }, []);
  const user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user as string);
  const navigate = useNavigate()

  const url =
    userObj.rol_id === 1 ? "/techUser/tecnicoPanel" : "/user/userPanel";

  const popoverContent = (
    <div className="w-64 p-3">
      <div className="mb-2 flex items-center justify-between"></div>
      <p className="text-base font-semibold leading-none text-gray-900 ">
        {userObj.nombre} {userObj.apellido}
      </p>
      <p className="mb-3 text-sm font-normal">{userObj.email}</p>
      <p className="mb-4 text-sm">{userObj.Departamento.nombre}</p>
      <div className="flex justify-center">
        <button
        onClick={() => {
          sessionStorage.clear()
          navigate("/login")
        }}
          type="button"
          className="rounded-lg bg-blue-700 px-3 py-1.5 text-xs outline-none font-medium text-white hover:bg-blue-800  "
        >
          Cerrar sesion
        </button>
      </div>
    </div>
  );
  return (
    <div className="min-h-dvh h-dvh w-screen bg-blue-300 flex flex-col lg:max-h-dvh items-center">
      <div className="flex w-full items-center p-2 lg:p-8 justify-center py-2 shrink-0">
        <Navbar
          fluid
          className="w-full lg:w-2/3 rounded-3xl border border-gray-50 shadow-[0_2px_5px_rgba(0,0,0,0.3)]"
        >
          <div className="w-full flex flex-col md:flex-row items-center md:justify-between px-4 gap-2">
            <div className="w-full flex items-center justify-between">
              <Link
                to={url}
                className="bg-linear-to-r from-blue-500 to-violet-900 bg-clip-text text-xl font-bold text-transparent text-left"
              >
                            <img src={logo3n} alt="Logo 3n" className="w-10"/>

              </Link>

              <div className="flex gap-4">
                <Popover content={popoverContent} placement="left">
                  <HiUser className="w-6 h-6 text-gray-700  cursor-pointer" />
                </Popover>
              </div>
            </div>

          </div>
        </Navbar>
      </div>
      {/* Zona principal */}
      <div className="flex w-full h-full overflow-hidden p-2">
        <Outlet />
      </div>
    </div>
  );
}
