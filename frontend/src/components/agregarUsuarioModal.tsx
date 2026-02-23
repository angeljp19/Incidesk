import {
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  Select,
  Button,
} from "flowbite-react";

import { useRef, useState } from "react";
import UsuarioApi from "../api/usuarios";

interface ComponentProps {
  openModalProp: boolean;
  setOpenModal: (open: boolean) => void;
  departamentos: {
    id: number;
    nombre: string;
  }[];
  roles: {
    id: number;
    nombre: string;
  }[];
}

export function AgregarUsuarioModal(componentProps: ComponentProps) {
  const { openModalProp, setOpenModal, departamentos, roles } = componentProps;
  const nombreInputRef = useRef<HTMLInputElement>(null);

  const [nombre, setnombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [departamento_id, setDepartamento_id] = useState<number | null>(null);
  const [rol_id, setRol_id] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
    try {
      const res = await UsuarioApi.post(
        nombre,
        apellido,
        email,
        password,
        departamento_id as number,
        rol_id as number,
      );

      setOpenModal(!openModalProp);

      console.log(res);
    } catch (err) {
      console.error("Error de autenticación:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <Modal
        position="center"
        dismissible
        show={openModalProp}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={nombreInputRef}
      >
        <ModalHeader />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 ">
                Agregar nuevo usuario
              </h3>
              <div className="flex space-x-1">
                <div>
                  <div className=" block">
                    <Label htmlFor="Nombre">Nombre</Label>
                  </div>
                  <TextInput
                    onChange={(e) => setnombre(e.target.value)}
                    id="Nombre"
                    ref={nombreInputRef}
                    required
                  />
                </div>
                <div>
                  <div className="block">
                    <Label htmlFor="Apellido">Apellido</Label>
                  </div>
                  <TextInput
                    onChange={(e) => setApellido(e.target.value)}
                    id="Apellido"
                    required
                  />
                </div>
              </div>
              <div>
                <div className=" block">
                  <Label htmlFor="Email">Email</Label>
                </div>
                <TextInput
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="Email"
                  required
                />
              </div>
              <div>
                <div className=" block">
                  <Label htmlFor="Contraseña">Contraseña</Label>
                </div>
                <TextInput
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="Contraseña"
                  required
                />
              </div>
              <div className="flex w-full justify-between space-x-1">
                <div className="flex flex-col w-1/2">
                  <div className="mb-2 block">
                    <Label htmlFor="rol">Rol del usuario</Label>
                  </div>
                  <Select
                    value={rol_id === null ? "" : rol_id}
                    onChange={(e) => {
                      const stringValue = e.target.value;

                      if (stringValue === "") {
                        setRol_id(null);
                      } else {
                        setRol_id(Number(stringValue));
                      }
                    }}
                    id="rol"
                    required
                  >
                    <option value="" disabled>
                      Selecciona un Rol
                    </option>

                    {roles.map((rol) => (
                      <option key={rol.id} value={rol.id}>
                        {rol.nombre}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col w-1/2">
                  <div className="mb-2 block">
                    <Label htmlFor="Departamento">Departamento</Label>
                  </div>
                  <Select
                    // 1. 💡 AGREGAR: Lo convierte en un componente controlado por React.
                    // Si rol_id es null, el valor del Select será "" para coincidir con la opción placeholder.
                    value={departamento_id === null ? "" : departamento_id}
                    onChange={(e) => {
                      const stringValue = e.target.value;

                      // 2. 💡 MANEJAR LA CONVERSIÓN: Si el valor es "", lo asigna como null al estado.
                      if (stringValue === "") {
                        setDepartamento_id(null);
                      } else {
                        // De lo contrario, lo convierte a número y lo asigna.
                        setDepartamento_id(Number(stringValue));
                      }
                    }}
                    id="rol"
                    required
                  >
                    {/* 3. 💡 HACER QUE LA OPCIÓN INICIAL NO SEA SELECCIONABLE/ENVIABLE */}
                    <option value="" disabled>
                      Selecciona un departamento
                    </option>

                    {departamentos.map((departamento) => (
                      <option key={departamento.id} value={departamento.id}>
                        {departamento.nombre}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading} // Deshabilita el botón durante la carga
                className={`w-full py-2 rounded-md transition duration-150 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Agregando..." : "Agregar usuario"}
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
