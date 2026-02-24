import express, {Request, Response} from "express"
import cors from "cors"
import { sequelize } from "./models/database";
import "./models/Usuario";
import "./models/Rol";
import "./models/Permiso";
import "./models/RolPermiso";
import "./models/Departamento";
import "./models/CategoriaTicket"
import "./models/EstadoTicket"
import "./models/PrioridadesTickets"
import "./models/Comentarios"
import "./models/Tickets"
import "./models/ArchivosAdjuntos"
import "./models/Notificaciones"
import "./models/TipoNotificacion"
import "./models/Conversacion"
import "./models/ConversacionParticipante"
import "./models/Mensaje"
import "./models/index"

import departamentosRoutes from "./routes/departamentos"
import usuariosRoutes from "./routes/usuarios"
import authRoutes from "./routes/auth"
import rolesRoutes from "./routes/roles"
import categoriaRoutes from "./routes/categoriaTicket"
import prioridadRoutes from "./routes/prioridadTicket"
import estadoRoutes from "./routes/estadoTicket"
import ticketsRoutes from "./routes/tickets"
import notificacionesRoutes from "./routes/notificaciones"
import privateMessageRoutes from "./routes/privateMessage"
import comentariosRoutes from "./routes/comentarios"
import reportesRouter from "./routes/reportes"

import {Server} from "socket.io"
import { createServer } from "http";



const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};


const app = express()
const server = createServer(app)
export const io = new Server(server, {cors: corsOptions})

app.use(express.json())
app.use(cors(corsOptions));

app.use("/departamentos", departamentosRoutes)
app.use("/roles", rolesRoutes)
app.use("/usuarios", usuariosRoutes)
app.use("/categoriaTickets", categoriaRoutes)
app.use("/prioridadTickets", prioridadRoutes)
app.use("/estadoTickets", estadoRoutes)
app.use("/tickets", ticketsRoutes)
app.use("/notificaciones", notificacionesRoutes)
app.use("/auth", authRoutes)
app.use("/privateMessage", privateMessageRoutes)
app.use("/comentarios", comentariosRoutes)
app.use("/reportes", reportesRouter)

import "./sockets/index"

sequelize.sync()
  .then(() => console.log("Modelos sincronizados"))
  .catch(console.error);
server.listen(3000)