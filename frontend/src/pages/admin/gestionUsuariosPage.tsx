import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { CenteredModal } from "../../components/CenteredModal";

import { HiPlus, HiPencilAlt, HiTrash } from "react-icons/hi";
import UsuarioApi from "../../api/usuarios";
import DepartamentosAPI from "../../api/departamentos";
import RolesAPI from "../../api/roles";
import { ErrorModal } from "../../components/errorModal";
import { UsuarioForm } from "../../components/usuarioForm";
import { PageHeader } from "../../components/pageHeader";
import IncideskSkeleton from "../../components/incideskEskeleton";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password?: string;
  activo: boolean;
  rol_id: number;
  departamento_id: number;
  rol: string;
  departamento: string;
}

const emptyUsuario: Usuario = {
  id: 0,
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  activo: true,
  rol_id: 0,
  departamento_id: 0,
  rol: "",
  departamento: "",
};

type DrawerMode = "add" | "edit" | null;

export function GestionUsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selected, setSelected] = useState<Usuario | null>(null);

  const [drawerMode, setDrawerMode] = useState<DrawerMode>(null);
  const [form, setForm] = useState<Usuario>(emptyUsuario);

  const [roles, setRoles] = useState<any[]>([]);
  const [departamentos, setDepartamentos] = useState<any[]>([]);

  const [openEliminar, setOpenEliminar] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(true);

  const drawerOpen = drawerMode !== null;

  useEffect(() => {
    const loadData = async () => {
      try {
        setUsuarios(await UsuarioApi.getAll());
        setRoles(await RolesAPI.getAll());
        setDepartamentos(await DepartamentosAPI.getAll());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const openAdd = () => {
    setForm(emptyUsuario);
    setDrawerMode("add");
  };

  const openEdit = () => {
    if (!selected) return;
    setForm(selected);
    setDrawerMode("edit");
  };

  const closeDrawer = () => {
    setDrawerMode(null);
    setForm(emptyUsuario);
  };

  const handleSubmit = async () => {
    try {
      if (drawerMode === "add") {
        await UsuarioApi.post(
          form.nombre,
          form.apellido,
          form.email,
          form.password,
          form.departamento_id,
          form.rol_id,
        );
      } else if (drawerMode === "edit") {
        await UsuarioApi.put(
          form.id,
          form.nombre,
          form.apellido,
          form.email,
          undefined,
          form.rol_id,
          form.departamento_id,
        );
      }
      window.location.reload();
    } catch (err) {
      setError(true);
      setErrorMessage((err as Error).message);
    }
  };

  const handleEliminar = async () => {
    try {
      if (!selected) return;

      await UsuarioApi.delete(selected.id);
      window.location.reload();
    } catch (err) {
      setErrorMessage((err as Error).message);
      setError(true);
    }
  };
  if (loading) return <IncideskSkeleton />;
  return (
    <div className="w-full flex flex-col gap-4 p-4 lg:p-8">
      <PageHeader
        title="Gestión de Usuarios"
        subtitle="Creación, modificación y eliminación de los usuarios autorizados en el sistema"
      />

      <div className="flex flex-col md:flex-row w-full gap-4">
        {/* TABLA */}
        <div
          className={`transition-all duration-300 ${
            drawerOpen ? "md:w-2/3" : "w-full"
          }`}
        >
          <div className="w-full overflow-x-auto border border-gray-200 rounded-2xl shadow-xs">
            <Table hoverable className="">
              <TableHead>
                <TableHeadCell>Nombre</TableHeadCell>
                <TableHeadCell>Apellido</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Departamento</TableHeadCell>
                <TableHeadCell>Rol</TableHeadCell>
              </TableHead>

              <TableBody className="divide-y bg-white">
                {usuarios.map((u) => (
                  <TableRow
                    key={u.id}
                    onClick={() => setSelected(u)}
                    className={`cursor-pointer ${
                      selected?.id === u.id
                        ? "bg-blue-700 text-white hover:bg-blue-700 "
                        : ""
                    }`}
                  >
                    <TableCell>{u.nombre}</TableCell>
                    <TableCell>{u.apellido}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.departamento}</TableCell>
                    <TableCell>{u.rol}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-center mt-4">
            <ButtonGroup className="bg-white">
              <Button onClick={openAdd}>
                <HiPlus className="me-2" />
                Agregar
              </Button>
              <Button disabled={!selected} onClick={openEdit}>
                <HiPencilAlt className="me-2" />
                Editar
              </Button>
              <Button
                disabled={!selected}
                color="failure"
                onClick={() => setOpenEliminar(true)}
              >
                <HiTrash className="me-2" />
                Eliminar
              </Button>
            </ButtonGroup>
          </div>
        </div>

        {/* DRAWER DESKTOP */}
        {drawerOpen && (
          <>
            {/* OVERLAY */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={closeDrawer}
            />

            {/* DRAWER */}
            <div className="fixed top-0 right-0 z-50 h-full w-full max-w-lg flex flex-col shadow-2xl bg-linear-to-b from-blue-800 to-blue-900 animate-slide-in">
              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-white">
                    {drawerMode === "add"
                      ? "Agregar usuario"
                      : "Editar usuario"}
                  </h3>
                  <span className="text-sm text-blue-200">
                    Gestión de usuarios del sistema
                  </span>
                </div>

                <button
                  onClick={closeDrawer}
                  className="text-white/70 hover:text-white transition p-2 rounded-full hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              {/* BODY */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <UsuarioForm
                  form={form}
                  setForm={setForm}
                  roles={roles}
                  departamentos={departamentos}
                  drawerMode={drawerMode}
                />
              </div>

              {/* FOOTER */}
              <div className="px-6 py-4 border-t border-white/10 bg-blue-950/40 flex justify-end gap-3">
                <Button
                  color="gray"
                  onClick={closeDrawer}
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  Cancelar
                </Button>

                <Button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
                >
                  Guardar cambios
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* MODAL MOBILE */}
      <CenteredModal
        show={drawerOpen}
        onClose={closeDrawer}
        className="md:hidden"
      >
        <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden">
          <div className="p-4 flex justify-between bg-blue-700 text-white">
            <h3 className="text-lg font-semibold mr-5">
              {drawerMode === "add" ? "Agregar Usuario" : "Editar Usuario"}
            </h3>
            <button onClick={closeDrawer}>✕</button>
          </div>

          <div className="bg-blue-700 border-0">
            <UsuarioForm
              form={form}
              setForm={setForm}
              roles={roles}
              departamentos={departamentos}
              drawerMode={drawerMode}
            />
          </div>

          <div className="bg-blue-700 border-0 flex justify-end gap-3 p-4">
            <Button color="gray" onClick={closeDrawer}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Guardar</Button>
          </div>
        </div>
      </CenteredModal>

      {/* MODAL ELIMINAR */}
      <CenteredModal show={openEliminar} onClose={() => setOpenEliminar(false)}>
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
          <h3 className="text-lg font-semibold mb-4">Eliminar Usuario</h3>
          <p className="mb-6">
            ¿Deseas eliminar a{" "}
            <strong>
              {selected?.nombre} {selected?.apellido}
            </strong>
            ?
          </p>
          <div className="flex justify-end gap-3">
            <Button color="failure" onClick={() => handleEliminar()}>
              Eliminar
            </Button>
            <Button color="gray" onClick={() => setOpenEliminar(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </CenteredModal>

      <ErrorModal
        mensaje={errorMessage}
        openModal={error}
        setOpenModal={setError}
      />
    </div>
  );
}
