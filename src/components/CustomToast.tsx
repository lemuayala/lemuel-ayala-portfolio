import { CheckCircle, XCircle, X, Loader2 } from "lucide-react"; // Importa Loader2
import toast, { Toast } from "react-hot-toast";

interface CustomToastProps {
  t: Toast;
  message: string;
  type: "success" | "error" | "loading";
}

export const CustomToast: React.FC<CustomToastProps> = ({
  t,
  message,
  type,
}) => {
  let IconComponent: React.ElementType = Loader2;
  let iconColor = "text-blue-500 dark:text-blue-400";
  let shouldAnimate = false;

  if (type === "success") {
    IconComponent = CheckCircle;
    iconColor = "text-green-500 dark:text-green-400";
  } else if (type === "error") {
    IconComponent = XCircle;
    iconColor = "text-red-500 dark:text-red-400";
  } else if (type === "loading") {
    shouldAnimate = true;
  }

  return (
    <div
      className={`
        ${
          t.visible ? "animate-enter" : "animate-leave"
        } // Añade clases de animación
        max-w-md w-full rounded-lg shadow-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5
        bg-white text-gray-800
        dark:text-white dark:border dark:border-white/10
        dark:bg-gradient-to-r dark:from-[#0d0110] dark:via-black dark:to-slate-950
      `}
    >
      {/* Contenido del Toast */}
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          {/* Icono */}
          <div className="flex-shrink-0 pt-0.5">
            <IconComponent
              className={`h-6 w-6 ${iconColor} ${
                shouldAnimate ? "animate-spin" : ""
              }`} // Añade animate-spin si es loading
              aria-hidden="true"
            />
          </div>
          {/* Mensaje */}
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
      </div>

      {/* Botón de Cerrar (Opcional: podrías ocultarlo para el estado 'loading') */}
      {type !== "loading" && (
        <div className="flex border-l border-gray-200 dark:border-white/10">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};
