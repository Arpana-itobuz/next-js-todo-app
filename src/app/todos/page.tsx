import { useState } from "react";

interface Todo {
  _id: string;
  text: string;
}

export default function ToDoInput({
  setTodos,
  todos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
}) {
  const [task, setTask] = useState("");

  const addTask = async () => {
    if (!task.trim()) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: task }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTask("");
  };
  return (
    <div className="flex gap-2 mb-4">
      <input
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
        className="flex-grow border border-gray-300 rounded-md px-3 py-2"
        placeholder="Enter a task"
      />
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
}
