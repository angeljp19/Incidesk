import { Link } from "react-router-dom";

interface Props {
  titulo: string;
  valor: string;
  color: string;
  link: string;
}

export const ColorCard = ({ titulo, valor, color, link }: Props) => {
  return (
    <Link
      to={link}
      className="group flex items-center justify-between
                 bg-white/95 hover:bg-white
                 rounded-2xl px-4 py-3
                 transition-all duration-200
                 shadow-sm hover:shadow-md"
    >
      {/* Texto */}
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 group-hover:text-gray-600">
          {titulo}
        </span>
        <span className="text-2xl font-bold text-gray-800 leading-tight">
          {valor}
        </span>
      </div>

      {/* Indicador */}
      <div
        className="w-3 h-10 rounded-full"
        style={{ backgroundColor: color }}
      />
    </Link>
  );
};
