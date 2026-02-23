import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";

class ConversacionParticipante extends Model {
  public id!: number;
  public conversacion_id!: number;
  public usuario_id!: number;
  public fecha_union!: Date;

  static associate(models: any) {
    ConversacionParticipante.belongsTo(models.Conversacion, {
      foreignKey: "conversacion_id",
    });

    ConversacionParticipante.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
    });
  }
}

ConversacionParticipante.init(
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
    fecha_union: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "conversacion_participantes",
    sequelize,
    timestamps: false,
  }
);

export default ConversacionParticipante;
