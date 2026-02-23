import { Model, DataTypes } from "sequelize";
import {sequelize} from "./database";

class Departamento extends Model {
  public id!: number;
  public nombre!: string;
  public activo!: boolean
}

Departamento.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(150), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: "departamentos", sequelize, timestamps: false }
);

export default Departamento;
