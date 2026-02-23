import { Model, DataTypes } from "sequelize";
import {sequelize} from "./database";

class Rol extends Model {
  public id!: number;
  public nombre!: string;
}

Rol.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  },
  { tableName: "rol", sequelize, timestamps: false }
);

export default Rol;
