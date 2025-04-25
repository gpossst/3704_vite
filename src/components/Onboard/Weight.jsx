import React, { useState } from "react";

export default function Weight({
  setCurrentPageCompleted,
  selections,
  setSelections,
}) {
  const [values, setValues] = useState({
    w_direction: "lose",
    w_quantity: 0,
    w_timeline: 0,
    hasDietaryGoals: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const newValues = { ...values, [id]: value };
    setValues(newValues);
    setSelections({
      ...selections,
      goals: {
        objectives: selections.goals.objectives,
        w_direction: newValues.w_direction,
        w_quantity: parseInt(newValues.w_quantity),
        w_timeline: parseInt(newValues.w_timeline),
        hasDietaryGoals: newValues.hasDietaryGoals,
      },
    });

    if (newValues.w_quantity != 0 && newValues.w_timeline != 0) {
      setCurrentPageCompleted(true);
    } else {
      setCurrentPageCompleted(false);
    }
    console.log(selections);
  };

  const handleClick1 = (value) => {
    const newValues = { ...values, w_direction: value };
    setValues(newValues);
    setSelections({
      ...selections,
      goals: {
        objectives: selections.goals.objectives,
        w_direction: newValues.w_direction,
        w_quantity: parseInt(newValues.w_quantity),
        w_timeline: parseInt(newValues.w_timeline),
        hasDietaryGoals: newValues.hasDietaryGoals,
      },
    });
    console.log(selections);
  };

  const handleClick2 = (value) => {
    const newValues = { ...values, hasDietaryGoals: value };
    setValues(newValues);
    setSelections({
      ...selections,
      goals: {
        objectives: selections.goals.objectives,
        w_direction: newValues.w_direction,
        w_quantity: parseInt(newValues.w_quantity),
        w_timeline: parseInt(newValues.w_timeline),
        hasDietaryGoals: newValues.hasDietaryGoals,
      },
    });
    console.log(selections);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold pb-4">
        Help us learn more about your weight goals!
      </h1>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-4">
          <label htmlFor="age">Do you want to gain or lose weight?</label>
          <button
            className={`cursor-pointer p-2 rounded-sm ${
              values.w_direction == "gain" ? "bg-blue-300" : "bg-white"
            }`}
            onClick={() => {
              handleClick1("gain");
            }}
          >
            Gain
          </button>
          <button
            className={`cursor-pointer p-2 rounded-sm ${
              values.w_direction == "lose" ? "bg-blue-300" : "bg-white"
            }`}
            onClick={() => {
              handleClick1("lose");
            }}
          >
            Lose
          </button>
        </div>
        <div className="flex gap-4">
          <label htmlFor="w_quantity">
            How much weight do you want to {values.w_direction}?
          </label>
          <input
            id="w_quantity"
            type="text"
            className="bg-white rounded-sm"
            onChange={handleChange}
          />
          pounds
        </div>
        <div className="flex gap-4">
          <label htmlFor="w_timeline">
            How long do you want to take to {values.w_direction} that weight?
          </label>
          <input
            id="w_timeline"
            type="text"
            className="bg-white rounded-sm"
            onChange={handleChange}
          />
          months
        </div>
        <div className="flex gap-4">
          <label htmlFor="age">
            Do you want to include dietary goals in your recommendations?
          </label>
          <button
            className={`cursor-pointer p-2 rounded-sm ${
              values.hasDietaryGoals ? "bg-blue-300" : "bg-white"
            }`}
            onClick={() => {
              handleClick2(true);
            }}
          >
            Yes
          </button>
          <button
            className={`cursor-pointer p-2 rounded-sm ${
              !values.hasDietaryGoals ? "bg-blue-300" : "bg-white"
            }`}
            onClick={() => {
              handleClick2(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
