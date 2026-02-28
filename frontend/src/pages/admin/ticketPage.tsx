import {
  Label,
  TextInput,
  Textarea,
  Select,
  Button,
} from "flowbite-react";

import { useState, useEffect } from "react";
import UsuarioApi from "../../api/usuarios";
import EstadoTicketAPI from "../../api/estados";
import CategoriaTicketAPI from "../../api/categoria";
import PrioridadesTicketAPI from "../../api/prioridades";
import TicketsApi from "../../api/tickets";
import { formatFechaVE } from "../../pages/tecnico/solicitudPage";
import { useNavigate } from "react-router-dom";
import ComentariosAPI from "../../api/comentarios";
import { ImageViewerModal } from "../../components/imageViewerModal";

import { useSearchParams } from "react-router-dom";

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
  fecha_cierre: string | null;
  solucion_final: string | null;
}

export function TicketPage() {
  const [tecnicos, setTecnicos] = useState<any[]>([]);
  const [prioridades, setPrioridades] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [estados, setEstados] = useState<any[]>([]);

  const [searchParams] = useSearchParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const navigate = useNavigate();

  // Estados controlados
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tecnicoId, setTecnicoId] = useState<number | "">("");
  const [categoriaId, setCategoriaId] = useState<number | "">("");
  const [estadoId, setEstadoId] = useState<number | "">("");
  const [prioridadId, setPrioridadId] = useState<number | "">("");
  const [solucionFinal, setSolucionFinal] = useState("");

  const [comentariosPrivados, setComentariosPrivados] = useState<any[]>([]);
  const [comentariosPublicos, setComentariosPublicos] = useState<any[]>([]);
  const [imagenAbierta, setImagenAbierta] = useState(false);
  const [vistaComentarios, setVistaComentarios] = useState<
    "publico" | "privado"
  >("publico");

  /* =============================
     FETCH TICKET
  ============================== */
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const id = searchParams.get("num");
        if (!id) return navigate("/tech/bandejaTickets");

        const t = await TicketsApi.getById(Number(id));
        setTicket(t);

        const coms = await ComentariosAPI.getComentariosById(t.id);
        setComentariosPublicos(coms.filter((c: any) => !c.es_nota_interna));
        setComentariosPrivados(coms.filter((c: any) => c.es_nota_interna));
      } catch {
        navigate("/tech/bandejaTickets");
      }
    };

    fetchTicket();
  }, [searchParams, navigate]);

  /* =============================
     SINCRONIZAR FORM CON TICKET
  ============================== */
  useEffect(() => {
    if (!ticket) return;

    setTitulo(ticket.titulo);
    setDescripcion(ticket.descripcion);
    setTecnicoId(ticket.tecnicoAsignado?.id ?? "");
    setCategoriaId(ticket.CategoriaTicket?.id ?? "");
    setEstadoId(ticket.EstadoTicket?.id ?? "");
    setPrioridadId(ticket.PrioridadTicket?.id ?? "");
    setSolucionFinal(ticket.solucion_final ?? "");
  }, [ticket]);

  /* =============================
     FETCH CATÁLOGOS
  ============================== */
  useEffect(() => {
    const fetchAll = async () => {
      setTecnicos(await UsuarioApi.getAll({ rol_id: 1 }));
      setPrioridades(await PrioridadesTicketAPI.getAll());
      setCategorias(await CategoriaTicketAPI.getAll());
      setEstados(await EstadoTicketAPI.getAll());
    };
    fetchAll();
  }, []);

  /* =============================
     SUBMIT
  ============================== */
  const handleSubmit = async () => {
    if (!ticket) return;

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);

    if (tecnicoId) formData.append("tecnico_asignado_id", String(tecnicoId));
    if (categoriaId) formData.append("categoria_id", String(categoriaId));
    if (estadoId) formData.append("estado_id", String(estadoId));
    if (prioridadId) formData.append("prioridad_id", String(prioridadId));
    if (solucionFinal) formData.append("solucion_final", solucionFinal);

    const response = await TicketsApi.update(ticket.id, formData);

    if (!response?.error) {
      window.location.reload();
    }
  };

  /* =============================
     LOADING STATE
  ============================== */
  if (!ticket) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <p className="text-gray-500">Cargando ticket...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full h-full space-x-6 gap-5 lg:gap-0 p-4 lg:p-8">
      <div className="w-full lg:w-1/2 h-full overflow-auto rounded-2xl no-scrollbar">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 h-full overflow-y-auto">
          {/* HEADER */}
          <div className="border-b pb-4 flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-blue-700">
                Modificar Ticket
              </h3>
              <p className="text-sm text-gray-500">
                Actualiza la información y el estado del ticket
              </p>
            </div>

            <button
              className="bg-blue-700 text-white font-semibold h-fit rounded-full p-2 text-xs"
              onClick={() => setImagenAbierta(!imagenAbierta)}
            >
              Ver imagen
            </button>
          </div>

          {/* DATOS GENERALES */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-600 uppercase">
              Datos generales
            </h4>

            <div>
              <Label htmlFor="titulo">Título</Label>
              <TextInput
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                rows={4}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div>
              <Label>Solicitante</Label>
              <TextInput
                value={`${ticket.solicitante.nombre} ${ticket.solicitante.apellido}`}
                readOnly
              />
            </div>
          </div>

          {/* ASIGNACIÓN */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-600 uppercase">
              Asignación
            </h4>

            <div>
              <Label>Técnico asignado</Label>
              <Select
                value={tecnicoId}
                onChange={(e) => {
                  setTecnicoId(Number(e.target.value));
                  setEstadoId(1);
                }}
              >
                <option value="">Asigna un técnico</option>
                {tecnicos.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nombre} {t.apellido}
                  </option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Categoría</Label>
                <Select
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(Number(e.target.value))}
                >
                  <option value="">Seleccione categoría</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label>Prioridad</Label>
                <Select
                  value={prioridadId}
                  onChange={(e) => setPrioridadId(Number(e.target.value))}
                >
                  <option value="">Seleccione prioridad</option>
                  {prioridades.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {/* ESTADO */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-600 uppercase">
              Estado del ticket
            </h4>

            <Select
              value={estadoId}
              onChange={(e) => setEstadoId(Number(e.target.value))}
            >
              {estados.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </Select>
          </div>

          {/* FECHAS */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Creación</Label>
              <TextInput
                readOnly
                value={new Date(ticket.fecha_creacion).toLocaleDateString(
                  "es-VE"
                )}
              />
            </div>

            <div>
              <Label>Última actualización</Label>
              <TextInput
                readOnly
                value={
                  ticket.fecha_ultima_actualizacion
                    ? new Date(
                        ticket.fecha_ultima_actualizacion
                      ).toLocaleDateString("es-VE")
                    : ""
                }
              />
            </div>

            <div>
              <Label>Cierre</Label>
              <TextInput
                readOnly
                value={
                  ticket.fecha_cierre
                    ? new Date(ticket.fecha_cierre).toLocaleDateString("es-VE")
                    : ""
                }
              />
            </div>
          </div>

          {/* SOLUCIÓN FINAL */}
          <div>
            <Label>Solución final</Label>
            <Textarea
            readOnly  
              rows={4}
              value={solucionFinal}
              onChange={(e) => setSolucionFinal(e.target.value)}
              className="resize-none"
            />
          </div>

          {/* ACCIÓN */}
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-700 hover:bg-blue-800"
          >
            Guardar cambios
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col w-full lg:w-1/2 h-full overflow-auto">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Seguimiento del Ticket
        </h2>

        {/* TABS */}
        <div className="flex bg-[#F5F7FB] rounded-xl p-1 mb-4">
          <button
            onClick={() => setVistaComentarios("publico")}
            className={`flex-1 py-2 text-sm rounded-lg transition
              ${
                vistaComentarios === "publico"
                  ? "bg-white shadow text-blue-600 font-semibold"
                  : "text-gray-500"
              }`}
          >
            Comentarios públicos
          </button>

          <button
            onClick={() => setVistaComentarios("privado")}
            className={`flex-1 py-2 text-sm rounded-lg transition
              ${
                vistaComentarios === "privado"
                  ? "bg-white shadow text-blue-600 font-semibold"
                  : "text-gray-500"
              }`}
          >
            Notas internas
          </button>
        </div>

        {/* CONTENEDOR DE MENSAJES */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-[#F5F7FB] rounded-xl p-4 space-y-3">
          {vistaComentarios === "publico"
            ? comentariosPublicos.map((comentario) => (
                <div className="bg-white rounded-xl shadow p-4">
                  <p className="text-sm text-gray-700">
                    {comentario.contenido}
                  </p>
                  <div className="text-xs text-gray-400 mt-2">
                    {comentario.Usuario.nombre} {comentario.Usuario.apellido} ·{" "}
                    {formatFechaVE(comentario.fecha)}
                  </div>
                </div>
              ))
            : comentariosPrivados.map((comentario) => (
                <div className="bg-white rounded-xl shadow p-4">
                  <p className="text-sm text-gray-700">
                    {comentario.contenido}
                  </p>
                  <div className="text-xs text-gray-400 mt-2">
                    {comentario.Usuario.nombre} {comentario.Usuario.apellido} ·{" "}
                    {formatFechaVE(comentario.fecha)}
                  </div>
                </div>
              ))}
        </div>
      </div>

      {imagenAbierta && (
        <ImageViewerModal
          ticket_id={ticket.id}
          onClose={() => setImagenAbierta(false)}
        />
      )}
    </div>
  );
}
