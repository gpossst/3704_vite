import React from "react";
import { useState } from "react";
import Basics from "../components/Onboard/Basics";
import Progress from "../components/Onboard/Progress";
import Objectives from "../components/Onboard/Objectives";
import Weight from "../components/Onboard/Weight";
import Activity from "../components/Onboard/Activity";
import Diet from "../components/Onboard/Diet";
import SignUp from "../components/Onboard/SignUp";
import { NavLink, useNavigate } from "react-router";

export default function Onboard() {
  const [progress, setProgress] = useState(0);
  const [currentPageCompleted, setCurrentPageCompleted] = useState(0);
  const navigate = useNavigate();
  const [selections, setSelections] = useState({
    username: "Ian Rogers",
    password: "ianhealthapp122",
    statistics: {
      age: 22,
      weight: 92,
      height: 195,
    },
    goals: {
      objectives: [],
      w_direction: "lose",
      w_quantity: 5,
      w_timeline: 12,
      has_dietary_goals: true,
    },
    daily_activities: {
      activity_level: "sedentary",
      res_training: 4,
      sports_hours: 8,
    },
    diet_baseline: {
      meals_per_day: 3,
      est_calories: 3000,
      diet_archetype: 2,
    },
  });

  const submit = async () => {
    const url = "https://three704-flask.onrender.com/onboard";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(selections),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return navigate("/login");
      } else {
        alert("There was an error signing you up. Redirecting to home page...");
        return navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Selects the different possible questions based on progress
  const renderPage = () => {
    switch (progress) {
      case 0:
        return (
          <Basics
            selections={selections}
            setSelections={setSelections}
            setCurrentPageCompleted={setCurrentPageCompleted}
          />
        );
      case 1:
        return (
          <Objectives
            selections={selections}
            setSelections={setSelections}
            setCurrentPageCompleted={setCurrentPageCompleted}
            objectives={selections.goals.objectives}
          />
        );
      case 2:
        return (
          <Weight
            selections={selections}
            setSelections={setSelections}
            setCurrentPageCompleted={setCurrentPageCompleted}
          />
        );
      case 3:
        return (
          <Activity
            selections={selections}
            setSelections={setSelections}
            setCurrentPageCompleted={setCurrentPageCompleted}
          />
        );
      case 4:
        return (
          <Diet
            selections={selections}
            setSelections={setSelections}
            setCurrentPageCompleted={setCurrentPageCompleted}
          />
        );
      case 5:
        return (
          <SignUp
            selections={selections}
            setSelections={setSelections}
            setCurrentPageCompleted={setCurrentPageCompleted}
            submit={submit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="text-black relative h-full flex flex-col items-center">
      <div className="justify-between flex w-full items-center p-4 font-bold text-2xl">
        <div>Onboarding</div>
        <NavLink
          to={"/"}
          className="font-bold text-lg bg-blue-300 hover:bg-blue-400 p-2 rounded-lg transition-all duration-300"
        >
          Exit
        </NavLink>
      </div>
      <div className="flex-1 pb-24">{renderPage()}</div>
      <Progress
        progress={progress}
        setProgress={setProgress}
        currentPageCompleted={currentPageCompleted}
        setCurrentPageCompleted={setCurrentPageCompleted}
      />
    </div>
  );
}
