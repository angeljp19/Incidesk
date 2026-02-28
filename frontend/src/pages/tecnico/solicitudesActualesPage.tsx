import { TextInput } from "flowbite-react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TicketAPI from "../../api/tickets";
import { CardsGridTickets } from "../../components/cardsGridTickets";
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

export function SolicitudesActualesPage() {
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
          (t: any) => t.tecnico_asignado_id === userObj.id && t.estado_id == 1
        );
        setTickets(filtrados);
      } catch (error) {
      } finally {
        setLoading(false);
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

  if (loading) return <IncideskSkeleton />;

  return (
    <div className="flex flex-col w-full h-full space-y-5 p-4 lg:p-10">
      <div className="hidden lg:flex flex-col md:flex-row w-full justify-between space-y-5">
        <PageHeader
          title="Solicitudes Actuales"
          subtitle="Solicitudes activas asignadas"
        />
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
        path="/techUser/solicitud?num="
      />
    </div>
  );
}
