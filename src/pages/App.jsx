import "./App.css";
import { NavLink } from "react-router";

function App() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4">
      <div className="text-3xl font-bold">
        Welcome to the Group 11 Fitness App!
      </div>
      <NavLink
        to={"/onboard"}
        className="bg-blue-300 p-2 rounded-lg font-bold text-xl hover:bg-blue-400 transition-all duration-300"
      >
        Get Started
      </NavLink>
      <div>
        or{" "}
        <NavLink
          className="hover:underline font-semibold p-1 bg-black/10 rounded-sm"
          to={"/login"}
        >
          Log In
        </NavLink>{" "}
        if you've been here before.
      </div>
    </div>
  );
}

export default App;
