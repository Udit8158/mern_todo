import React from "react";
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";

export default function Home() {
  return (
    <div className="w-11/12 mx-auto mt-20 md:w-8/12 lg:w-6/12">
      <TodoForm />
      <Todo />
    </div>
  );
}
