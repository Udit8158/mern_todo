import React, { useContext } from "react";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { axiosAuth } from "../api/Axios";
import { AuthContext } from "../context/AuthContext";

export default function TodoForm() {
  const [inputData, setInputData] = useState("");
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosAuth.post(
        "/api/v1/todos",
        {
          title: inputData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + user.accessToken,
          },
        }
      );
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="pt-10">
      <form className="flex gap-3" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          className="outline-none border-2 rounded-md w-full p-2 focus:border-blue-600 "
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 p-3 rounded-md hover:bg-blue-400 duration-300"
        >
          <GrAdd />
        </button>
      </form>
      {error && (
        <p className="text-center italic mt-2">Something went wrong.</p>
      )}
    </div>
  );
}
