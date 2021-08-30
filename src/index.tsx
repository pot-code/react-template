import { ThemeProvider } from "@emotion/react";
import i18n from "i18next";
import React from "react";
import ReactDOM from "react-dom";
import { initReactI18next } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";

i18n.use(initReactI18next).init({
  resources: {
    zh: {
      translation: {},
    },
  },
  lng: "zh",
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

const queryClient = new QueryClient();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
