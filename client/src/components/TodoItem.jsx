import React, { useState } from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdModeEdit,
  MdDone,
} from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleComplete } from "../redux/todosSlice";
import { axiosAuth } from "../api/Axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";

export default function TodoItem({ title, isCompleted, id }) {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  // Local state
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(title);

  // Toggle Edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const updateTodoTitle = async () => {
      if (!isEditing) {
        dispatch(editTodo({ id, title: text }));
        await axiosAuth.patch(
          `http://localhost:4000/api/v1/todos/${id}`,
          { title: text },
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
      }
    };

    updateTodoTitle();
  }, [isEditing]);

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

      {!isEditing && <p className={isCompleted ? "font-light" : ""}>{title}</p>}
      {isEditing && (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-transparent outline-none border-0"
        />
      )}

      <div className="flex gap-3">
        {isEditing ? (
          <MdDone className="cursor-pointer" onClick={toggleEdit} />
        ) : (
          <MdModeEdit className="cursor-pointer" onClick={toggleEdit} />
        )}
        <BsTrashFill
          className="cursor-pointer"
          onClick={() => deleteTodoItem(id)}
        />
      </div>
    </div>
  );
}
