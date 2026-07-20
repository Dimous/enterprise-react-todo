import { StrictMode } from "react";
import Application from "./Application";
import ReactDOM from "react-dom/client";
import ServiceLocatorProvider from "./shared/infrastructure/adapter/in/ui/provider/ServiceLocatorProvider";

const
  root = document.getElementById("root");
///
///
if (root) {
  ReactDOM.createRoot(root).render(
    <StrictMode >
      <ServiceLocatorProvider >
        <Application />
      </ServiceLocatorProvider>
    </StrictMode>,
  );
}
