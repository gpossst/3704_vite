import React, { useState } from "react";
import {
  FaLeaf,
  FaCheese,
  FaBreadSlice,
  FaStarOfDavid,
  FaDrumstickBite,
  FaBacon,
} from "react-icons/fa";
import { LuNutOff } from "react-icons/lu";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";

export default function Diet({
  setCurrentPageCompleted,
  selections,
  setSelections,
}) {
  const [values, setValues] = useState({
    meals_per_day: 0,
    est_calories: 0,
    diet_archetype: 0,
  });

  const isSelected = (value) => {
    return value == values.diet_archetype;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const newValues = { ...values, [id]: parseInt(value) };
    setValues(newValues);
    setSelections({ ...selections, diet_baseline: newValues });
    console.log(selections);

    if (newValues.est_calories != 0 && newValues.meals_per_day != 0) {
      setCurrentPageCompleted(true);
    } else {
      setCurrentPageCompleted(false);
    }
  };

  const handleClick = (value) => {
    const newValues = { ...values, diet_archetype: parseInt(value) };
    setValues(newValues);
    setSelections({ ...selections, diet_baseline: newValues });
    console.log(selections);

    if (newValues.est_calories != 0 && newValues.meals_per_day != 0) {
      setCurrentPageCompleted(true);
    } else {
      setCurrentPageCompleted(false);
    }
  };

  const DIET_OPTIONS = [
    { name: "None", code: 0, icon: <MdOutlineDoNotDisturbAlt /> },
    { name: "Vegetarian", code: 1, icon: <FaLeaf /> },
    { name: "Lactose Intolerant", code: 2, icon: <FaCheese /> },
    { name: "Gluten Intolerant", code: 3, icon: <FaBreadSlice /> },
    { name: "Nut Free", code: 4, icon: <LuNutOff /> },
    { name: "Kosher", code: 5, icon: <FaStarOfDavid /> },
    { name: "Paleo", code: 6, icon: <FaDrumstickBite /> },
    { name: "Keto", code: 7, icon: <FaBacon /> },
  ];

  return (
    <div className="h-full justify-center items-center flex-col flex">
      <h1 className="text-3xl font-bold pb-4">What's your diet like?</h1>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-1">
          <label htmlFor="meals_per_day">
            How many meals do you plan to eat per day?{" "}
          </label>
          <div className="flex gap-1">
            <input
              onChange={handleChange}
              className="bg-white rounded-sm"
              type="number"
              id="meals_per_day"
              defaultValue={0}
            />
            meals
          </div>
        </div>
        <div className="flex gap-1">
          <label htmlFor="est_calories">
            How many calories do you plan to consume per day?{" "}
          </label>
          <div className="flex gap-1">
            <input
              onChange={handleChange}
              className="bg-white rounded-sm"
              type="number"
              id="est_calories"
              defaultValue={0}
            />
            calories
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3 pt-4">
          {DIET_OPTIONS.map((value, index) => {
            return (
              <button
                key={index}
                className={`flex flex-col gap-3 cursor-pointer items-center justify-center p-4 rounded-lg ${
                  isSelected(value.code) ? "bg-blue-200" : "bg-white"
                }`}
                onClick={() => {
                  handleClick(value.code);
                }}
              >
                <div>{value.icon}</div>
                {value.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
