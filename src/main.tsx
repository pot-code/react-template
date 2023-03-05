import { ThemeProvider } from "@emotion/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "./theme";
import App from "./App";
import "./i18n";
import "./main.css";

async function prepare() {
  if (import.meta.env.DEV) {
    await import("./wdyr");
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = createRoot(document.getElementById("root")!);
prepare().then(() =>
  root.render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </QueryClientProvider>
  )
);
