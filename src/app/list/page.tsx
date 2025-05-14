import { useState } from "react";

interface Todo {
  _id: string;
  text: string;
}

export default function ToDoList({
  setTodos,
  todos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const removeTask = async (id: string) => {
    await fetch(`/api/todos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const updatedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(updatedTodos);
  };

  const editTask = async (id: string) => {
    if (!editingText.trim()) return;
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, text: editingText }),
    });
    const updatedTodo = await res.json();
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    setEditingId(null);
    setEditingText("");
  };

  const handleEditChange = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.key === "Enter") {
      editTask(id);
    }
    if (e.key === "Escape") {
      setEditingId(null);
      setEditingText("");
    }
  };
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex justify-between items-center border-b py-2"
        >
          {editingId === todo._id ? (
            <input
              type="text"
              autoFocus
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onKeyDown={(e) => handleEditChange(e, todo._id)}
              onBlur={() => {
                editTask(todo._id);
              }}
              className="flex-grow border border-gray-300 rounded-md px-2 py-1"
              placeholder="Edit task"
            />
          ) : (
            <span
              onClick={() => {
                setEditingId(todo._id);
                setEditingText(todo.text);
              }}
              className="flex-grow cursor-pointer"
            >
              {todo.text}
            </span>
          )}
          <button
            onClick={() => removeTask(todo._id)}
            className="bg-red-500 text-white px-2 py-1 rounded ms-2"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
