import React, { useState } from "react";
import { FaCouch, FaWalking, FaRunning } from "react-icons/fa";

export default function Activity({
  setCurrentPageCompleted,
  selections,
  setSelections,
}) {
  const [daily_activities, setDailyActivities] = useState({
    activity_level: "sedentary",
    res_training: 0,
    sports_hours: 0,
  });

  setCurrentPageCompleted(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const newValues = { ...daily_activities, [id]: parseInt(value) };
    setDailyActivities(newValues);
    setSelections({ ...selections, daily_activities: newValues });
    console.log(selections);
  };

  const handleClick = (value) => {
    const newValues = { ...daily_activities, activity_level: value };
    setDailyActivities(newValues);
    setSelections({ ...selections, daily_activities: newValues });
    console.log(selections);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold pb-4">
        Let's get some more information on your physical activity!
      </h1>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-1">
          <label htmlFor="res_training">
            How many hours of resistance training do you plan on per week?{" "}
          </label>
          <div className="flex gap-1">
            <input
              onChange={handleChange}
              className="bg-white rounded-sm"
              type="number"
              id="res_training"
              defaultValue={0}
            />
            hours
          </div>
        </div>
        <div className="flex gap-1">
          <label htmlFor="sports_hours">
            How many hours of cardiovascular exercise do you plan on per week?{" "}
          </label>
          <div className="flex gap-1">
            <input
              onChange={handleChange}
              className="bg-white rounded-sm"
              type="number"
              id="sports_hours"
              defaultValue={0}
            />
            hours
          </div>
        </div>
        <div>How would you describe your activity level?</div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => handleClick("sedentary")}
            className={`flex flex-col justify-center items-center w-24 h-32 rounded-md cursor-pointer ${
              daily_activities.activity_level == "sedentary"
                ? "bg-blue-200"
                : "bg-white"
            }`}
          >
            <FaCouch size={40} />
            Low
          </button>
          <button
            onClick={() => handleClick("active")}
            className={`flex flex-col justify-center items-center w-24 h-32 rounded-md cursor-pointer ${
              daily_activities.activity_level == "active"
                ? "bg-blue-200"
                : "bg-white"
            }`}
          >
            <FaWalking size={40} />
            Medium
          </button>
          <button
            onClick={() => handleClick("very active")}
            className={`flex flex-col justify-center items-center w-24 h-32 rounded-md cursor-pointer ${
              daily_activities.activity_level == "very active"
                ? "bg-blue-200"
                : "bg-white"
            }`}
          >
            <FaRunning size={40} />
            High
          </button>
        </div>
      </div>
    </div>
  );
}
