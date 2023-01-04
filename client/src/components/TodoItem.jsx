import React from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdModeEdit } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";

export default function TodoItem({ title, isCompleted }) {
  return (
    <div className="flex justify-between items-center  p-2 bg-slate-400 rounded-md mt-6 mx-auto">
      {isCompleted ? (
        <MdCheckBox className="cursor-pointer" />
      ) : (
        <MdCheckBoxOutlineBlank className="cursor-pointer" />
      )}
      <p>{title}</p>
      <div className="flex gap-3">
        <MdModeEdit className="cursor-pointer" />
        <BsTrashFill className="cursor-pointer" />
      </div>
    </div>
  );
}
