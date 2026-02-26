import {
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  Select,
  Button,
} from "flowbite-react";

import { useRef} from "react";


interface ComponentProps {
  openModalProp: boolean;
  setOpenModal: (open: boolean) => void;
  user: {
    nombre: string;
    apellido: string;
    email: string;
    departamento: string;
    rol: string;
    id: number;
  };
  departamentos: {
    id: number;
    nombre: string;
  }[];
  roles: {
    id: number;
    nombre: string;
  }[];
}

export function EditarUsuarioModal(componentProps: ComponentProps) {
  const { openModalProp, setOpenModal, user, departamentos, roles } =
    componentProps;
  const nombreInputRef = useRef<HTMLInputElement>(null);




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
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 ">
              Modificar usuario
            </h3>
            <div className="flex space-x-1">
              <div>
                <div className=" block">
                  <Label htmlFor="Nombre">Nombre</Label>
                </div>
                <TextInput
                  value={user.nombre}
                  id="Nombre"
                  ref={nombreInputRef}
                  required
                />
              </div>
              <div>
                <div className="block">
                  <Label htmlFor="Apellido">Apellido</Label>
                </div>
                <TextInput value={user.apellido} id="Apellido" required />
              </div>
            </div>
            <div>
              <div className=" block">
                <Label htmlFor="Email">Email</Label>
              </div>
              <TextInput value={user.email} type="email" id="Email" required />
            </div>
            <div className="flex w-full justify-between space-x-1">
              <div className="flex flex-col w-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="rol">Rol del usuario</Label>
                </div>
                <Select value={user.rol} id="rol" required>
                  {roles.map((rol, index) => (
                    <option key={index} value={rol.id}>
                      {rol.nombre}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col w-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="Departamento">Departamento</Label>
                </div>
                <Select value={user.departamento} id="Departamento" required>
                  {departamentos.map((departamento, index) => (
                    <option key={index} value={departamento.id}>
                      {departamento.nombre}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Modificar usuario
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
