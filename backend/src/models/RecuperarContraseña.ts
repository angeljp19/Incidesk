import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";
import Usuario from "./Usuario";

class RecuperarContrasena extends Model {
  public id!: number;
  public usuario_id!: number;
  public token_hash!: string;
  public usado!: boolean;
  public fecha_creacion!: Date;
  public fecha_expiracion!: Date;
}

RecuperarContrasena.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    token_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    usado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    fecha_expiracion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date(Date.now() + 10 * 60 * 1000),
    },
  },
  {
    tableName: "recuperacion_contrasena",
    sequelize,
    timestamps: false,
  }
);

// Relación
RecuperarContrasena.belongsTo(Usuario, {
  foreignKey: "usuario_id",
});

export default RecuperarContrasena;
