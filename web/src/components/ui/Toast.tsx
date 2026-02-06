import { ReactNode, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "../../utils/helpers";

export interface ToastProps {
  id: string;
  title?: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose: (id: string) => void;
}

export function Toast({
  id,
  title,
  message,
  type = "info",
  duration = 5000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconColors = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "relative flex w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all",
        colors[type],
      )}
    >
      <div className="flex">
        <Icon className={cn("h-5 w-5 flex-shrink-0", iconColors[type])} />
        <div className="ml-3 flex-1">
          {title && <h4 className="text-sm font-medium mb-1">{title}</h4>}
          <p className="text-sm">{message}</p>
        </div>
        <button
          type="button"
          className="ml-4 flex-shrink-0 rounded-md p-1.5 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={() => onClose(id)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Container para os toasts
export function ToastContainer({ children }: { children: ReactNode }) {
  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4 pointer-events-none">
      {children}
    </div>
  );
}
