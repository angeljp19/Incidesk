import { UseOnlineUser } from "../../sockets/onlineUser/useOnlineUser";
import { useState, useEffect, useMemo } from "react";
import UsuarioApi from "../../api/usuarios";

interface userInterface {
  activo: boolean;
  apellido: string;
  departamento: string;
  departamento_id: number;
  email: string;
  fecha_creacion: string;
  id: number;
  nombre: string;
  rol: string;
  rol_id: number;
  ultima_sesion: string;
}

interface fnSelectUser {
  setSelectedUser: (user: userInterface) => void;
  onClose?: () => void;
}

export function Usuarios(props: fnSelectUser) {
  const { setSelectedUser, onClose } = props;
  const { onlineUsers } = UseOnlineUser();
  const [usuarios, setUsuarios] = useState<userInterface[]>([]);

  const user = sessionStorage.getItem("user");
  const userObj = JSON.parse(user as string);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await UsuarioApi.getAll();
      const filteredUsers = users.filter(
        (user: userInterface) => user.rol_id == 1 || user.rol_id == 3
      );
      setUsuarios(filteredUsers);
    };

    fetchUsers();
  }, []);

  const onlineUsersSet = useMemo(
    () => new Set(onlineUsers.map((u) => u.id)),
    [onlineUsers]
  );

  return (
    <div className="flex flex-col w-full h-full bg-[#F5F7FB] rounded-r-2xl p-4 gap-3">
      {usuarios.map((user) => {
        const isOnline = onlineUsersSet.has(user.id);
        if (user.id === userObj.id) return null;

        return (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className="
            flex items-center gap-3
            bg-white rounded-2xl px-3 py-2
            cursor-pointer
            shadow-sm
            transition-all duration-200
            hover:shadow-md hover:-translate-y-[1px]
            group
          "
          >
            {/* Avatar + estado */}
            <div className="relative">
              <UserAvatar name={user.nombre} />

              {isOnline && (
                <span
                  className="
                absolute -bottom-0.5 -right-0.5
                w-3 h-3 rounded-full
                bg-green-500
                ring-2 ring-white
              "
                />
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition">
                {user.nombre} {user.apellido}
              </span>

              <span className="text-xs text-gray-400">
                {isOnline ? "En línea" : "Desconectado"}
              </span>
            </div>
          </div>
        );
      })}

      <button
        className="md:hidden text-gray-500 hover:text-gray-700 mt-2"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
}

export function UserAvatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();
  const bgColor = stringToColor(name);

  return (
    <div
      title={name}
      className="
        w-10 h-10 rounded-full
        flex items-center justify-center
        text-sm font-semibold text-white
        shadow-sm
      "
      style={{ backgroundColor: bgColor }}
    >
      {initial}
    </div>
  );
}


function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return `hsl(${hash % 360}, 70%, 50%)`;
}
