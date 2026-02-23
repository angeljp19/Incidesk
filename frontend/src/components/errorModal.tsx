
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface ErrorModalProps {
    openModal: boolean,
    setOpenModal: (open: boolean) => void;
    mensaje: string
}

export function ErrorModal(props: ErrorModalProps) {
    const {openModal, setOpenModal, mensaje} = props
  return (
    <>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {mensaje}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={() => setOpenModal(false)}>
                Ok
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
