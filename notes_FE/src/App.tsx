import { RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes";
import { Toaster } from "sonner";
import setup from "./lib/config/axios-interceptors";
import { ConfirmDialogProvider } from '@omit/react-confirm-dialog'

import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { TooltipProvider } from "./components/ui/tooltip";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      retry: 0
    },
  },
});

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  setup();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <ConfirmDialogProvider>
        <RouterProvider router={router} />
        <Toaster richColors />
        <ReactQueryDevtools initialIsOpen={false} />
      </ConfirmDialogProvider>
      </TooltipProvider>
      
    </QueryClientProvider>
  );
}

export default App;
