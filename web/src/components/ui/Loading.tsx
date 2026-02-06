import { Loader2 } from "lucide-react";
import { cn } from "../../utils/helpers";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function Loading({ size = "md", className, text }: LoadingProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className,
      )}
    >
      <Loader2 className={cn("animate-spin text-primary-600", sizes[size])} />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
}
