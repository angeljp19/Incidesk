import {
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  Textarea,
} from "flowbite-react";

interface ComponentProps {
  openModalProp: boolean;
  setOpenModal: (open: boolean) => void;
  ticket: {
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
    fecha_cierre: string;
    solucionFinal: string;
  };
}

export function VisualizarTicketModal(componentProps: ComponentProps) {
  const { openModalProp, setOpenModal, ticket } = componentProps;
  console.log(ticket);
  return (
    <div className="">
      <Modal
        position="center"
        show={openModalProp}
        size="2xl"
        popup
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 ">
              Modificar Ticket
            </h3>
            <div className="grid grid-cols-2 space-x-1 gap-2">
              <div className="col-span-2">
                <div className="block">
                  <Label htmlFor="titulo">Tiulo</Label>
                </div>
                <TextInput
                  readOnly
                  value={ticket.titulo}
                  id="titulo"
                  required
                />
              </div>
              <div className="col-span-2">
                <div className="block">
                  <Label htmlFor="descripcion">Descripcion</Label>
                </div>
                <Textarea
                  value={ticket.descripcion}
                  id="descripcion"
                  rows={4}
                  required
                  readOnly
                />
              </div>
              <div>
                <div className=" block">
                  <Label htmlFor="soliciante">Soliciante</Label>
                </div>
                <TextInput
                  value={ticket.solicitante.nombre}
                  id="soliciante"
                  readOnly
                  required
                />
              </div>
              <div className="block">
                <div className="block">
                  <Label htmlFor="tecnicoAsignado">Tecnico Asignado</Label>
                </div>
                <TextInput
                  value={`${ticket.tecnicoAsignado?.nombre ?? ""} ${
                    ticket.tecnicoAsignado?.apellido ?? ""
                  }`}
                  id="tecnicoAsignado"
                  readOnly
                  required
                />
              </div>
              <div className="block">
                <div className="block">
                  <Label htmlFor="Categoria">Categoria</Label>
                </div>
                <TextInput
                  value={ticket.CategoriaTicket.nombre}
                  id="Categoria"
                  readOnly
                  required
                />
              </div>
              <div className="block">
                <div className="block">
                  <Label htmlFor="estado">Estado</Label>
                </div>
                <TextInput
                  value={ticket.EstadoTicket.nombre}
                  id="estado"
                  readOnly
                  required
                />
              </div>
              <div className="block">
                <div className="block">
                  <Label htmlFor="prioridad">Prioridad</Label>
                </div>
                <TextInput
                  value={ticket.PrioridadTicket.nombre}
                  id="prioridad"
                  readOnly
                  required
                />
              </div>
              <div className="block">
                <div className="block">
                  <Label htmlFor="fechaCreacion">Fecha de creacion</Label>
                </div>
                <TextInput
                  id="fechaCreacion"
                  value={new Date(ticket.fecha_creacion).toLocaleString(
                    "es-VE",
                    {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }
                  )}
                  readOnly
                  required
                />
              </div>
              <div className="block">
                <div className="block">
                  <Label htmlFor="fechaUltimaActualizacion">
                    Ultima actualizacion
                  </Label>
                </div>
                <TextInput
                  id="fechaUltimaActualizacion"
                  value={ticket.fecha_ultima_actualizacion}
                  readOnly
                  required
                />
              </div>
              <div className="block">
                <div className="block">
                  <Label htmlFor="fechaCierre">Fecha cierre</Label>
                </div>
                <TextInput
                  id="fechaCierre"
                  value={ticket.fecha_cierre}
                  readOnly
                  required
                />
              </div>
              <div className="block col-span-2">
                <div className="block">
                  <Label htmlFor="solucionFinal">Solucion final</Label>
                </div>
                <Textarea
                  value={ticket.solucionFinal}
                  id="solucionFinal"
                  rows={4}
                  required
                />
              </div>
            </div>

            <div className="flex w-full justify-between space-x-1"></div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
