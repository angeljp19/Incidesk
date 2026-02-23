import { TextInput } from "flowbite-react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TicketAPI from "../../api/tickets";
import { CardsGridTickets } from "../../components/cardsGridTickets";
import { IncideskTabsFiltros } from "../../components/incideskTabsFiltros";
import { PageHeader } from "../../components/pageHeader";
import IncideskSkeleton from "../../components/incideskEskeleton";

interface Ticket {
  id: number;
  titulo: string;
  descripcion: string;
  solicitante: { id: number; nombre: string; apellido: string };
  tecnicoAsignado: { id: number; nombre: string; apellido: string };
  tecnicoAsignado_id: number;
  CategoriaTicket: { id: number; nombre: string };
  EstadoTicket: { id: number; nombre: string };
  PrioridadTicket: { id: number; nombre: string };
  fecha_creacion: string;
  fecha_ultima_actualizacion: string;
  fecha_cierre: string;
  solucionFinal: string;
}

export function HistorialSolicitudesPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const user = sessionStorage.getItem("user");
        const userObj = JSON.parse(user as string);
        const tickets = await TicketAPI.getAll(userObj.id);
        const filtrados = tickets.filter(
          (t: any) => t.tecnico_asignado_id === userObj.id
        );
        setTickets(filtrados);
      } catch (error) {
      } finally {
        setLoading(false)
      }
    };
    fetchTickets();
  }, []);

  const filter = searchParams.get("estado") || "todos";
  const filteredTickets = tickets.filter((ticket) => {
    const texto = search.toLowerCase().trim();

    // FILTRO DE BÚSQUEDA
    if (texto) {
      const coincideId = ticket.id.toString().includes(texto);

      const coincideSolicitante = ticket?.solicitante?.nombre
        ?.toLowerCase()
        .includes(texto);
      const coincideSolicitanteApellido = ticket?.solicitante?.apellido
        ?.toLowerCase()
        .includes(texto);

      if (!coincideId && !coincideSolicitante && !coincideSolicitanteApellido) {
        return false;
      }
    }
    if (filter === "todos") return true;
    return ticket.EstadoTicket.nombre.toLowerCase() === filter.toLowerCase();
  });
  const location = useLocation();
  const estadoActual =
    new URLSearchParams(location.search).get("estado") ?? "todos";
  if (loading) return <IncideskSkeleton />

  return (
    <div className="flex flex-col w-full h-full space-y-5 p-4 g:p-10">
      <div className="flex flex-col md:flex-row w-full justify-between gap-5 items-center">
        <PageHeader
          title="Historial de solicitudes"
          subtitle="Registro historico de todas tus solicutes asignadas"
        />
        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <IncideskTabsFiltros
            activeValue={estadoActual}
            onChange={() => setSearch("")}
            items={[
              {
                label: "Activos",
                value: "activo",
                to: "/techUser/historialSolicitudes?estado=activo",
                activeColor: "bg-green-600",
              },
              {
                label: "Finalizados",
                value: "finalizado",
                to: "/techUser/historialSolicitudes?estado=finalizado",
                activeColor: "bg-purple-600",
              },
              {
                label: "Todos",
                value: "todos",
                to: "/techUser/historialSolicitudes?estado=todos",
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
        path={"/techUser/solicitudHistorial?num="}
      />
    </div>
  );
}
