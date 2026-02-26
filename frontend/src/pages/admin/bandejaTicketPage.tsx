import { TextInput } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { PageHeader } from "../../components/pageHeader";
import { CardsGridTickets } from "../../components/cardsGridTickets";
import TicketAPI from "../../api/tickets";
import { IncideskTabsFiltros } from "../../components/incideskTabsFiltros";
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

export function BandejaTicketPage() {

  const [search, setSearch] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const estadoActual =
    new URLSearchParams(location.search).get("estado") ?? "todos";

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await TicketAPI.getAll();
        setTickets(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const hoy = new Date();
  const UNA_SEMANA_EN_MS = 7 * 24 * 60 * 60 * 1000;

  const filteredTickets = tickets.filter((ticket) => {
    const texto = search.toLowerCase().trim();

    if (texto) {
      const coincideId = ticket.id.toString().includes(texto);

      const coincideTecnicoNombre = ticket?.tecnicoAsignado?.nombre
        ?.toLowerCase()
        .includes(texto);
      const coincideTecnicoApellido = ticket?.tecnicoAsignado?.apellido
        ?.toLowerCase()
        .includes(texto);

      const coincideSolicitanteNombre = ticket?.solicitante?.nombre
        ?.toLowerCase()
        .includes(texto);
      const coincideSolicitanteApellido = ticket?.solicitante?.apellido
        ?.toLowerCase()
        .includes(texto);

      if (
        !coincideId &&
        !coincideTecnicoNombre &&
        !coincideTecnicoApellido &&
        !coincideSolicitanteNombre &&
        !coincideSolicitanteApellido
      ) {
        return false;
      }
    }

    const fechaCreacion = new Date(ticket.fecha_creacion);
    const esVencido = hoy.getTime() - fechaCreacion.getTime() > UNA_SEMANA_EN_MS && ticket.EstadoTicket.id !== 4;

    if (estadoActual === "todos") return true;

    if (estadoActual === "vencido") return esVencido;

    return ticket.EstadoTicket.nombre.toLowerCase() === estadoActual.toLowerCase();
  });

  if (loading) return <IncideskSkeleton />;

  return (
    <div className="flex flex-col w-full h-full gap-5 p-4 lg:p-8">
      {/* HEADER + TABS */}
      <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4">
        <PageHeader
          title="Bandeja de Tickets"
          subtitle="Asigna, modifica y dale seguimientos a las solicitudes realizadas"
        />

        <div className="flex flex-col md:flex-row w-full md:w-auto gap-3 md:gap-2">
          <IncideskTabsFiltros
            activeValue={estadoActual}
            onChange={() => setSearch("")}
            items={[
              { label: "Activos", value: "activo", to: "/tech/bandejaTicket?estado=activo", activeColor: "bg-green-600" },
              { label: "Vencidos", value: "vencido", to: "/tech/bandejaTicket?estado=vencido", activeColor: "bg-red-600" },
              { label: "Por asignar", value: "pendiente", to: "/tech/bandejaTicket?estado=pendiente", activeColor: "bg-yellow-400" },
              { label: "Finalizados", value: "finalizado", to: "/tech/bandejaTicket?estado=finalizado", activeColor: "bg-purple-600" },
              { label: "Todos", value: "todos", to: "/tech/bandejaTicket?estado=todos", activeColor: "bg-gray-400" },
            ]}
          />

          <TextInput
            type="text"
            placeholder="Buscar ticket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 mt-2 md:mt-0"
          />
        </div>
      </div>

      {/* GRID DE TICKETS */}
      <div className="flex-1 overflow-auto">
        <CardsGridTickets
          filteredTickets={filteredTickets}
          path={"/tech/ticket?num="}
   
        />
      </div>
    </div>
  );
}
