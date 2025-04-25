import React, { useState } from "react";

export default function Basics({
  selections,
  setSelections,
  setCurrentPageCompleted,
}) {
  const [statistics, setStatistics] = useState({
    age: 0,
    weight: 0,
    height: 0,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const newStatistics = { ...statistics, [id]: parseInt(value) };
    setStatistics(newStatistics); // Set local state
    setSelections({ ...selections, statistics: newStatistics }); // Set global state
    if (
      newStatistics.age != 0 &&
      newStatistics.weight != 0 &&
      newStatistics.height != 0
    ) {
      setCurrentPageCompleted(true);
      console.log("Current Page Completed");
    } else {
      setCurrentPageCompleted(false);
      console.log("Current Page Not Completed");
    }
    console.log(selections);
  };

  return (
    <div className="font-bold h-full flex gap-4 flex-col justify-center items-center text-black">
      <h1 className="text-3xl">Give us some basic information!</h1>
      <div className="flex gap-4">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          className="bg-white rounded-sm"
          onChange={handleChange}
        />
        years
      </div>
      <div className="flex gap-4">
        <label htmlFor="height">Height</label>
        <input
          id="height"
          type="number"
          className="bg-white rounded-sm"
          onChange={handleChange}
        />
        inches
      </div>
      <div className="flex gap-4">
        <label htmlFor="weight">Weight</label>
        <input
          id="weight"
          type="number"
          className="bg-white rounded-sm"
          onChange={handleChange}
        />
        pounds
      </div>
    </div>
  );
}
