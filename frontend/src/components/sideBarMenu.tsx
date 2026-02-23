import { Tooltip } from "flowbite-react";

import { Link } from "react-router-dom";

import {
  HiTable,
  HiChartPie,
  HiInbox,
  HiUserGroup,
  HiShieldCheck,
} from "react-icons/hi";

import { MdOutlineMessage } from "react-icons/md";


export function SideBarMenu() {
  return (
    <div className="hidden lg:flex px-6 py-5">
      <div className="flex flex-col bg-blue-700 p-4 rounded-full gap-5 h-[50vh]">
        <Tooltip content="Panel Principal" placement="right">
          <Link to="/tech/adminpanel">
            <HiChartPie size={24} color="#f6f6f6"/>
          </Link>
        </Tooltip>
        <Tooltip content="Gestion de Usuarios" placement="right">
          <Link to="/tech/gestionUsuarios">
            <HiUserGroup size={24} color="#f6f6f6"/>
          </Link>
        </Tooltip>
        <Tooltip content="Bandeja de Tickets" placement="right">
          <Link to="/tech/bandejaTicket">
            <HiInbox size={24} color="#f6f6f6"/>
          </Link>
        </Tooltip>
        <Tooltip content="Gestion de Personal TI" placement="right">
          <Link to="/tech/personalTI">
            <HiShieldCheck size={24} color="#f6f6f6"/>
          </Link>
        </Tooltip>
        <Tooltip content="Mensajeria" placement="right">
          <Link to="/tech/mensajeria">
            <MdOutlineMessage size={24} color="#f6f6f6"/>
          </Link>
        </Tooltip>
        <Tooltip content="Reportes" placement="right">
          <Link to="/tech/reportes">
            <HiTable size={24} color="#f6f6f6"/>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}
