import React, { useState, useEffect } from "react";
import { BarChart, PieChart, LineChart } from "@mui/x-charts";
import { IoMdTime, IoMdAnalytics } from "react-icons/io";
import { BiEdit, BiHome } from "react-icons/bi";
import ShareButtons from "../components/ShareButtons";
import { useNavigate } from "react-router";
import getCookie from "../utils/cookies";

const defaultData = {
  emphasis: {
    // relative importance of each section
    diet: 0.32,
    activity: 0.45,
    training: 0.23,
  },
  diet: {
    // gives a lower/higher calorie target depending on what is desired
    TDEE: 3100,
    calories_target: 2500,
    quality:
      "if scored poorly on diet quality, this will be a short paragraph explaining what foods the user should opt for",
  },
  activity: {
    // some general activity goals if "lifestyle" selected under objectives
    steps_target: 10000,
    sports_activity_hrs_target: 8,
  },
  training: {
    // get a seperate section under training for each "objective" specified by user
    muscle: {
      "days/wk": 4,
      intensity: 8,
      routine: {
        name: "upper/lower split",
        details: "paragraph explaining a bit with a link to actual program",
      },
    },
    cardio: {
      "days/wk": 3,
      intensity: 4,
      ideas:
        "short paragraph describing some low impact forms of cardio depending on desired intensity",
    },
  },
  calorie_history: [
    { date: "4/20/2025", amount: 1800 },
    { date: "4/21/2025", amount: 2100 },
    { date: "4/22/2025", amount: 2300 },
    { date: "4/23/2025", amount: 1700 },
  ],
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedObjective, setSelectedObjective] = useState(null); // used to show the different objective data
  const [selectedName, setSelectedName] = useState(null);
  const [todayCalories, setTodayCalories] = useState(0);
  const [testData, setTestData] = useState(defaultData);
  const [canTrackToday, setCanTrackToday] = useState(
    !testData.calorie_history.some((entry) => {
      entry.date === new Date().toLocaleDateString("en-US");
    })
  );
  const [popupText, setPopupText] = useState("");

  const buttonData = [
    { name: "Muscle", data: testData.training.muscle },
    { name: "Cardio", data: testData.training.cardio },
  ];

  const getData = async () => {
    const userEmail = getCookie("user-email");
    const url = "https://three704-flask.onrender.com/dashboard";
    try {
      console.log(userEmail);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ username: userEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log(data);
      setTestData(data.data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCalorieChange = (event) => {
    const value = event.target.value;
    setTodayCalories(value);
  };

  const handleSubmitCalories = async () => {
    const userEmail = getCookie("user-email");
    const url = "https://three704-flask.onrender.com/track";
    try {
      console.log(userEmail);
      await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: userEmail,
          date: new Date().toLocaleDateString(),
          amount: todayCalories,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }

    setTestData({
      ...testData,
      calorie_history: [
        ...testData.calorie_history,
        { date: new Date().toLocaleDateString(), amount: todayCalories },
      ],
    });
    setCanTrackToday(false);
  };

  return (
    <div className="h-full flex flex-col justify-center align-center p-4 gap-4">
      {popupText !== "" && (
        <div className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/10 bg-opacity-50">
          <div className="relative flex flex-col p-6 bg-white rounded-md shadow-xl w-full mx-20">
            <div className="mb-4">
              <p className="text-lg leading-relaxed">{popupText}</p>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-300 hover:bg-blue-400 transition-all duration-300 cursor-pointer text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onClick={() => setPopupText("")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center gap-2 cursor-pointer border-gray-400 hover:bg-gray-300 bg-gray-200 px-2 py-1 rounded-lg transition-all duration-300"
        >
          <BiHome />
          Home
        </button>
        <div className="flex gap-2 items-center">
          <ShareButtons steps={testData.activity.steps_target} />
          <button
            onClick={() => {
              document.cookie = "user-email=; path=/; max-age=0";
              navigate("/");
            }}
            className="flex items-center gap-2 cursor-pointer border-gray-400 hover:bg-gray-300 bg-gray-200 px-2 py-1 rounded-lg transition-all duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="flex flex-[3] gap-4">
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-gray-300 p-4">
          <h1 className="font-extrabold text-xl">Focus</h1>
          <PieChart
            className="self-center pl-20"
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: testData.emphasis.diet,
                    label: "Diet",
                    color: "oklch(0.707 0.165 254.624)",
                  },
                  {
                    id: 1,
                    value: testData.emphasis.activity,
                    label: "Activity",
                    color: "oklch(0.809 0.105 251.813)",
                  },
                  {
                    id: 2,
                    value: testData.emphasis.training,
                    label: "Training",
                    color: "oklch(0.623 0.214 259.815)",
                  },
                ],
              },
            ]}
            slotProps={{
              legend: {
                labelStyle: {
                  fontSize: 12,
                },
                direction: "row",
                position: { vertical: "bottom", horizontal: "right" },
                padding: 10,
              },
            }}
          />
        </div>
        <div className=" flex flex-1 flex-col rounded-lg bg-gray-300 p-4">
          <h1 className="font-extrabold text-xl">Diet</h1>
          <BarChart
            height={150}
            leftAxis={null}
            layout="horizontal"
            slotProps={{
              legend: {
                labelStyle: {
                  fontSize: 12,
                },
              },
            }}
            series={[
              {
                data: [testData.diet.TDEE],
                color: "oklch(0.707 0.165 254.624)", // Semi-transparent color
                label: "TDEE",
              },
              {
                data: [testData.diet.calories_target],
                color: "oklch(0.623 0.214 259.815)", // Semi-transparent color
                label: "Calorie Target",
              },
            ]}
          />
          {testData.diet.quality !== "" && (
            <div className="relative bottom-5 flex-col flex">
              <h3 className="self-start font-semibold text-lg">
                Recommendations:
              </h3>
              <div className="flex gap-2">
                <p className="flex justify-start text-start h-full w-100 overflow-hidden text-ellipsis whitespace-nowrap">
                  {testData.diet.quality}
                </p>
                <span
                  className="hover:text-blue-600 font-semibold cursor-pointer"
                  onClick={() => setPopupText(testData.diet.quality)}
                >
                  Read More
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-[6] gap-4">
        <div className="flex flex-col flex-[2] gap-4">
          <div className="flex flex-1 flex-col rounded-lg bg-gray-300 p-4">
            <h2 className="font-extrabold text-xl">Activity Goals</h2>
            <div>
              <div className="flex justify-between px-8 py-4">
                <div className="font-bold">
                  Steps Target:{" "}
                  <span className="font-medium">
                    {testData.activity.steps_target}
                  </span>
                </div>
                <div className="font-bold">
                  Weekly Exercise Hours:{" "}
                  <span className="font-medium">
                    {testData.activity.sports_activity_hrs_target}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-[4] flex-col rounded-lg bg-gray-300 p-4">
            <div className="flex justify-between items-center">
              <div className="w-52"></div>
              <h2 className="font-extrabold text-xl">Calorie Tracking</h2>
              {canTrackToday ? (
                <div className="flex gap-2">
                  Track Today:
                  <input
                    type="number"
                    className="bg-gray-100 w-20 rounded-lg pl-2"
                    placeholder=""
                    onChange={handleCalorieChange}
                    value={todayCalories}
                  />
                  <button
                    className={`flex items-center justify-center rounded-lg w-6 h-6 ${
                      todayCalories && todayCalories != 0
                        ? "bg-blue-300 hover:bg-blue-400 transition-all duration-300"
                        : ""
                    }`}
                    onClick={handleSubmitCalories}
                  >
                    ✓
                  </button>
                </div>
              ) : (
                <div className="w-52"></div>
              )}
            </div>
            <div>
              <LineChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: testData.calorie_history
                      .sort((a, b) => a.date.localeCompare(b.date))
                      .map((a) => a.date),
                  },
                ]}
                series={[
                  {
                    data: testData.calorie_history
                      .sort((a, b) => a.date.localeCompare(b.date))
                      .map((a) => a.amount),
                  },
                ]}
                height={280}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 rounded-lg bg-gray-300 p-4">
          <h2 className="font-extrabold text-xl">Training Goals</h2>
          <div className="flex justify-start gap-2">
            {buttonData.map((value, index) => {
              return (
                <button
                  className={`rounded-full px-2 py-1 border border-gray-400 hover:bg-gray-300 transition-all duration-300 ${
                    selectedName == value.name ? "bg-blue-400" : "bg-gray-200"
                  }`}
                  key={index}
                  onClick={() => {
                    setSelectedObjective(value.data);
                    setSelectedName(value.name);
                  }}
                >
                  {value.name}
                </button>
              );
            })}
          </div>
          {selectedName == "Muscle" ? (
            <div className="flex flex-col py-2 items-center">
              <div className="flex flex-1 gap-4">
                <div className="bg-gray-100 p-4 rounded-md flex items-center flex-1 flex-col">
                  <IoMdTime />
                  <div>{selectedObjective["days/wk"]} Days per Week</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-md flex items-center flex-1 flex-col">
                  <IoMdAnalytics />
                  <div>{selectedObjective.intensity}/10 Intensity Goal</div>
                </div>
              </div>
              <h3 className="self-start py-2 text-lg font-semibold">
                Routine:{" "}
                {selectedObjective.routine[0].charAt(0).toUpperCase() +
                  selectedObjective.routine[0].slice(1)}
              </h3>
              <p className="h-full justify-start text-start w-100 overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedObjective.routine[1]}
              </p>
              <button
                className="bg-blue-300 hover:bg-blue-400 px-2 py-1 rounded-lg cursor-pointer transition-all druation-300 text-center mt-10"
                onClick={() => setPopupText(selectedObjective.routine[1])}
              >
                Read More
              </button>
            </div>
          ) : selectedName == "Cardio" ? (
            <div className="flex flex-col py-2 items-center">
              <div className="flex flex-1 gap-4">
                <div className="bg-gray-100 p-4 rounded-md flex items-center flex-1 flex-col">
                  <IoMdTime />
                  <div>{selectedObjective["days/wk"]} Days per Week</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-md flex items-center flex-1 flex-col">
                  <IoMdAnalytics />
                  <div>{selectedObjective.intensity}/10 Intensity Goal</div>
                </div>
              </div>
              <h3 className="self-start py-2 text-lg font-semibold">
                Recommendations:
              </h3>
              <p className="text-start max-h-40 overflow-hidden text-ellipsis w-100 whitespace-nowrap">
                {selectedObjective.ideas}
              </p>
              <button
                className="bg-blue-300 hover:bg-blue-400 px-2 py-1 rounded-lg cursor-pointer transition-all druation-300 text-center mt-10"
                onClick={() => setPopupText(selectedObjective.ideas)}
              >
                Read More
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col flex-1">
              Select an objective to see recommendations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
