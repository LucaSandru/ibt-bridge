import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// SUI dapp-kit (optional if you add Sui wallet integration later)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiProvider } from "./SuiProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiProvider>
        <App />
      </SuiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
