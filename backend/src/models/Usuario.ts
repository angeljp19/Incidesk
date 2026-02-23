import { Model, DataTypes } from "sequelize";
import {sequelize} from "./database";
import Rol from "./Rol";
import Departamento from "./Departamento";

class Usuario extends Model {
  public id!: number;
  public nombre!: string;
  public apellido!: string;
  public departamento_id!: number;
  public email!: string;
  public password!: string;
  public rol_id!: number;
  public activo!: boolean;
  public fecha_creacion!: Date;
  public ultima_sesion!: Date | null;
}

Usuario.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellido: { type: DataTypes.STRING(100), allowNull: false },
    departamento_id: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    rol_id: { type: DataTypes.INTEGER, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    ultima_sesion: { type: DataTypes.DATE, allowNull: true },
  },
  { tableName: "usuarios", sequelize, timestamps: false }
);

// Relaciones
Usuario.belongsTo(Rol, { foreignKey: "rol_id" });
Usuario.belongsTo(Departamento, { foreignKey: "departamento_id" });

export default Usuario;
