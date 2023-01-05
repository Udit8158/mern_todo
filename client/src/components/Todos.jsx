import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { axiosAuth } from "../api/Axios";
import { AuthContext } from "../context/AuthContext";
import TodoItem from "./TodoItem";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(user);
  useEffect(() => {
    setIsLoading(true);
    const getTodos = async () => {
      try {
        setError(null);
        const res = await axiosAuth.get("/api/v1/todos", {
          headers: {
            authorization: "Bearer" + " " + user.accessToken,
          },
        });
        setIsLoading(false);
        setTodos(res.data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(error.message);
      }
    };

    getTodos();
  }, []);
  return (
    <>
      {isLoading && <p className="text-center italic mt-2">Loading ...</p>}
      {error && (
        <p className="text-center italic mt-2">Something went wrong.</p>
      )}
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          title={todo.title}
          isCompleted={todo.isCompleted}
        />
      ))}
    </>
  );
}
