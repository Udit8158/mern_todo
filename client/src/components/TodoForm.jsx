import React from "react";
import { GrAdd } from "react-icons/gr";

export default function TodoForm() {
  return (
    <form className="flex gap-3">
      <input
        type="text"
        placeholder="What needs to be done?"
        className="outline-none border-2 rounded-md w-full p-2 focus:border-blue-600 "
      />
      <button
        type="submit"
        className="bg-blue-500 p-3 rounded-md hover:bg-blue-400 duration-300"
      >
        <GrAdd />
      </button>
    </form>
  );
}
