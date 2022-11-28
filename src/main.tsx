import { ThemeProvider } from "@emotion/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import "./i18n";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";

async function prepare() {
  if (import.meta.env.DEV) {
    import("./mocks/browser").then(({ worker }) => {
      worker.start();
    });
  }
}

const queryClient = new QueryClient();
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
