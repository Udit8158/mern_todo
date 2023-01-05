import React from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdModeEdit } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleComplete } from "../redux/todosSlice";
import { axiosAuth } from "../api/Axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function TodoItem({ title, isCompleted, id }) {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  // Toggle completed tasks
  const updateCompletedTask = async (id) => {
    dispatch(toggleComplete({ id }));

    const res = await axiosAuth.patch(
      `http://localhost:4000/api/v1/todos/${id}`,
      { completed: "true" },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
  };
  const updateNotCompletedTask = async (id) => {
    dispatch(toggleComplete({ id }));

    const res = await axiosAuth.patch(
      `http://localhost:4000/api/v1/todos/${id}`,
      { completed: "false" },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
  };

  // Delete todo
  const deleteTodoItem = async (id) => {
    dispatch(deleteTodo({ id }));

    const res = await axiosAuth.delete(
      `http://localhost:4000/api/v1/todos/${id}`,

      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
  };

  return (
    <div className="flex justify-between items-center   p-2 bg-slate-400 rounded-md mt-6 mx-auto">
      {isCompleted ? (
        <MdCheckBox
          className="cursor-pointer"
          onClick={() => updateNotCompletedTask(id)}
        />
      ) : (
        <MdCheckBoxOutlineBlank
          className="cursor-pointer"
          onClick={() => updateCompletedTask(id)}
        />
      )}

      <p>{title}</p>

      <div className="flex gap-3">
        <MdModeEdit className="cursor-pointer" />
        <BsTrashFill
          className="cursor-pointer"
          onClick={() => deleteTodoItem(id)}
        />
      </div>
    </div>
  );
}
