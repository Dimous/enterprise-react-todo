import "./Application.css";
import type { JSX } from "react/jsx-runtime";
import TodoListComponent from "./feature/todo/infrastructure/adapter/in/ui/component/TodoListComponent";

export default (): JSX.Element => (
  <div
    className="max-w-xl mx-auto py-10 px-4"
  >
    <h1
      className="text-2xl font-semibold mb-6"
    >Задачи</h1>

    <TodoListComponent />
  </div>
);

