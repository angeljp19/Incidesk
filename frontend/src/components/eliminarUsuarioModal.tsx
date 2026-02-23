import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import UsuarioApi from "../api/usuarios";
import { useState } from "react";
import { ErrorModal } from "./errorModal";

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
}

export function EliminarUsuarioModal(componentProps: ComponentProps) {
  const { openModalProp, setOpenModal, user } = componentProps;
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleEliminar = async () => {
    try {
      await UsuarioApi.delete(user.id); // <-- Ya conectado
      window.location.reload();
    } catch (err) {
      setErrorMessage((err as Error).message);
      setError(true);
    }
  };

  return (
    <>
      <Modal
        show={openModalProp}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
   
          <ModalBody>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Estas seguro de que quieres eliminar al usuario {user.nombre}?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="red" onClick={handleEliminar}>
                  Si, estoy seguro
                </Button>
                <Button color="alternative" onClick={() => setOpenModal(false)}>
                  No, cancelar
                </Button>
              </div>
            </div>
          </ModalBody>
  
      </Modal>
      <ErrorModal
        mensaje={errorMessage}
        openModal={error}
        setOpenModal={setError}
      />
    </>
  );
}
