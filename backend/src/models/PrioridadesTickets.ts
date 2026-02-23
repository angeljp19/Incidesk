import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";

class PrioridadTicket extends Model {
  public id!: number;
  public nombre!: string;
  public activo!: boolean;
}

PrioridadTicket.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: "prioridades", sequelize, timestamps: false }
);

export default PrioridadTicket;
