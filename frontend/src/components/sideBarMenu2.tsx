
import {
  Drawer,
  DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems
} from "flowbite-react";
import { useState } from "react";
import {
  HiTable,
  HiChartPie,
  HiInbox,
  HiUserGroup,
  HiShieldCheck
} from "react-icons/hi";

import { MdOutlineMessage } from "react-icons/md";
import { IoMenu } from "react-icons/io5";



export function SideBarMenu2() {
   const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
   return (
    <div className="block lg:hidden">
     <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex justify-center items center"
      >
       <IoMenu className="w-8 h-7 text-gray-700  cursor-pointer" />
      </div>
      <Drawer className="" open={isOpen} onClose={handleClose}>
        <DrawerHeader title="MENU" titleIcon={() => <></>} />
        <DrawerItems>
          <Sidebar aria-label="Default sidebar example">
            <SidebarItems>
              <SidebarItemGroup>
                <SidebarItem href="/tech/adminpanel" icon={HiChartPie}>
                  Panel Principal
                </SidebarItem>
                <SidebarItem
                  href="/tech/gestionUsuarios"
                  icon={HiUserGroup}
                >
                  Gestion de Usuarios
                </SidebarItem>
                <SidebarItem href="/tech/bandejaTicket" icon={HiInbox}>
                  Bandeja de Tickets
                </SidebarItem>
                <SidebarItem href="/tech/personalTI" icon={HiShieldCheck}>
                  Gestion de Personal TI
                </SidebarItem>
                <SidebarItem href="/tech/mensajeria" icon={MdOutlineMessage}>
                  Mensajeria
                </SidebarItem>
                <SidebarItem href="/tech/reportes" icon={HiTable}>
                  Reportes
                </SidebarItem>
              </SidebarItemGroup>
            </SidebarItems>
          </Sidebar>
        </DrawerItems>
      </Drawer>
    </div>
    );
}
