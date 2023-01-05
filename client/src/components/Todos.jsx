import React, { useContext } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosAuth } from "../api/Axios";
import { AuthContext } from "../context/AuthContext";
import { fetchStart, getTodoSuccess, fetchError } from "../redux/todosSlice";
import TodoItem from "./TodoItem";

export default function Todos() {
  // const [todos, setTodos] = useState([]);
  const { user } = useContext(AuthContext);

  const todosState = useSelector((state) => state.todos);
  const { todos, loading, error } = todosState;
  const dispatch = useDispatch();
  console.log(todos);
  // console.log(user);
  useEffect(() => {
    const getTodos = async () => {
      try {
        dispatch(fetchStart());
        const res = await axiosAuth.get("/api/v1/todos", {
          headers: {
            authorization: "Bearer" + " " + user.accessToken,
          },
        });

        dispatch(getTodoSuccess(res.data));
      } catch (error) {
        console.log(error);
        dispatch(fetchError());
      }
    };

    getTodos();
  }, []);

  return (
    <>
      {loading && <p className="text-center italic mt-2">Loading ...</p>}
      {error && (
        <p className="text-center italic mt-2">Something went wrong.</p>
      )}
      {todos.length !== 0 &&
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            title={todo.title}
            isCompleted={todo.completed}
            id={todo._id}
          />
        ))}
    </>
  );
}
