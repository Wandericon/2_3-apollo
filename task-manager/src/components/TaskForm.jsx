import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../graphql/mutations";
import { GET_ALL_TASKS } from "../graphql/queries";

export default function TaskForm() {
  const [title, setTitle] = useState("");

  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = title.trim();
    if (!value) return;
    try {
      await createTask({ variables: { title: value } });
      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи"
        disabled={loading}
      />
      <button type="submit" disabled={loading || !title.trim()}>
        {loading ? "Добавление..." : "Добавить"}
      </button>
      {error && <p className="error">Не удалось создать задачу: {error.message}</p>}
    </form>
  );
}
