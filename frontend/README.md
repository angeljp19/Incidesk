#  Planificación Inicial del Proyecto: Sistema de Gestión de Solicitudes TI

Este documento describe la planificación inicial funcional del **sistema web para el control y seguimiento de solicitudes (tickets)** al departamento de Informática, organizada mediante **Historias de Usuario** por cada rol principal.

---

##  Roles Definidos

El sistema contará con los siguientes tres roles principales para gestionar el ciclo de vida de los tickets:

- **Administrador:** Gestión total del sistema, configuración y supervisión del equipo.  
- **Técnico:** Resolución de casos y documentación de las soluciones.  
- **Usuario Común:** Creación y seguimiento de sus propias solicitudes.

---

##  I. Historias de Usuario: Administrador

El **Administrador** tiene una visión global del sistema y permisos para la configuración, gestión de personal y supervisión de toda la operación.

| ID  | Historia de Usuario | Objetivo / Beneficio |
|:----|:--------------------|:---------------------|
| **A01** | Como Administrador, quiero ver una lista de todos los tickets (pendientes, activos, cerrados) de la empresa, para tener una visión completa de la operación de TI. |  |
| **A02** | Como Administrador, quiero asignar o reasignar un ticket a cualquier Técnico disponible, para balancear la carga de trabajo y asegurar que el ticket sea atendido por el experto correcto. |  |
| **A03** | Como Administrador, quiero gestionar la lista de Técnicos (añadir, editar, desactivar), para mantener actualizado el equipo de soporte. |  |
| **A04** | Como Administrador, quiero gestionar las categorías/tipos de solicitud (ej. Falla de Hardware, Solicitud de Software, Consulta), para clasificar mejor los tickets entrantes. |  |
| **A05** | Como Administrador, quiero generar reportes estadísticos (ej. tickets creados por mes, tiempo promedio de resolución), para analizar el rendimiento del equipo y los cuellos de botella. |  |
| **A06** | Como Administrador, quiero ver métricas clave (número de tickets abiertos, asignados, sin asignar) en un tablero de control (Dashboard), para monitorizar el estado de la operación en tiempo real. |  |
| **A07** | Como Administrador, quiero modificar cualquier dato de un ticket (prioridad, título, usuario asignado), para corregir errores o ajustar la estrategia de manejo del caso. |  |
| **A08** | Como Administrador, quiero gestionar a los Usuarios Comunes (añadir, editar, restablecer contraseña), para asegurar que solo personal autorizado pueda acceder al sistema. |  |

---

##  II. Historias de Usuario: Técnico

El **Técnico** se enfoca en la gestión eficiente de los tickets asignados, la resolución de problemas y la documentación interna.

| ID  | Historia de Usuario | Objetivo / Beneficio |
|:----|:--------------------|:---------------------|
| **T01** | Como Técnico, quiero ver una lista de los tickets que me han sido asignados, para priorizar y gestionar mi carga de trabajo diaria. |  |
| **T02** | Como Técnico, quiero filtrar y ordenar la lista de tickets por prioridad, estado y fecha de creación, para poder enfocarme en los casos más urgentes. |  |
| **T03** | Como Técnico, quiero cambiar el estado de un ticket (e.g., Aceptado, En Progreso, En Espera), para que los demás (Administrador y Usuario) conozcan el progreso de mi trabajo. |  |
| **T04** | Como Técnico, quiero añadir notas internas a un ticket, para documentar mis pasos de diagnóstico y solución sin que el Usuario Común las vea. |  |
| **T05** | Como Técnico, quiero añadir comentarios visibles al usuario en un ticket, para solicitar información o notificarle sobre una acción que debe realizar. |  |
| **T06** | Como Técnico, quiero ver el historial completo de interacciones y cambios de estado de un ticket, para entender su contexto y todo lo que se ha intentado previamente. |  |
| **T07** | Como Técnico, quiero registrar la solución final al cerrar un ticket, para dejar un registro de la resolución para futuras referencias y reportes. |  |
| **T08** | Como Técnico, quiero ver la información del usuario solicitante (departamento, extensión, etc.), para poder contactarlo directamente si es necesario. |  |

---

##  III. Historias de Usuario: Usuario Común

El **Usuario Común** se centra en la facilidad para reportar problemas y mantenerse informado sobre el progreso de su solicitud.

| ID  | Historia de Usuario | Objetivo / Beneficio |
|:----|:--------------------|:---------------------|
| **UC01** | Como Usuario Común, quiero crear una nueva solicitud de soporte a través de un formulario sencillo, para poder reportar un incidente o requerimiento a TI rápidamente. |  |
| **UC02** | Como Usuario Común, quiero adjuntar archivos (ej. capturas de pantalla, documentos) al crear una solicitud, para que el equipo de TI tenga toda la información visual necesaria para resolver el caso. |  |
| **UC03** | Como Usuario Común, quiero ver una lista de todas mis solicitudes activas e históricas, para llevar un seguimiento de mis requerimientos con el área de TI. |  |
| **UC04** | Como Usuario Común, quiero ver el estado y la información detallada (técnico asignado, comentarios) de cada una de mis solicitudes, para saber el avance de mi caso. |  |
| **UC05** | Como Usuario Común, quiero recibir una notificación por correo electrónico cuando mi ticket sea actualizado o cerrado, para estar siempre informado sobre el progreso sin tener que entrar al sistema. |  |
| **UC06** | Como Usuario Común, quiero añadir comentarios a un ticket existente, para proporcionar información adicional o responder a preguntas del técnico. |  |
| **UC07** | Como Usuario Común, quiero cerrar un ticket si considero que el problema se ha resuelto, para formalizar la finalización del servicio. |  |
| **UC08** | Como Usuario Común, quiero poder buscar mis solicitudes por palabra clave o número de ticket, para encontrar un caso específico rápidamente. |  |

---
