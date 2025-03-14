import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center gap-2 text-danger p-4 rounded-lg">
      <AlertCircle className="w-6 h-6" />
      <span>{message}</span>
    </div>
  );
}
