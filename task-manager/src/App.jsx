import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  return (
    <div className="container">
      <h1>Менеджер задач</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}
