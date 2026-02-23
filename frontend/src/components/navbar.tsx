import { Navbar, Popover } from "flowbite-react";
import type { ReactNode } from "react";
import { HiUser, HiCog } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import logo3n from "../assets/3nlogo.png"


interface NavPro {
  children: ReactNode
}

export function Nav({children} : NavPro) {
  const user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user as string);
  const navigate = useNavigate()

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
            sessionStorage.clear();
            navigate("/login");
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
    <Navbar
      fluid
      className="w-full lg:w-2/3 rounded-3xl border border-gray-50 shadow-[0_2px_5px_rgba(0,0,0,0.3)]"
    >
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between px-4 gap-2">
        <div className="w-full flex items-center justify-between">
          <h1 onClick={() => {navigate("/tech/adminPanel")}} className="cursor-pointer text-left">
            <img src={logo3n} alt="Logo 3n" className="w-10"/>
          </h1>

          <div className="hidden w-1/2 md:flex "></div>

          <div className="flex gap-4">
            <HiCog onClick={() => {navigate("/tech/configuracion")}} className="w-6 h-6 text-gray-700  cursor-pointer" />
            <Popover content={popoverContent} placement="left">
              <HiUser className="w-6 h-6 text-gray-700  cursor-pointer" />
            </Popover>
            {children}
          </div>
        </div>
      </div>
    </Navbar>
  );
}
