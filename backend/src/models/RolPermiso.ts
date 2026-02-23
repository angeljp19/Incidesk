import { Model, DataTypes } from "sequelize";
import {sequelize} from "./database";
import Rol from "./Rol";
import Permiso from "./Permiso";

class RolPermiso extends Model {
  public id!: number;
  public rol_id!: number;
  public permiso_id!: number;
}

RolPermiso.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    rol_id: { type: DataTypes.INTEGER, allowNull: false },
    permiso_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "rol_permisos", sequelize, timestamps: false }
);

// Relaciones (Many-to-Many)
Rol.belongsToMany(Permiso, {
  through: RolPermiso,
  foreignKey: "rol_id",
});

Permiso.belongsToMany(Rol, {
  through: RolPermiso,
  foreignKey: "permiso_id",
});

export default RolPermiso;
