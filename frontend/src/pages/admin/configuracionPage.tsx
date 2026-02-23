import DepartamentosApi from "../../api/departamentos";
import CategoriaTicketAPI from "../../api/categoria";
import { PageHeader } from "../../components/pageHeader";

export function ConfiguracionPage() {
  return (
    <div className="w-full h-full overflow-auto flex justify-center px-4 py-10">
      <div className="w-full max-w-6xl space-y-10">
        {/* HEADER */}
        <PageHeader
          title="Configuración"
          subtitle="Administra categorías y departamentos del sistema"
        />

        {/* SECCIONES */}
        <ConfigSection
          title="Departamentos"
          fetchAll={DepartamentosApi.getAll}
          createItem={DepartamentosApi.create}
          updateItem={DepartamentosApi.update}
        />

        <ConfigSection
          title="Categorías"
          fetchAll={CategoriaTicketAPI.getAll}
          createItem={CategoriaTicketAPI.create}
          updateItem={CategoriaTicketAPI.update}
        />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Button, TextInput, Spinner } from "flowbite-react";

interface ConfigSectionProps {
  title: string;
  fetchAll: () => Promise<any>;
  createItem: (nombre: string) => Promise<void>;
  updateItem: (id: number, nombre?: string, activo?: boolean) => Promise<void>;
}

export function ConfigSection({
  title,
  fetchAll,
  createItem,
  updateItem,
}: ConfigSectionProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAll();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await createItem(newName);
    setNewName("");
    loadData();
  };

  const toggleActivo = async (item: any) => {
    await updateItem(item.id, item.nombre, !item.activo);
    loadData();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl">
      {/* HEADER */}
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>

      {/* CREATE */}
      <div className="px-6 py-4 flex gap-3">
        <TextInput
          placeholder={`Nueva ${title.toLowerCase()}`}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button onClick={handleCreate}>Agregar</Button>
      </div>

      {/* LIST */}
      <div className="px-6 pb-6 space-y-3">
        {loading && (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        )}

        {!loading &&
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-lg px-4 py-2"
            >
              <span
                className={`${
                  !item.activo ? "line-through text-gray-400" : ""
                }`}
              >
                {item.nombre}
              </span>

              <Button
                size="xs"
                color={item.activo ? "failure" : "success"}
                onClick={() => toggleActivo(item)}
              >
                {item.activo ? "Desactivar" : "Activar"}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
