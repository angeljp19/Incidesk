import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";

import Ticket from "./Tickets";

class ArchivoAdjunto extends Model {
  public id!: number;
  public ticket_id!: number;
  public nombre_archivo!: string;
  public ruta_servidor!: string;
  public mime_type!: string;
  public fecha_subida!: Date;
}

ArchivoAdjunto.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    ticket_id: { type: DataTypes.INTEGER, allowNull: false },

    nombre_archivo: { type: DataTypes.STRING(255), allowNull: false },
    ruta_servidor: { type: DataTypes.STRING(500), allowNull: false },

    mime_type: { type: DataTypes.STRING(100), allowNull: false },

    fecha_subida: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "archivos_adjuntos", sequelize, timestamps: false }
);

// Relaciones
ArchivoAdjunto.belongsTo(Ticket, { foreignKey: "ticket_id" });

export default ArchivoAdjunto;
