import { Modal, ModalBody, ModalHeader, Button } from "flowbite-react";
import { HiExclamationCircle } from "react-icons/hi";

interface InvalidCredentialsModalProps {
  open: boolean;
  onClose: () => void;
  titulo?: string
  texto?: string
}

export function InvalidCredentialsModal({
  open,
  onClose,
  titulo,
  texto
}: InvalidCredentialsModalProps) {
  return (
    <Modal show={open} size="md" popup onClose={onClose}>
      <ModalHeader />

      <ModalBody>
        <div className="text-center">
          <HiExclamationCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />

          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            {titulo || "Credenciales inválidas"}
          </h3>

          <p className="mb-5 text-sm text-gray-600">
            {texto || "El correo electrónico o la contraseña no son correctos"}
            
            <br />
            Por favor, inténtalo nuevamente.
          </p>

          <div className="flex justify-center">
            <Button color="failure" onClick={onClose}>
              Entendido
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
