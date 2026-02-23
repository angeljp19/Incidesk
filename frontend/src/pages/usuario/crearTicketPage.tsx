import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import {
  Label,
  TextInput,
  Textarea,
  Select,
  FileInput,
  Button,
  Spinner,
} from "flowbite-react";

import CategoriaTicketAPI from "../../api/categoria";
import PrioridadesTicketAPI from "../../api/prioridades";
import TicketAPI from "../../api/tickets";
import { PageHeader } from "../../components/pageHeader";

interface Prioridad {
  id: number;
  nombre: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

export function CrearTicketPage() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridadId, setPrioridadId] = useState<number | "">("");
  const [categoriaId, setCategoriaId] = useState<number | "">("");
  const [adjunto, setAdjunto] = useState<File | null>(null);

  const [prioridades, setPrioridades] = useState<Prioridad[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    PrioridadesTicketAPI.getAll().then(setPrioridades);
    CategoriaTicketAPI.getAll().then(setCategorias);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const user = sessionStorage.getItem("user");
    const userObj = JSON.parse(user as string);

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("solicitante_id", userObj.id);
      formData.append("descripcion", descripcion);
      formData.append("prioridad_id", String(prioridadId));
      formData.append("categoria_id", String(categoriaId));
      if (adjunto) formData.append("archivo", adjunto);

      await TicketAPI.create(formData);

      setTitulo("");
      setDescripcion("");
      setAdjunto(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex  justify-center px-4 py-10">
      <div className="w-full flex flex-col max-w-5xl gap-2">
        {/* HEADER */}

        <PageHeader
          title="Crear nuevo ticket"
          subtitle=" Describe tu solicitud para que el equipo técnico pueda ayudarte"
        />

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-2xl shadow-xl"
        >
          {/* Título */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="titulo">Título</Label>
            <TextInput
              id="titulo"
              placeholder="Ej: Error al iniciar sesión"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          {/* Prioridad */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="prioridad">Prioridad</Label>
            <Select
              id="prioridad"
              value={prioridadId}
              onChange={(e) => setPrioridadId(Number(e.target.value))}
              required
            >
              <option value="">Seleccione una prioridad</option>
              {prioridades.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </Select>
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-1 lg:col-span-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              placeholder="Describe el problema o solicitud con el mayor detalle posible"
              rows={5}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          {/* Categoría */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="categoria">Categoría</Label>
            <Select
              id="categoria"
              value={categoriaId}
              onChange={(e) => setCategoriaId(Number(e.target.value))}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </Select>
          </div>

          {/* Archivo */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="archivo">Archivo adjunto</Label>
            <FileInput
              id="archivo"
              onChange={(e) => setAdjunto(e.target.files?.[0] ?? null)}
            />
            <span className="text-xs text-gray-400">
              Opcional. Imágenes o documentos de soporte.
            </span>
          </div>

          {/* BOTÓN */}
          <div className="lg:col-span-2 flex justify-end pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="px-8 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" />
                  Creando ticket...
                </div>
              ) : (
                "Crear ticket"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
