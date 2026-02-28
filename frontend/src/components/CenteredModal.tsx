import React from "react";

interface CenteredModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function CenteredModal({
  show,
  onClose,
  children,
  className = "",
}: CenteredModalProps) {
  if (!show) return null;

  return (
    <>
      {/* dark overlay */}
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose}></div>

      {/* centering container */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${className}`}
      >
        {children}
      </div>
    </>
  );
}
