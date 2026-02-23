import {
  Accordion,
  AccordionPanel,
  AccordionContent,
  AccordionTitle,
} from "flowbite-react";

import { PageHeader } from "../../components/pageHeader";

export function AyudaPageTecnico() {
  const preguntas = [
    {
      pregunta: "¿Cómo puedo crear un ticket?",
      respuesta:
        "Ve a la sección 'Crear Ticket', completa el formulario con el título, descripción, categoría y prioridad. Luego presiona el botón 'Crear Ticket'.",
    },
    {
      pregunta: "¿Dónde puedo ver mis tickets?",
      respuesta:
        "En la pestaña 'Mis Tickets' encontrarás una lista con todos los tickets que has creado.",
    },
    {
      pregunta: "¿Qué significan los estados del ticket?",
      respuesta:
        "El estado indica el progreso del ticket: Pendiente, En proceso, Completado o Cerrado.",
    },
    {
      pregunta: "¿Cómo adjunto un archivo?",
      respuesta:
        "Durante la creación del ticket puedes seleccionar un archivo desde tu dispositivo.",
    },
    {
      pregunta: "¿Cómo me contacta soporte?",
      respuesta:
        "El equipo técnico actualizará el estado del ticket o agregará información interna.",
    },
  ];

  return (
    <div className="relative w-full h-full flex justify-center items-center min-h-full">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda - FAQ */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <PageHeader title="Centro de Ayuda" subtitle="Encuentra respuestas rápidas sobre el uso del sistema Incidesk."/>
          <Accordion className="border border-gray-200 rounded-lg overflow-hidden">
            {preguntas.map((item, index) => (
              <AccordionPanel key={index}>
                <AccordionTitle className="bg-white hover:bg-gray-50 text-gray-800 font-medium focus:ring-0">
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

        {/* Columna derecha - Paso a paso (desktop) */}
        <div className="hidden lg:block">
          <div className="bg-white border border-gray-200 rounded-lg p-5 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Guía paso a paso
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Visualiza el proceso mientras lees las instrucciones.
            </p>

            {/* Contenedor de imágenes */}
            <div className="space-y-4">
              <div className="h-36 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 text-sm">
                Imagen ilustrativa 1
              </div>
              <div className="h-36 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 text-sm">
                Imagen ilustrativa 2
              </div>
              <div className="h-36 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 text-sm">
                Imagen ilustrativa 3
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
