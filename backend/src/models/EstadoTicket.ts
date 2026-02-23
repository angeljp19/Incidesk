import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";


class EstadoTicket extends Model {
  public id!: number;
  public nombre!: string;
}

EstadoTicket.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
  },
  { tableName: "estados_ticket", sequelize, timestamps: false }
);



export default EstadoTicket;
