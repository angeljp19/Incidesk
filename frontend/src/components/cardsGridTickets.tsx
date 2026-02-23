import { Link } from "react-router-dom";

const coloresFiltros = {
  activo: "#22c55e",
  vencido: "#ef4444",
  pendiente: "#eab308",
  finalizado: "#a855f7",
  todos: "#f3f4f6",
};

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

interface gridPros {
    filteredTickets: Ticket[];
    path: string
}

export function CardsGridTickets({filteredTickets, path}: gridPros) {

    return(
              <div className="overflow-auto  grid grid-cols-1 items-start lg:grid-cols-2 gap-4">
        {filteredTickets.map((ticket) => (
          <Link
            to={`${path}${ticket.id}`}
            key={ticket.id}
            className="w-full mb-4 cursor-pointer transition-all hover:shadow-lg rounded-xl bg-white"
          >
            <div className="flex flex-col p-4 space-y-3">
              {/* ENCABEZADO */}
              <div className="flex justify-between items-center">
                {/* Color + Título */}
                <div className="flex items-center space-x-3">
                  <div
                    className="size-4 rounded-full"
                    style={{
                      backgroundColor:
                        coloresFiltros[
                          ticket.EstadoTicket
                            .nombre as keyof typeof coloresFiltros
                        ],
                    }}
                  ></div>

                  <h5 className="text-lg font-semibold text-gray-900">
                    {ticket.titulo}
                  </h5>
                </div>

                {/* Estado del ticket */}
                <span
                  className="px-3 py-1 text-xs font-medium rounded-full capitalize"
                  style={{
                    backgroundColor:
                      coloresFiltros[
                        ticket.EstadoTicket
                          .nombre as keyof typeof coloresFiltros
                      ] + "22",
                    color:
                      coloresFiltros[
                        ticket.EstadoTicket
                          .nombre as keyof typeof coloresFiltros
                      ],
                  }}
                >
                  {ticket.EstadoTicket.nombre}
                </span>
              </div>

              {/* CUERPO */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                {/* Solicitante y técnico */}
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Solicitante: </span>
                    {ticket.solicitante.nombre} {ticket.solicitante.apellido}
                  </p>

                  <p>
                    <span className="font-medium">Técnico asignado: </span>
                    {ticket.tecnicoAsignado
                      ? `${ticket.tecnicoAsignado.nombre} ${ticket.tecnicoAsignado.apellido}`
                      : "Sin asignar"}
                  </p>
                </div>

                {/* Datos del ticket */}
                <div className="text-sm text-gray-500 md:text-end space-y-1 mt-3 md:mt-0">
                  <p>ID Ticket: #{ticket.id}</p>
                  <p>
                    Fecha:{" "}
                    {new Date(ticket.fecha_creacion).toLocaleDateString(
                      "es-VE",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
}