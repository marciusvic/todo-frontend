import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ContextManager } from "./context/context-manager.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextManager>
      <App />
    </ContextManager>
  </StrictMode>
);
