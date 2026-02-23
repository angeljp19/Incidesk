import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import { AdminPanelPage } from "./pages/admin/adminPanelPage.tsx";
import TechLayout from "./pages/techLayout.tsx";
import LoginPage from "./pages/loginPage.tsx";
import { GestionUsuariosPage } from "./pages/admin/gestionUsuariosPage.tsx";
import { BandejaTicketPage } from "./pages/admin/bandejaTicketPage.tsx";
import { GestionPersonalTIPage } from "./pages/admin/gestionPersonalTIPage.tsx";
import { UserPanelPage } from "./pages/usuario/userPanelPage.tsx";
import { CrearTicketPage } from "./pages/usuario/crearTicketPage.tsx";
import { SolicitudesPage } from "./pages/usuario/solicitudesPage.tsx";
import { PerfilPreferenciasPage } from "./pages/usuario/perfilPreferenciaspage.tsx";
import { AyudaPage } from "./pages/usuario/ayudaPage.tsx";
import { TecnicoPanelPage } from "./pages/tecnico/tecnicoPanelPage.tsx";
import { HistorialSolicitudesPage } from "./pages/tecnico/historialSolicitudesPage.tsx";
import { SolicitudesActualesPage } from "./pages/tecnico/solicitudesActualesPage.tsx";
import { SolicitudPage } from "./pages/tecnico/solicitudPage.tsx";
import { SolicitudHistorialPage } from "./pages/tecnico/solicitudHistorialpage.tsx";
import { MensajeriaPage } from "./pages/admin/mensajeriaPage.tsx";
import { MensajeriaTechPage } from "./pages/tecnico/mensajeriaTechPage.tsx";
import { SolicitudTicketPage } from "./pages/usuario/solicitudTicketPage.tsx";
import { TicketPage } from "./pages/admin/ticketPage.tsx";

import { ThemeInit } from "../.flowbite-react/init";
import TecnicoLayout from "./pages/tecnicoLayout.tsx";

import { ConfiguracionPage } from "./pages/admin/configuracionPage.tsx";

import { AyudaPageTecnico } from "./pages/tecnico/ayudaPage.tsx";
import { ReportesPage } from "./pages/admin/reportesPage.tsx";

import RecuperarContraseñaPage from "./pages/recuperarContraseñaPage.tsx";

import { ProtectedRoute } from "./components/protectedRoutes.tsx";

const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/recuperarContraseña",
    element: <RecuperarContraseñaPage />,
  },
  {
    path: "/tech",
    element: <TechLayout />,
    children: [
      {
        element: <ProtectedRoute rol_id={3} />,
        children: [
          {
            index: true,
            element: <Navigate to="adminpanel" replace />,
          },
          {
            path: "adminpanel",
            element: <AdminPanelPage />,
          },
          {
            path: "configuracion",
            element: <ConfiguracionPage />,
          },
          {
            path: "gestionUsuarios",
            element: <GestionUsuariosPage />,
          },
          {
            path: "bandejaTicket",
            element: <BandejaTicketPage />,
          },
          {
            path: "ticket",
            element: <TicketPage />,
          },
          {
            path: "personalTI",
            element: <GestionPersonalTIPage />,
          },
          {
            path: "mensajeria",
            element: <MensajeriaPage />,
          },
          {
            path: "reportes",
            element: <ReportesPage />,
          },
        ],
      },
    ],
  },

  {
    path: "/user",
    element: <TecnicoLayout />,
    children: [
      {
        element: <ProtectedRoute rol_id={2} />,
        children: [
          {
            index: true,
            element: <Navigate to="userPanel" replace />,
          },
          {
            path: "userPanel",
            element: <UserPanelPage />,
          },
          {
            path: "crearTicket",
            element: <CrearTicketPage />,
          },
          {
            path: "solicitudes",
            element: <SolicitudesPage />,
          },
          {
            path: "solicitudTicket",
            element: <SolicitudTicketPage />,
          },
          {
            path: "perfilPreferencias",
            element: <PerfilPreferenciasPage />,
          },
          {
            path: "ayuda",
            element: <AyudaPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/techUser",
    element: <TecnicoLayout />,
    children: [
      {
        element: <ProtectedRoute rol_id={1} />,
        children: [
          {
            index: true,
            element: <Navigate to="tecnicoPanel" replace />,
          },
          {
            path: "tecnicoPanel",
            element: <TecnicoPanelPage />,
          },
          {
            path: "historialSolicitudes",
            element: <HistorialSolicitudesPage />,
          },
          {
            path: "solicitudesActuales",
            element: <SolicitudesActualesPage />,
          },
          {
            path: "mensajeriaTech",
            element: <MensajeriaTechPage />,
          },
          {
            path: "solicitud",
            element: <SolicitudPage />,
          },
          {
            path: "solicitudHistorial",
            element: <SolicitudHistorialPage />,
          },
          {
            path: "perfilPreferencias",
            element: <PerfilPreferenciasPage />,
          },
          {
            path: "ayuda",
            element: <AyudaPageTecnico />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeInit />
    <RouterProvider router={router} />
  </StrictMode>,
);
