import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";
import Mensaje from "./Mensaje";
import ConversacionParticipante from "./ConversacionParticipante";

class Conversacion extends Model {
  public id!: number;
  public tipo!: "privada" | "grupo";
  public created_at!: Date;

  declare participantes?: ConversacionParticipante[];
  declare mensajes?: Mensaje[];

  static associate(models: any) {
    Conversacion.hasMany(models.ConversacionParticipante, {
      foreignKey: "conversacion_id",
      as: "participantes",
    });

    Conversacion.hasMany(models.Mensaje, {
      foreignKey: "conversacion_id",
      as: "mensajes",
    });
  }
}

Conversacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo: {
      type: DataTypes.ENUM("privada", "grupo"),
      allowNull: false,
      defaultValue: "privada",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "conversaciones",
    sequelize,
    timestamps: false,
  }
);

export default Conversacion;
