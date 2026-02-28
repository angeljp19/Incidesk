import { useEffect, useState } from "react";
import {
  Card,
  Modal,
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import UsuarioApi from "../../api/usuarios";
import TicketAPI from "../../api/tickets";
import { useNavigate } from "react-router-dom";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { PageHeader } from "../../components/pageHeader";
import { UserTeamCard } from "../../components/userTeamCard";
import IncideskSkeleton from "../../components/incideskEskeleton";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  rol_id: number;
}

export function GestionPersonalTIPage() {
  const [administradores, setAdministradores] = useState<Usuario[]>([]);
  const [tecnicos, setTecnicos] = useState<Usuario[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Estados del modal
  const [modalOpen, setModalOpen] = useState(false);
  const [tecnicoSeleccionado, setTecnicoSeleccionado] =
    useState<Usuario | null>(null);
  const [ticketsTecnico, setTicketsTecnico] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosDB = await UsuarioApi.getAll();

        const admins = usuariosDB.filter(
          (u: any) => u.rol.toLowerCase() === "administrador"
        );

        const tecnicos = usuariosDB.filter(
          (u: any) =>
            u.rol.toLowerCase() === "técnico" ||
            u.rol.toLowerCase() === "tecnico"
        );

        const tickets = await TicketAPI.getAll();

        setAdministradores(admins);
        setTecnicos(tecnicos);
        setTickets(tickets);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Resumen de tickets por técnico
  const resumenPorTecnico = tecnicos.reduce((acc: any, tec) => {
    const asignados = tickets.filter(
      (t: any) => t.tecnico_asignado_id === tec.id
    );

    acc[tec.id] = {
      total: asignados.length,
      activos: asignados.filter((t: any) => t.estado_id === 1).length,
      cerrados: asignados.filter((t: any) =>
        ["finalizado"].includes(t.EstadoTicket?.nombre?.toLowerCase())
      ).length,
    };

    return acc;
  }, {});

  // Datos para la gráfica
  const chartData = {
    labels: tecnicos.map((t) => `${t.nombre} ${t.apellido}`),

    datasets: [
      {
        label: "Tickets Totales",
        data: tecnicos.map((t) => resumenPorTecnico[t.id]?.total ?? 0),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Tickets Activos",
        data: tecnicos.map((t) => resumenPorTecnico[t.id]?.activos ?? 0),
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
      {
        label: "Tickets Cerrados",
        data: tecnicos.map((t) => resumenPorTecnico[t.id]?.cerrados ?? 0),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  // Abrir modal cuando se hace click en un técnico
  const abrirModalTecnico = (tec: Usuario) => {
    setTecnicoSeleccionado(tec);

    const asignados = tickets.filter(
      (t: any) => t.tecnico_asignado_id === tec.id
    );

    setTicketsTecnico(asignados);
    setModalOpen(true);
  };
  if (loading) return <IncideskSkeleton />;

  return (
    <div className="flex w-full h-full flex-col space-y-10 overflow-auto no-scrollbar p-4">
      <PageHeader
        title="Gestión del Personal TI"
        subtitle="Conoce al equipo de técnicos y administradores"
      />

      {/* ADMINISTRADORES */}
      <section>
        <h3 className="text-xl font-semibold mb-3">Administradores</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {administradores.map((admin) => (
            <UserTeamCard
              key={admin.id}
              nombre={admin.nombre}
              apellido={admin.apellido}
              email={admin.email}
              rol={admin.rol}
              color="blue"
            />
          ))}
        </div>
      </section>

      {/* TECNICOS */}
      <section>
        <h3 className="text-xl font-semibold mb-3">Técnicos</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tecnicos.map((tec) => (
            <UserTeamCard
              key={tec.id}
              nombre={tec.nombre}
              apellido={tec.apellido}
              email={tec.email}
              rol={tec.rol}
              color="green"
              clickable
              onClick={() => abrirModalTecnico(tec)}
            />
          ))}
        </div>
      </section>

      {/* GRAFICA */}
      <section className="mt-8">
        <Card>
          <h3 className="text-lg font-semibold mb-4">
            Distribución de Tickets por Técnico
          </h3>

          <div className="w-full overflow-x-auto">
            <div className="w-[60vw] lg:w-full">
              <Bar
                data={chartData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: { ticks: { precision: 0 } },
                  },
                }}
                height={300} // esto ayuda a que no sea enorme
              />
            </div>
          </div>
        </Card>
      </section>

      {/* MODAL DE TICKETS POR TECNICO */}
      <Modal show={modalOpen} onClose={() => setModalOpen(false)} size="4xl">
        <ModalHeader>
          Tickets asignados a:{" "}
          {tecnicoSeleccionado &&
            `${tecnicoSeleccionado.nombre} ${tecnicoSeleccionado.apellido}`}
        </ModalHeader>

        <ModalBody>
          {ticketsTecnico.length === 0 ? (
            <p className="text-gray-600">
              Este técnico no tiene tickets asignados.
            </p>
          ) : (
            <div className="border border-gray-200 rounded-2xl shadow-xs max-h-[50vh] overflow-auto">
              <Table className="rounded-2xl" hoverable>
                <TableHead>
                  <TableHeadCell>ID</TableHeadCell>
                  <TableHeadCell>Título</TableHeadCell>
                  <TableHeadCell>Estado</TableHeadCell>
                  <TableHeadCell>Prioridad</TableHeadCell>
                  <TableHeadCell>Creado</TableHeadCell>
                </TableHead>

                <TableBody>
                  {ticketsTecnico.map((t) => (
                    <TableRow
                      className="cursor-pointer"
                      key={t.id}
                      onClick={() => navigate(`/tech/ticket?num=${t.id}`)}
                    >
                      <TableCell>{t.id}</TableCell>
                      <TableCell>{t.titulo}</TableCell>
                      <TableCell>{t.EstadoTicket?.nombre}</TableCell>
                      <TableCell>{t.PrioridadTicket?.nombre}</TableCell>
                      <TableCell>
                        {new Date(t.fecha_creacion).toLocaleDateString("es-VE")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}
