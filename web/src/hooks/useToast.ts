import { useState, useCallback } from "react";
import { ToastProps } from "../components/ui/Toast";

let toastId = 0;

export interface ToastOptions {
  title?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = useCallback(
    (message: string, options: ToastOptions = {}) => {
      const id = `toast-${++toastId}`;

      const toast: ToastProps = {
        id,
        message,
        title: options.title,
        type: options.type || "info",
        duration: options.duration || 5000,
        onClose: (toastId: string) => {
          setToasts((prev) => prev.filter((t) => t.id !== toastId));
        },
      };

      setToasts((prev) => [...prev, toast]);

      return id;
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const success = useCallback(
    (message: string, options: Omit<ToastOptions, "type"> = {}) => {
      return showToast(message, { ...options, type: "success" });
    },
    [showToast],
  );

  const error = useCallback(
    (message: string, options: Omit<ToastOptions, "type"> = {}) => {
      return showToast(message, { ...options, type: "error" });
    },
    [showToast],
  );

  const warning = useCallback(
    (message: string, options: Omit<ToastOptions, "type"> = {}) => {
      return showToast(message, { ...options, type: "warning" });
    },
    [showToast],
  );

  return {
    toasts,
    showToast,
    removeToast,
    clearAll,
    success,
    error,
    warning,
  };
}
