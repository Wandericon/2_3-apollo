import { useMutation } from "@apollo/client";
import { COMPLETE_TASK } from "../graphql/mutations";

export default function TaskItem({ task }) {
  const [completeTask, { loading, error }] = useMutation(COMPLETE_TASK, {
    variables: { id: Number(task.id) },
  });

  const handleComplete = async () => {
    try {
      await completeTask();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className={task.completed ? "item done" : "item"}>
      <div className="info">
        <span className="title">{task.title}</span>
        <span className="category">
          {task.category ? task.category.name : "Без категории"}
        </span>
        <span className="state">{task.completed ? "Выполнена" : "В работе"}</span>
        {error && <span className="error">Ошибка: {error.message}</span>}
      </div>
      {!task.completed && (
        <button onClick={handleComplete} disabled={loading}>
          {loading ? "..." : "Выполнить"}
        </button>
      )}
    </li>
  );
}
