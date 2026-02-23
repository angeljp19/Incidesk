import { Nav } from "../components/navbar";
import { SideBarMenu } from "../components/sideBarMenu";
import { SideBarMenu2 } from "../components/sideBarMenu2";
import { Outlet } from "react-router-dom";
import { registerSocketUser } from "../sockets/socket";
import { useEffect } from "react";

export default function TechLayout() {
  useEffect(() => {
    const loadSocket = () => {
      const user = sessionStorage.getItem("user");
      if (user) {
        registerSocketUser(JSON.parse(user));
      }
    };

    loadSocket();
  }, []);
  return (
    <div className="min-h-dvh w-screen bg-blue-300 flex flex-col lg:max-h-dvh">
      {/* Navbar */}
      <div className="flex items-center p-2 lg:p-8 justify-center py-2 shrink-0">
        <Nav>
          <SideBarMenu2 />
        </Nav>
      </div>

      {/* Zona principal */}
      <div className="flex flex-1 overflow-hidden">
        <SideBarMenu />

        <div className="flex-1  overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
