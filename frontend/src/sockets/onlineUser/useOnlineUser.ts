import {
  registerOnlineUsersListener,
  unregisterOnlineUsersListener,
  syncOnlineUsers,
} from "./onlineUserSocket";
import { useState, useEffect } from "react";

export function UseOnlineUser() {
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  useEffect(() => {
    const onLogin = (users: any[]) => {
      setOnlineUsers(users);
    };

    registerOnlineUsersListener(onLogin);
    syncOnlineUsers();

    return () => {
      unregisterOnlineUsersListener(onLogin);
    };
  }, []);
  return {
    onlineUsers,
  };
}
