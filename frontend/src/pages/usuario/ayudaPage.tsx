import {
  Accordion,
  AccordionPanel,
  AccordionContent,
  AccordionTitle,
} from "flowbite-react";
import { useState } from "react";
import { PageHeader } from "../../components/pageHeader";

import crearticket from "../../assets/crear-ticket.png";
import contactoSoporte from "../../assets/contacto-soporte.png";
import estadosTickets from "../../assets/estados-ticket.png";
import misSolicitudes from "../../assets/mis-solicitudes.png";

export function AyudaPage() {
  const preguntas = [
    {
      pregunta: "¿Cómo puedo crear un ticket?",
      respuesta:
        "Ve a la sección 'Crear Ticket', completa el formulario con el título, descripción, categoría, prioridad y si es necesario adjunta una imagen. Luego presiona el botón 'Crear Ticket'.",
      imagen: crearticket,
    },
    {
      pregunta: "¿Dónde puedo ver mis tickets?",
      respuesta:
        "En la pestaña 'Mis Solicitudes' encontrarás una lista con todos los tickets que has creado. Podras filtrar por estados o ver todo tu registro historico de solicitudes",
      imagen: misSolicitudes,
    },
    {
      pregunta: "¿Qué significan los estados del ticket?",
      respuesta:
        "El estado indica el progreso del ticket: Pendiente, Activo, Finalizado. Al crear un ticket se creara con el esta 'Pendiente', luego de ser asignado a un tecnico, se actualizara a 'Activo'",
      imagen: estadosTickets,
    },
    {
      pregunta: "¿Cómo me contacta soporte?",
      respuesta:
        "El equipo técnico actualizará el estado del ticket o agregará información interna. Puedes ver los comentarios que te deja el tecnico asignado a tu ticket en la informacion del mismo. Tambien puedes escribir directamente al equipo de soporte desde ahi.",
      imagen: contactoSoporte,
    },
  ];

  const [imagenActual, setImagenActual] = useState<string>(
    preguntas[0].imagen
  );

  return (
    <div className="w-full h-full flex justify-center items-center overflow-auto">
      <div className="w-full items-center h-full max-w-7xl px-4 sm:px-6 flex flex-col lg:flex-row gap-8">
        {/* FAQ */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <PageHeader
            title="Centro de Ayuda"
            subtitle="Encuentra respuestas rápidas sobre el uso del sistema Incidesk."
          />

          <Accordion className="border border-gray-200 rounded-lg overflow-hidden">
            {preguntas.map((item, index) => (
              <AccordionPanel key={index}>
                <AccordionTitle
                  className="bg-white hover:bg-gray-50 text-gray-800 font-medium focus:ring-0"
                  onClickCapture={() => setImagenActual(item.imagen)}
                >
                  {item.pregunta}
                </AccordionTitle>

                <AccordionContent className="bg-gray-50">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.respuesta}
                  </p>
                </AccordionContent>
              </AccordionPanel>
            ))}
          </Accordion>
        </div>

        {/* Imagen (desktop) */}
        <div className="flex w-full lg:w-1/2">
          <div className="w-full border border-gray-200 rounded-lg p-5 sticky top-6 flex items-center justify-center">
            <img
              src={imagenActual}
              alt="Guía visual"
              className="max-w-full max-h-[500px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
