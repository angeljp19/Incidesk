import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";

import Ticket from "./Tickets";
import Usuario from "./Usuario";

class Comentario extends Model {
  public id!: number;
  public ticket_id!: number;
  public usuario_id!: number;
  public fecha!: Date;
  public contenido!: string;
  public es_nota_interna!: boolean;
}

Comentario.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    ticket_id: { type: DataTypes.INTEGER, allowNull: false },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },

    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

    contenido: { type: DataTypes.TEXT, allowNull: false },

    es_nota_interna: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { tableName: "comentarios", sequelize, timestamps: false }
);

// Relaciones
Comentario.belongsTo(Ticket, { foreignKey: "ticket_id" });
Comentario.belongsTo(Usuario, { foreignKey: "usuario_id" });

export default Comentario;
