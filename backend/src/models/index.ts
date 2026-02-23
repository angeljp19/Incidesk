import Conversacion from "./Conversacion";
import ConversacionParticipante from "./ConversacionParticipante";
import Usuario from "./Usuario";
import Mensaje from "./Mensaje";

const models = {
  Conversacion,
  ConversacionParticipante,
  Usuario,
  Mensaje,
};

// Ejecutar asociaciones DESPUÉS de cargar todos
Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

export default models;
