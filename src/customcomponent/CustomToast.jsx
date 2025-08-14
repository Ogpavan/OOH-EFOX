import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

export function showCustomToast({ type = "success", message = "", duration = 2000 }) {
  let color = "#355E3B"; // green for success
  let icon = <CheckCircle className="w-5 h-5" />;
  if (type === "error") {
    color = "#ef4444"; // red for error
    icon = <XCircle className="w-5 h-5" />;
  }

  toast(message, {
    position: "top-center",
    duration,
    icon,
    style: {
      background: color,
      color: "#fff",
      borderRadius: "12px",
      fontWeight: "bold",
    },
    iconTheme: {
      primary: "#fff",
      secondary: color,
    },
  });
}