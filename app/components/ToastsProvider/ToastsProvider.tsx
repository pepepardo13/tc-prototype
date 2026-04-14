import {
  createContext,
  useCallback,
  useContext,
  type PropsWithChildren,
  type ReactNode,
} from "react";

type ToastOptions = {
  message: ReactNode;
  variant?: "info" | "success" | "warning" | "danger";
  duration?: number;
};

type ToastsContextType = {
  addToast: (options: ToastOptions) => void;
};

const ToastsContext = createContext<ToastsContextType>({
  addToast: () => {},
});

export function ToastsProvider({ children }: PropsWithChildren) {
  const addToast = useCallback((_options: ToastOptions) => {
    // No-op in standalone Storybook
  }, []);

  return (
    <ToastsContext.Provider value={{ addToast }}>
      {children}
    </ToastsContext.Provider>
  );
}

export function useToasts() {
  return useContext(ToastsContext);
}
