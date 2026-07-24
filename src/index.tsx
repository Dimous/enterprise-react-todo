import ReactDOM from "react-dom/client";
import { StrictMode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ServiceLocatorProvider from "./shared/infrastructure/adapter/in/ui/provider/ServiceLocatorProvider";
import ApplicationComponent from "./feature/todo/infrastructure/adapter/in/ui/component/ApplicationComponent";

const
  root = document.getElementById("root");
///
///
if (root) {
  ReactDOM.createRoot(root).render(
    <StrictMode >
      <ErrorBoundary
        fallback="Ошибка..."
      >
        <Suspense
          fallback="Загрузка..."
        >
          <ServiceLocatorProvider >
            <ApplicationComponent />
          </ServiceLocatorProvider>
        </Suspense>
      </ErrorBoundary>
    </StrictMode>,
  );
}
