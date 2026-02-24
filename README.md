# Sistema de Control y Seguimiento de Solicitudes TI (Helpdesk)

**ES:** Plataforma web para registrar, priorizar y dar seguimiento a solicitudes de soporte TI, con roles, trazabilidad, reportes y mensajería interna.  
**EN:** Web-based IT helpdesk/ticketing system with role-based access, traceability, reporting, and internal real-time messaging.

---

## Tabla de contenidos
- [Resumen](#resumen)
- [Problema](#problema)
- [Solución](#solución)
- [Roles y alcance](#roles-y-alcance)
- [Funcionalidades](#funcionalidades)
- [Flujo de datos](#flujo-de-datos)
- [Arquitectura](#arquitectura)
- [Stack técnico](#stack-técnico)
- [Seguridad](#seguridad)
- [Modelo de datos](#modelo-de-datos)
- [Capturas / demo](#capturas)


---

## Resumen
<a name="resumen"></a>
Este proyecto implementa un sistema tipo **Helpdesk/ITSM** para centralizar la gestión de solicitudes TI dentro de una organización:
- Registro formal de incidencias (tickets) por parte de usuarios internos.
- Clasificación por **categoría**, **prioridad** y **estado**.
- Asignación y seguimiento por parte del equipo técnico.
- **Mensajería interna en tiempo real** para coordinación operativa.
- **Reportes y estadísticas** (incluye exportación a PDF).

---

## Problema
<a name="problema"></a>
En muchas organizaciones, las solicitudes TI se gestionan por canales informales (llamadas/correos/mensajería), lo que provoca:
- Pérdida u olvido de requerimientos.
- Falta de trazabilidad y estatus claro.
- Retrasos y duplicación de esfuerzo.
- Ausencia de histórico y métricas para gestión.

---

## Solución
<a name="solucion"></a>
Una aplicación web con flujo completo de tickets:
1. Usuario crea ticket (título, descripción, categoría, prioridad y adjuntos).
2. Administrador supervisa, clasifica y asigna/reasigna.
3. Técnico atiende, registra avances (comentarios/notas internas), cambia estados y cierra.
4. Administrador genera métricas y reportes (incluyendo PDF).

---

## Roles y alcance
<a name="roles-y-alcance"></a>
- **Administrador**: gobierno del sistema (usuarios, configuración, asignación, reportes).
- **Técnico**: atención y resolución de tickets asignados.
- **Usuario (solicitante)**: creación y seguimiento de sus solicitudes.

---

## Funcionalidades
<a name="funcionalidades"></a>
### Core (tickets)
- Crear tickets con: título, descripción, categoría, prioridad y **archivos adjuntos**.
- Estados: **activo / pendiente / finalizado**.
- Historial de acciones (creación, actualizaciones, cierre) para trazabilidad.
- Comentarios:
  - Comentarios visibles al solicitante.
  - **Notas internas** exclusivas del equipo técnico.

### Administración
- Gestión de usuarios: crear/editar/activar/desactivar, asignación de rol y departamento.
- Gestión global de tickets: ver todos, asignar/reasignar, cambiar estado.
- Configuración: administración de **departamentos** y **categorías**.

### Técnico
- Bandeja de tickets asignados.
- Actualización de estado, registro de observaciones técnicas, cierre con solución final.

### Reportes y analítica
- Estadísticas para toma de decisiones (carga por técnico, distribución por categoría/departamento, etc.).
- Exportación de reportes en **PDF**.

### Comunicación interna
- Mensajería privada en tiempo real (principalmente entre **administradores y técnicos**).

---
## Flujo de Datos
<a name="flujo-de-datos"></a>
![Flujo de Datos](assets/flujoDatos.png "Flujo de Datos")

---

## Arquitectura
<a name="arquitectura"></a>
Arquitectura **cliente–servidor de tres capas**:

- **Cliente (SPA)**: React (UI por componentes).
- **Servidor (API REST)**: Node.js + Express (lógica de negocio, validaciones, middlewares).
- **Datos**: PostgreSQL (Neon) + Sequelize (ORM).

![Arquitectura Cliente Servidor Modelo 3 Capas](assets/arquitectura.png "Arquitectura Cliente Servidor Modelo 3 Capas")

Además:
- Módulo de **tiempo real** con Socket.IO para mensajería.
- Comunicación entre capas vía **HTTPS**.

---

## Stack técnico
<a name="stack-técnico"></a>
**Frontend**
- React
- TypeScript
- TailwindCSS

**Backend**
- Node.js
- Express.js
- Sequelize (ORM)

**Base de datos**
- PostgreSQL (Neon)

**Tiempo real**
- Socket.IO

**Reportes**
- PDFKit (exportación a PDF)

---

## Seguridad
<a name="seguridad"></a>
- Autenticación con **token** (JWT) para validar solicitudes posteriores.
- Autorización basada en **roles** (restricción de endpoints/acciones con middlewares).
- Mitigación de **SQL Injection** mediante Sequelize (consultas parametrizadas).
- Mitigación de **XSS** en UI usando el escape automático de React.
- Menor superficie de **CSRF** al usar tokens en headers (en lugar de cookies de sesión tradicionales).
- Manejo controlado de errores (códigos HTTP adecuados sin exponer detalles internos).

---

## Modelo de datos
<a name="modelo-de-datos"></a>
Entidades principales (alto nivel):
- Usuario, Rol, Departamento
- Ticket, Categoría, Prioridad, Estado
- Comentarios, Archivos adjuntos
- Notificaciones / Tipos de notificación
- Conversaciones, Participantes, Mensajes (mensajería interna)

![Diagrama Entidad Relacion](assets/entidadRelacion.png "Diagrama Entidad Relacion")


---

## Capturas
<a name="capturas"></a>

## Panel principal de administrador. Notificaciones, estadisticas y metricas utiles
![dashboard](assets/dashboard.png "dashboard")


## Modulo de comunicación en tiempo real (Chat online mediante websockets)
![chat](assets/chat.png "chat")


## Modulo de gestion de tickets para el administrador
![gestionTickets](assets/gestionTickets.png "gestionTicket")


## Atencion de incidencias por tecnicos asignados
![seguimiento](assets/tecnicoSeguimiento.png "seguimiento")
