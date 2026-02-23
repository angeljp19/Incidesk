import { Link } from "react-router-dom";

interface IncideskTabItem {
  label: string;
  value: string;
  to: string;
  activeColor?: string;
}

interface IncideskTabsProps {
  items: IncideskTabItem[];
  activeValue: string;
  onChange?: () => void;
  className?: string;
}

export function IncideskTabsFiltros({
  items,
  activeValue,
  onChange,
  className = "",
}: IncideskTabsProps) {
  return (
    <div
      className={`bg-[#F5F7FB] grid grid-cols-3  rounded-xl p-1 md:flex gap-3 ${className}`}
    >
      {items.map((item) => {
        const isActive = activeValue === item.value;

        return (
          <Link
            key={item.value}
            to={item.to}
            onClick={onChange}
            className={`
              flex items-center justify-center h-10 text-sm font-medium rounded-lg
              transition-all duration-200 px-2
              ${
                isActive
                  ? `${item.activeColor} text-white shadow-sm`
                  : "text-gray-600 hover:bg-white hover:text-blue-700"
              }
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
