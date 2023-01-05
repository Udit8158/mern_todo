import React from "react";
import TodoForm from "../components/TodoForm";
import Todos from "../components/Todos";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="w-11/12 mx-auto md:w-8/12 lg:w-6/12">
      <button className="p-2 bg-blue-600 rounded-md mt-2" onClick={logout}>
        Log Out
      </button>
      <h1 className="text-center font-bold text-2xl">Welcome {user.name}</h1>
      <TodoForm />
      <Todos />
    </div>
  );
}
