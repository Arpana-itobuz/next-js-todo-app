"use client";
import { useEffect, useState } from "react";
import ToDoInput from "./todos/page";
import ToDoList from "./list/page";

interface Todo {
  _id: string;
  text: string;
}

const Page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  return (
    <>
      <main className="p-5 inset-0 mx-auto md:w-[75vh]">
        <div className="flex justify-end p-2"></div>
        <h1 className="font-bold text-2xl flex flex-col justify-center items-center border-b my-5 py-5 border-gray-600 ">
          TODO APP
        </h1>
        <ToDoInput setTodos={setTodos} todos={todos} />
        <ToDoList setTodos={setTodos} todos={todos} />
      </main>
    </>
  );
};

export default Page;
