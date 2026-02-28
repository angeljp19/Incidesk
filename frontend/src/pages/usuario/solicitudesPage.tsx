import { TextInput } from "flowbite-react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TicketAPI from "../../api/tickets";
import { CardsGridTickets } from "../../components/cardsGridTickets";
import { PageHeader } from "../../components/pageHeader";
import { IncideskTabsFiltros } from "../../components/incideskTabsFiltros";
import { useLocation } from "react-router-dom";
import IncideskSkeleton from "../../components/incideskEskeleton";

interface Ticket {
  id: number;
  titulo: string;
  descripcion: string;
  solicitante: { id: number; nombre: string; apellido: string };
  tecnicoAsignado: { id: number; nombre: string; apellido: string };
  CategoriaTicket: { id: number; nombre: string };
  EstadoTicket: { id: number; nombre: string };
  PrioridadTicket: { id: number; nombre: string };
  fecha_creacion: string;
  fecha_ultima_actualizacion: string;
  fecha_cierre: string;
  solucionFinal: string;
}

export function SolicitudesPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const user = sessionStorage.getItem("user");
        const userObj = JSON.parse(user as string);
        const tickets = await TicketAPI.getAll({ solicitanteId: userObj.id });
        setTickets(tickets);
      } catch (error) {
      } finally {
        setLoading(false)
      }
    };
    fetchTickets();
  }, []);

  const filter = searchParams.get("estado") || "todos";
  const filteredTickets = tickets.filter((ticket) => {
    if (search) {
      return ticket.id.toString().includes(search);
    }
    if (filter === "todos") return true;
    return ticket.EstadoTicket.nombre.toLowerCase() === filter.toLowerCase();
  });

  const location = useLocation();
  const estadoActual =
    new URLSearchParams(location.search).get("estado") ?? "todos";

  if (loading) return <IncideskSkeleton />;

  return (
    <div className="flex flex-col w-full h-full space-y-5 lg:p-10">
      <div className="hidden lg:flex flex-col md:flex-row w-full justify-between gap-5 items-center">
        <PageHeader
          title="Mis Solicitudes"
          subtitle="Registro de todas las solicitudes que has hecho al equipo de tecnología"
        />
        <div className="flex w-full lg:w-1/2 justify-center items-center">
          <IncideskTabsFiltros
            activeValue={estadoActual}
            onChange={() => setSearch("")}
            items={[
              {
                label: "Activos",
                value: "activo",
                to: "/user/solicitudes?estado=activo",
                activeColor: "bg-green-600",
              },
              {
                label: "Por asignar",
                value: "pendiente",
                to: "/user/solicitudes?estado=pendiente",
                activeColor: "bg-yellow-400",
              },
              {
                label: "Finalizados",
                value: "finalizado",
                to: "/user/solicitudes?estado=finalizado",
                activeColor: "bg-purple-600",
              },
              {
                label: "Todos",
                value: "todos",
                to: "/user/solicitudes?estado=todos",
                activeColor: "bg-gray-400",
              },
            ]}
          />
        </div>
      </div>
      <div className="sticky top-0 bg-white  md:w-1/3 rounded-3xl ">
        <TextInput
          type="text"
          placeholder="Buscar ticket..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full "
        />
      </div>
      <CardsGridTickets
        filteredTickets={filteredTickets}
        path="/user/solicitudTicket?num="
      />
    </div>
  );
}
