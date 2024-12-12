import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryclient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <StrictMode>
        <QueryClientProvider client={queryclient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>
  </ThemeProvider>
);
