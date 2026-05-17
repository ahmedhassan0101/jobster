// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import App from '@/app/App';
import "normalize.css";
import "./index.css";

const rootElement = document.getElementById("root");

// Fail loudly during development if the mount point is missing
// rather than a silent null crash
if (!rootElement) {
  throw new Error("Root element #root not found in index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
