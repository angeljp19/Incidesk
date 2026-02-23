interface UserTeamCardProps {
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  color: "blue" | "green";
  clickable?: boolean;
  onClick?: () => void;
}

export function UserTeamCard({
  nombre,
  apellido,
  email,
  rol,
  color,
  clickable = false,
  onClick,
}: UserTeamCardProps) {
  const colors = {
    blue: {
      ring: "hover:ring-blue-500",
      badge: "bg-blue-100 text-blue-700",
    },
    green: {
      ring: "hover:ring-green-500",
      badge: "bg-green-100 text-green-700",
    },
  };

  return (
    <div
      onClick={onClick}
      className={`
        group
        bg-white
        rounded-2xl
        p-5
        border border-gray-200
        shadow-sm
        transition
        ${clickable ? "cursor-pointer hover:shadow-lg hover:ring-2" : ""}
        ${colors[color].ring}
      `}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className={`
            w-12 h-12 rounded-full
            flex items-center justify-center
            font-bold text-white
            ${color === "blue" ? "bg-blue-600" : "bg-green-600"}
          `}
        >
          {nombre.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex flex-col min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">
            {nombre} {apellido}
          </h4>

          <p className="text-sm text-gray-500 truncate">{email}</p>

          <span
            className={`mt-1 w-fit px-2 py-0.5 rounded-full text-xs font-medium ${colors[color].badge}`}
          >
            {rol}
          </span>
        </div>
      </div>
    </div>
  );
}
