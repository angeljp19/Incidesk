import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";
import Conversacion from "./Conversacion";
import Usuario from "./Usuario";

class Mensaje extends Model {
  public id!: number;
  public conversacion_id!: number;
  public usuario_id!: number;
  public contenido!: string;
  public created_at!: Date;
}

Mensaje.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    conversacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "mensajes",
    sequelize,
    timestamps: false,
  }
);

/* Asociaciones */
Mensaje.belongsTo(Conversacion, {
  foreignKey: "conversacion_id",
});

Mensaje.belongsTo(Usuario, {
  foreignKey: "usuario_id",
});

export default Mensaje;
