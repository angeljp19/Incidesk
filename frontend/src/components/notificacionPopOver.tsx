import { Popover } from "flowbite-react";
import type { ReactNode } from "react";

interface NotificacionPopOverProps {
  titulo: string;
  info: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export function NotificacionPopOver({
  titulo,
  info,
  children,
  open,
  onClose,
}: NotificacionPopOverProps) {
  const content = (
    <div className="w-64 text-sm text-gray-500 ">
      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2">
        <h3 className="font-semibold text-gray-900">{titulo}</h3>
      </div>
      <div className="px-3 py-2 max-h-64  overflow-auto">
        <p>{info}</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="block lg:hidden">
        <Popover
          content={content}
          placement="bottom"
          open={open}
          trigger="click"
          onOpenChange={(v) => !v && onClose()}
        >
          {children}
        </Popover>
      </div>

      <div className="hidden lg:block">
        <Popover
          content={content}
          placement="left"
          open={open}
          trigger="click"
          onOpenChange={(v) => !v && onClose()}
        >
          {children}
        </Popover>
      </div>
    </div>
  );
}
