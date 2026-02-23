import { useState, useEffect } from "react";
import { PageHeader } from "../../components/pageHeader";
import CategoriaTicketAPI from "../../api/categoria";
import DepartamentosApi from "../../api/departamentos";
import UsuarioApi from "../../api/usuarios";
import PrioridadesTicketAPI from "../../api/prioridades";
import EstadoTicketAPI from "../../api/estados";
import IncideskSkeleton from "../../components/incideskEskeleton";
import { ReportesAPI } from "../../api/reportes";
import type { ReportesFiltros } from "../../api/reportes";

export function ReportesPage() {
  const [categorias, setCategorias] = useState<any[]>();
  const [departamentos, setDepartamentos] = useState<any[]>();
  const [usuarios, setUsuarios] = useState<any[]>();
  const [tecnicos, setTecnicos] = useState<any[]>();
  const [prioridades, setPrioridades] = useState<any[]>();
  const [estados, setEstados] = useState<any[]>();

  const [loading, setLoading] = useState(true);

  const calificaciones=[
    { id: "Muy buena", nombre: "Muy buena" },
    { id: "Buena", nombre: "Buena" },
    { id: "Regular", nombre: "Regular" },
    { id: "Mala", nombre: "Mala" },
  ];

  /* ==========================
     Carga inicial de datos
     ========================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategorias(await CategoriaTicketAPI.getAll());
        setDepartamentos(await DepartamentosApi.getAll());
        setPrioridades(await PrioridadesTicketAPI.getAll());
        setEstados(await EstadoTicketAPI.getAll());

        const users = await UsuarioApi.getAll();
        setUsuarios(users.filter((u: any) => u.rol_id === 2));
        setTecnicos(users.filter((u: any) => u.rol_id === 1));
      } catch (error) {
        console.error("Error cargando datos de reportes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ==========================
     Estado de filtros (UI)
     ========================== */
  const [filtros, setFiltros] = useState({
    departamento: "",
    usuario: "",
    tecnico: "",
    categoria: "",
    prioridad: "",
    estado: "",
    fechaDesde: "",
    fechaHasta: "",
    calificacion: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limpiarFiltros = () => {
    setFiltros({
      departamento: "",
      usuario: "",
      tecnico: "",
      categoria: "",
      prioridad: "",
      estado: "",
      fechaDesde: "",
      fechaHasta: "",
      calificacion: "",
    });
  };

  /* ==========================
     Construcción filtros API
     ========================== */
  const buildReportesFiltros = (): ReportesFiltros => {
    const filtrosAPI: ReportesFiltros = {};

    if (filtros.departamento)
      filtrosAPI.departamento_id = Number(filtros.departamento);

    if (filtros.usuario) filtrosAPI.solicitante_id = Number(filtros.usuario);

    if (filtros.tecnico)
      filtrosAPI.tecnico_asignado_id = Number(filtros.tecnico);

    if (filtros.categoria) filtrosAPI.categoria_id = Number(filtros.categoria);

    if (filtros.prioridad) filtrosAPI.prioridad_id = Number(filtros.prioridad);

    if (filtros.estado) filtrosAPI.estado_id = Number(filtros.estado);

    if (filtros.calificacion) filtrosAPI.calificacion = filtros.calificacion;

    if (filtros.fechaDesde || filtros.fechaHasta) {
      filtrosAPI.fecha_creacion = {};

      if (filtros.fechaDesde)
        filtrosAPI.fecha_creacion.desde = filtros.fechaDesde;

      if (filtros.fechaHasta)
        filtrosAPI.fecha_creacion.hasta = filtros.fechaHasta;
    }

    return filtrosAPI;
  };

  /* ==========================
     Generar reporte PDF
     ========================== */
  const generarReporte = async () => {
    try {
      const filtrosAPI = buildReportesFiltros();

      const pdfBlob = await ReportesAPI.generarReporte(filtrosAPI);

      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reporte_tickets.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar el reporte", error);
    }
  };

  if (loading) return <IncideskSkeleton />;

  return (
    <div className="w-full h-full overflow-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <PageHeader
          title="Reportes"
          subtitle="Genera reportes en PDF para análisis y control de tickets en Incidesk."
        />

        {/* ==========================
            REPORTE DETALLADO
           ========================== */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-1">
            Reporte de tickets
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Aplica filtros avanzados para generar un reporte detallado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Departamento"
              name="departamento"
              value={filtros.departamento}
              onChange={handleChange}
              lista={departamentos}
            />

            <Select
              label="Usuario"
              name="usuario"
              value={filtros.usuario}
              onChange={handleChange}
              lista={usuarios}
            />

            <Select
              label="Técnico"
              name="tecnico"
              value={filtros.tecnico}
              onChange={handleChange}
              lista={tecnicos}
            />

            <Select
              label="Categoría"
              name="categoria"
              value={filtros.categoria}
              onChange={handleChange}
              lista={categorias}
            />

            <Select
              label="Prioridad"
              name="prioridad"
              value={filtros.prioridad}
              onChange={handleChange}
              lista={prioridades}
            />

            <Select
              label="Estado"
              name="estado"
              value={filtros.estado}
              onChange={handleChange}
              lista={estados}
            />

            <Select
              label="Calificación"
              name="calificacion"
              value={filtros.calificacion}
              onChange={handleChange}
              lista={calificaciones}
            />

            <Input
              label="Fecha desde"
              type="date"
              name="fechaDesde"
              value={filtros.fechaDesde}
              onChange={handleChange}
            />

            <Input
              label="Fecha hasta"
              type="date"
              name="fechaHasta"
              value={filtros.fechaHasta}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={limpiarFiltros}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Limpiar filtros
            </button>

            <button
              onClick={generarReporte}
              className="px-6 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Generar reporte PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================
   Componentes reutilizables
   ========================== */

function Select({ label, name, value, onChange, lista }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Todos</option>
        {lista &&
          lista.map((l: any) => (
            <option key={l.id} value={l.id}>
              {l.nombre}
              {l.apellido ? ` ${l.apellido}` : ""}
            </option>
          ))}
      </select>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
