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

  // apply any passed className to both the overlay and the container
  // this ensures responsive utilities (e.g. `md:hidden`) hide the
  // entire modal; previously only the container received the class and
  // the overlay remained visible on larger screens, blocking
  // interactions with underlying drawers.
  const sharedClasses = className;

  return (
    <>
      {/* dark overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 ${sharedClasses}`}
        onClick={onClose}
      ></div>

      {/* centering container */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${sharedClasses}`}
      >
        {children}
      </div>
    </>
  );
}
