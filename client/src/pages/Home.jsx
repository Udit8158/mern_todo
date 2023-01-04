import React from "react";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import Todos from "../components/Todos";

export default function Home() {
  return (
    <div className="w-11/12 mx-auto mt-20 md:w-8/12 lg:w-6/12">
      <TodoForm />
      <Todos />
    </div>
  );
}
