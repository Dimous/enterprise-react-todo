import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import ServiceLocatorProvider from "./shared/infrastructure/adapter/in/ui/provider/ServiceLocatorProvider";
import ApplicationComponent from "./feature/todo/infrastructure/adapter/in/ui/component/ApplicationComponent";

const
  root = document.getElementById("root");
///
///
if (root) {
  ReactDOM.createRoot(root).render(
    <StrictMode >
      <ServiceLocatorProvider >
        <ApplicationComponent />
      </ServiceLocatorProvider>
    </StrictMode>,
  );
}
