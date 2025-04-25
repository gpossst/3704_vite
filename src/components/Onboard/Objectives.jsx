import React, { useState } from "react";

import {
  GiWeightLiftingUp,
  GiStrong,
  GiMuscleFat,
  GiGrowth,
  GiBodyBalance,
  GiMeditation,
  GiMuscleUp,
  GiNightSleep,
  GiSpeedometer,
  GiHeartBeats,
} from "react-icons/gi";
import { TbStretching2 } from "react-icons/tb";
import { MdDirectionsBike, MdWaterDrop } from "react-icons/md";
import { FaAppleAlt, FaRunning, FaSwimmer } from "react-icons/fa";
import { IoFootstepsSharp } from "react-icons/io5";
import { BiInjection } from "react-icons/bi";
import { GrYoga } from "react-icons/gr";

export default function Objectives({
  setCurrentPageCompleted,
  selections,
  setSelections,
  objectives,
}) {
  const [selected, setSelected] = useState(objectives);

  const items = [
    { name: "muscle gain", image: <GiGrowth /> },
    { name: "strength training", image: <GiStrong /> },
    { name: "powerlifting", image: <GiWeightLiftingUp /> },
    { name: "bodybuilding", image: <GiMuscleFat /> },
    { name: "running", image: <FaRunning /> },
    { name: "cycling", image: <MdDirectionsBike /> },
    { name: "swimming", image: <FaSwimmer /> },
    { name: "body recomposition", image: <GiMuscleUp /> },
    { name: "flexibility & mobility", image: <GiBodyBalance /> },
    { name: "injury recovery", image: <BiInjection /> },
    { name: "stress reduction", image: <GiMeditation /> },
    { name: "improved sleep", image: <GiNightSleep /> },
    { name: "speed & agility", image: <GiSpeedometer /> },
    { name: "endurance training", image: <GiHeartBeats /> },
    { name: "yoga", image: <GrYoga /> },
    { name: "recovery & relaxation", image: <TbStretching2 /> },
    { name: "step count", image: <IoFootstepsSharp /> },
    { name: "hydration", image: <MdWaterDrop /> },
    { name: "nutrition", image: <FaAppleAlt /> },
  ];

  const isSelected = (itemName) => {
    return selected.includes(itemName);
  };

  const handleClick = (itemName) => {
    let newSelected = selected;
    if (selected.includes(itemName)) {
      newSelected = selected.filter((value) => value !== itemName);
    } else {
      newSelected = [...selected, itemName];
    }

    setSelected(newSelected);
    setSelections({
      ...selections,
      goals: { ...selections.goals, objectives: newSelected },
    });

    if (selected.length > 0) {
      setCurrentPageCompleted(true);
    } else {
      setCurrentPageCompleted(false);
    }
    console.log(selections);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold pb-4">Select your objectives!</h1>
      <div className="grid-cols-5 gap-4 grid">
        {items.map((item, index) => {
          return (
            <div
              className={`flex flex-col w-30 h-30 items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer ${
                isSelected(item.name) ? `bg-blue-200` : `bg-white`
              }`}
              key={index}
              onClick={() => handleClick(item.name)}
            >
              <div className="text-4xl mb-2">{item.image}</div>
              <h3 className="text-sm text-center capitalize">{item.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
