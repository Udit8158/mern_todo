import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AuthForm() {
  const [isRegistered, setIsRegistered] = useState(false);
  const { register, logIn } = useContext(AuthContext);

  // ON submit
  const registerUser = (e) => {
    e.preventDefault();

    const userInputData = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };

    register(userInputData);
  };

  const logInUser = (e) => {
    e.preventDefault();

    const userInputData = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    logIn(userInputData);
  };
  return (
    <form
      className="flex flex-col gap-3 pt-20"
      onSubmit={isRegistered ? logInUser : registerUser}
    >
      <h1 className="text-center font-bold text-2xl">
        {isRegistered ? "Log In" : "Register"}
      </h1>
      {!isRegistered && (
        <input
          type="text"
          placeholder="name"
          className="p-2 outline-none border-2 focus:border-blue-500 rounded-md"
        />
      )}
      <input
        type="email"
        placeholder="email"
        className="p-2 outline-none border-2 focus:border-blue-500 rounded-md"
      />
      <input
        type="password"
        placeholder="password"
        className="p-2 outline-none border-2 focus:border-blue-500 rounded-md"
      />
      {isRegistered && (
        <p className="text-center">
          Don't have an account?{" "}
          <span
            className="underline font-semibold cursor-pointer"
            onClick={() => setIsRegistered(false)}
          >
            Create one
          </span>
        </p>
      )}
      {!isRegistered && (
        <p className="text-center">
          All ready have an account?{" "}
          <span
            className="underline font-semibold cursor-pointer"
            onClick={() => setIsRegistered(true)}
          >
            Log In
          </span>{" "}
        </p>
      )}
      <button
        type="submit"
        className="p-2 bg-blue-600 rounded-md hover:bg-blue-700 duration-300"
      >
        {isRegistered ? "Log In" : "Register"}
      </button>
    </form>
  );
}
