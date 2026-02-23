import { Model, DataTypes } from "sequelize";
import {sequelize} from "./database";

class Permiso extends Model {
  public id!: number;
  public nombre!: string;
}

Permiso.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  },
  { tableName: "permisos", sequelize, timestamps: false }
);

export default Permiso;
