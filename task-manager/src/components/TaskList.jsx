import { useQuery } from "@apollo/client";
import { GET_ALL_TASKS } from "../graphql/queries";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_TASKS);

  if (loading) {
    return (
      <div className="status">
        <div className="spinner" />
        <p>Загрузка задач...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status error-box">
        <p>Не удалось загрузить задачи: {error.message}</p>
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }

  const tasks = data?.allTasks ?? [];

  if (tasks.length === 0) {
    return <p className="status">Задач пока нет</p>;
  }

  return (
    <ul className="list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
