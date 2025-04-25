import React, { useState } from "react";

export default function SignUp({ selections, setSelections, submit }) {
  const inputClass = "bg-background border-b-2 w-full mb-4 h-8 px-2";
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePassword = (password) => {
    return password.trim().length > 0;
  };

  const submitIfPossible = () => {
    if (validateEmail(values.email)) {
      if (validatePassword(values.password)) {
        setError("");
        submit();
      } else {
        setError("invalid password");
      }
    } else {
      setError("invalid email");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const newValues = { ...values, [id]: value };
    setValues(newValues); // Set local state
    setSelections({
      ...selections,
      username: newValues.email,
      password: newValues.password,
    });
    console.log(newValues);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold pb-4">Let's finalize things!</h1>
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-start">
          <label className="font-semibold" htmlFor="email">
            Email:{" "}
          </label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            placeholder="example@real.com"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <label className="font-semibold" htmlFor="password">
            Password:{" "}
          </label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            placeholder="•••••••••"
            className={inputClass}
          />
        </div>
      </div>
      {error != "" ? <div>{error}</div> : null}
      <button
        className="bg-blue-300 hover:bg-blue-400 hover:font-bold transition-all duration-300 px-2 py-1 cursor-pointer rounded-md"
        onClick={submitIfPossible}
      >
        Submit
      </button>
    </div>
  );
}
