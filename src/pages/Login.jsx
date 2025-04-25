import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";

export default function Login() {
  const inputClass = "bg-background border-b-2 w-full mb-4 h-8 px-2";
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    const url = "https://three704-flask.onrender.com/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log(data);
      if (data.message == "Success!") {
        document.cookie = `user-email=${values.email}; path=/; max-age=86400`;
        return navigate("/dashboard");
      } else {
        alert("There was an error signing you up. Try again");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePassword = (password) => {
    return password.trim().length > 0;
  };

  const submitIfPossible = async () => {
    if (validateEmail(values.email)) {
      if (validatePassword(values.password)) {
        setError("it worked");
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
    console.log(newValues);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="justify-between flex w-full items-center p-4 px-20 font-bold text-2xl absolute top-0">
        <div>Login</div>
        <NavLink
          to={"/"}
          className="font-bold text-lg bg-blue-300 hover:bg-blue-400 p-2 rounded-lg transition-all duration-300"
        >
          Exit
        </NavLink>
      </div>
      <h1 className="text-3xl font-bold pb-4">
        One step between you and your dashboard!
      </h1>
      <div className="flex flex-col w-1/4">
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
        className="bg-blue-300 hover:bg-blue-400 hover:font-bold transition-all text-lg duration-300 px-2 py-1 cursor-pointer rounded-md"
        onClick={submitIfPossible}
      >
        Login
      </button>
    </div>
  );
}
