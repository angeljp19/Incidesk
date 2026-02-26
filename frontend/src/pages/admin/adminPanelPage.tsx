import { useEffect, useState } from "react";
import { MensajeBienvenida } from "../../components/mensajeBienvenida";
import { ColorCard } from "../../components/colorCard";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

import TicketAPI from "../../api/tickets";
import CategoriaTicketAPI from "../../api/categoria";
import PrioridadesTicketAPI from "../../api/prioridades";


import { CajaNotificaciones } from "../../components/cajaNotificaciones";

import IncideskSkeleton from "../../components/incideskEskeleton";

export function AdminPanelPage() {
  const user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user as string);

  const [tickets, setTickets] = useState<any[]>([]);
  const [categoriasAPI, setCategoriasAPI] = useState<any[]>([]);
  const [prioridadesAPI, setPrioridadesAPI] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const tickets = await TicketAPI.getAll();
        setTickets(tickets);

        setCategoriasAPI(await CategoriaTicketAPI.getAll());
        setPrioridadesAPI(await PrioridadesTicketAPI.getAll());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <IncideskSkeleton />;

  // ------------------ MÉTRICAS ------------------
  const activos = tickets.filter((t) => t.estado_id === 1).length;

  const finalizados = tickets.filter((t) => t.estado_id === 4).length;

  const pendientes = tickets.filter(
    (t) => t.estado_id === 3 && !t.tecnico_id,
  ).length;

  const totalHistorico = tickets.length;

  const ahora = new Date();
  const unaSemanaEnMs = 7 * 24 * 60 * 60 * 1000;

  const vencidos = tickets.filter((t) => {
    if (!t.fecha_creacion) return false;
    const fechaCreacion = new Date(t.fecha_creacion);
    return (
      ahora.getTime() - fechaCreacion.getTime() > unaSemanaEnMs &&
      t.estado_id !== 4
    );
  }).length;

  // ------------------ CATEGORÍAS ------------------
  const categorias = categoriasAPI.map((c) => c.nombre);
  const categoriasCount = categorias.map(
    (c) => tickets.filter((t) => t.CategoriaTicket?.nombre === c).length,
  );

  // ------------------ PRIORIDADES ------------------
  const prioridades = prioridadesAPI.map((p) => p.nombre);
  const prioridadesCount = prioridades.map(
    (p) => tickets.filter((t) => t.PrioridadTicket?.nombre === p).length,
  );

  // ------------------ SEMANAL ------------------
  function agruparPorSemana(lista: any[]) {
    const dias = [0, 0, 0, 0, 0, 0, 0];
    lista.forEach((t) => {
      let d = new Date(t.fecha_creacion).getDay();
      d = d === 0 ? 6 : d - 1;
      dias[d]++;
    });
    return dias;
  }

  const abiertos = agruparPorSemana(
    tickets.filter((t) => [1, 3].includes(t.estado_id)),
  );
  const cerrados = agruparPorSemana(tickets.filter((t) => t.estado_id === 4));

  const labelsDias = ["L", "M", "X", "J", "V", "S", "D"];

  return (
    <div className="flex flex-col w-full h-full p-4  gap-4">
      <MensajeBienvenida nombre={userObj.nombre} />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-col lg:flex-row gap-4  min-h-0 ">
        <div
          className="grid grid-cols-2 lg:flex lg:flex-col gap-3 bg-blue-600 p-4 rounded-3xl shadow-xl
             lg:w-[260px] w-full"
        >
          <ColorCard
            link="/tech/bandejaTicket?estado=activo"
            titulo="Tickets activos"
            valor={activos.toString()}
            color="#009c12"
          />

          <ColorCard
            link="/tech/bandejaTicket?estado=pendiente"
            titulo="Tickets pendientes"
            valor={pendientes.toString()}
            color="#FF7700"
          />

          <ColorCard
            link="/tech/bandejaTicket?estado=finalizados"
            titulo="Tickets finalizados"
            valor={finalizados.toString()}
            color="#8803fc"
          />

          <ColorCard
            link="/tech/bandejaTicket?estado=todos"
            titulo="Total histórico"
            valor={totalHistorico.toString()}
            color="#111111"
          />
          <div className="block h-full w-full lg:flex flex-col  lg:justify-end">
            <ColorCard
              link="/tech/bandejaTicket?estado=vencido"
              titulo="Tickets vencidos (más de 7 días)"
              valor={vencidos.toString()}
              color="#D90000"
            />
          </div>
        </div>
        <div
          className="flex lg:hidden flex-col gap-3 rounded-3xl shadow-xl
                        lg:w-[350px] w-full max-h-[50svh] lg:h-full"
        >
          <CajaNotificaciones />
        </div>

        {/* CONTENIDO */}
        <div className="flex-1 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* CATEGORÍAS */}
            <CardUI title="Tickets por categoría">
              <PieChart
                width={260}
                height={140}
                series={[
                  {
                    data: categorias.map((c, i) => ({
                      id: i,
                      value: categoriasCount[i],
                      label: c,
                    })),
                    innerRadius: 65,
                    outerRadius: 100,
                    startAngle: -90,
                    endAngle: 90,
                    cx: 130,
                    cy: 115,
                  },
                ]}
             
              />
              <Legend labels={categorias} />
            </CardUI>

            {/* PRIORIDADES */}
            <CardUI title="Tickets por prioridad">
              <PieChart
                width={260}
                height={140}
                series={[
                  {
                    data: prioridades.map((p, i) => ({
                      id: i,
                      value: prioridadesCount[i],
                      label: p,
                    })),
                    innerRadius: 65,
                    outerRadius: 100,
                    startAngle: -90,
                    endAngle: 90,
                    cx: 130,
                    cy: 115,
                  },
                ]}
               
              />
              <Legend labels={prioridades} />
            </CardUI>

            {/* BARRAS */}
            <div className="flex lg:col-span-2 items-center justify-center min-h-0">
              <div className="bg-gray-50 rounded-4xl shadow-2xl p-4 w-full max-w-2xl col-span-2">
                {" "}
                <h3 className="text-lg font-semibold mb-4">
                  {" "}
                  Creación vs Cierre (semanal){" "}
                </h3>{" "}
                <BarChart
                  height={160}
                  xAxis={[{ scaleType: "band", data: labelsDias }]}
                  series={[
                    {
                      label: "Abiertos",
                      data: abiertos,
                      color: "#4f46e5",
                    },
                    {
                      label: "Cerrados",
                      data: cerrados,
                      color: "#22c55e",
                    },
                  ]}
                  grid={{ horizontal: true }}
                  borderRadius={6}
                />{" "}
              </div>
            </div>
          </div>
        </div>

        <div
          className="hidden lg:flex flex-col gap-3 rounded-3xl shadow-xl
                        lg:w-[350px] w-full max-h-[50svh] lg:max-h-screen lg:h-full"
        >
          <CajaNotificaciones />
        </div>
      </div>
    </div>
  );
}

function CardUI({ title, children }: any) {
  return (
    <div className="bg-gray-50 rounded-3xl shadow-xl p-4 flex flex-col items-center">
      <h3 className="font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Legend({ labels }: { labels: string[] }) {
  const colors = ["#3b82f6", "#f59e0b", "#ef4444", "#22c55e"];
  return (
    <div className="flex gap-4 mt-2 flex-wrap justify-center text-sm">
      {labels.map((l, i) => (
        <div key={l} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors[i % colors.length] }}
          />
          {l}
        </div>
      ))}
    </div>
  );
}
