import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";


class TipoNotificacion extends Model {
  public id!: number;
  public nombre!: string;
}

TipoNotificacion.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(50), allowNull: false },
  },
  { tableName: "tipo_notificacion", sequelize, timestamps: false }
);


export default TipoNotificacion;
