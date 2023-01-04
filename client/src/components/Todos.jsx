import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { axiosAuth } from "../api/Axios";
import { AuthContext } from "../context/AuthContext";
import TodoItem from "./TodoItem";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getTodos = async () => {
      const res = await axiosAuth.get("/api/v1/todos", {
        headers: {
          authorization: "Bearer" + " " + user.accessToken,
        },
      });
      setTodos((curr) => {
        return [...curr, ...res.data];
      });
    };

    getTodos();
  }, []);
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo.title}
          isCompleted={todo.isCompleted}
        />
      ))}
    </>
  );
}
