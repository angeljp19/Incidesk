import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";

import Usuario from "./Usuario";

class Notificaciones extends Model {
  public id!: number;
  public titulo!: string;
  public tipo_id!: number;
  public entidad_id!: number;
  public receptor_id!: number;
  public hexColor!: string;
  public activo!: boolean;
  public fecha!: Date;
  public info!: string
}

Notificaciones.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING(100), allowNull: false },
    tipo_id: { type: DataTypes.INTEGER },
    entidad_id: { type: DataTypes.INTEGER },
    receptor_id: { type: DataTypes.INTEGER },
    hexColor: { type: DataTypes.STRING(10), allowNull: false },
    activo: {type: DataTypes.BOOLEAN, defaultValue: true},
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    info: {type: DataTypes.STRING(255)}
  },
  { tableName: "notificaciones", sequelize, timestamps: false }
);

Notificaciones.belongsTo(Usuario, { foreignKey: "receptor_id", as: "receptor" });

export default Notificaciones;
