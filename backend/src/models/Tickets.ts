import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";

import Usuario from "./Usuario";

import CategoriaTicket from "./CategoriaTicket";
import EstadoTicket from "./EstadoTicket";
import PrioridadTicket from "./PrioridadesTickets"

class Ticket extends Model {
  public id!: number;
  public titulo!: string;
  public descripcion!: string;

  public solicitante_id!: number;
  public tecnico_asignado_id!: number | null;

  public categoria_id!: number;
  public estado_id!: number;
  public prioridad_id!: number;

  public fecha_creacion!: Date;
  public fecha_ultima_actualizacion!: Date | null;
  public fecha_cierre!: Date | null;

  public solucion_final!: string | null;
  public calificacion!: string | null;
}

Ticket.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    titulo: { type: DataTypes.STRING(200), allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },

    solicitante_id: { type: DataTypes.INTEGER, allowNull: false },
    tecnico_asignado_id: { type: DataTypes.INTEGER, allowNull: true },

    categoria_id: { type: DataTypes.INTEGER, allowNull: false },
    estado_id: { type: DataTypes.INTEGER, allowNull: false },
    prioridad_id: { type: DataTypes.INTEGER, allowNull: false },

    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_ultima_actualizacion: { type: DataTypes.DATE, allowNull: true },
    fecha_cierre: { type: DataTypes.DATE, allowNull: true },

    solucion_final: { type: DataTypes.TEXT, allowNull: true },
    calificacion: { type: DataTypes.ENUM("Muy buena", "Buena", "Regular", "Mala"), allowNull: true },
  },
  { tableName: "tickets", sequelize, timestamps: false }
);


// RELACIONES


Ticket.belongsTo(Usuario, { foreignKey: "solicitante_id", as: "solicitante" });


Ticket.belongsTo(Usuario, {
  foreignKey: "tecnico_asignado_id",
  as: "tecnicoAsignado",
});


Ticket.belongsTo(CategoriaTicket, { foreignKey: "categoria_id" });
Ticket.belongsTo(EstadoTicket, { foreignKey: "estado_id" });
Ticket.belongsTo(PrioridadTicket, { foreignKey: "prioridad_id" });


export default Ticket;
