import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { EventsProvider } from "./context/EventsContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EventsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EventsProvider>
  </StrictMode>
);
