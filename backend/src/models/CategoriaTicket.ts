import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";

class CategoriaTicket extends Model {
  public id!: number;
  public nombre!: string;
  public activo!: boolean;
}

CategoriaTicket.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: "categorias", sequelize, timestamps: false }
);

export default CategoriaTicket;
