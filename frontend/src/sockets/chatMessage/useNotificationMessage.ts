import { useEffect } from "react";
import {
  onMessageNotification,
  offMessageNotification,
} from "./privateChatMessage";

export function useNotificationMessage(setNuevoMensaje: (msg: any) => void) {

  useEffect(() => {
    const onNotification = (msg: any) => {
      setNuevoMensaje(msg.contenido);
    };

    onMessageNotification(onNotification);

    return () => {
      offMessageNotification(onNotification);
    };
  }, []);

  return ;
}
