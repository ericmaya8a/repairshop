import { cn } from "@/lib/utils";

interface MessageBoxProps {
  type: "success" | "error";
  content: React.ReactNode;
}

export function MessageBox({ type, content }: MessageBoxProps) {
  const className = type === "error" ? "text-red-500" : "";

  return (
    <div className={cn("bg-accent px-4 py-2 my-2 rounded-lg", className)}>
      {type === "success" ? "🎉" : "🚨"} {content}
    </div>
  );
}
