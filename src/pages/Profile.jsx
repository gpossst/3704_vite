import React from "react";
import { useParams } from "react-router";
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
import { TbNumber100Small, TbNumber50Small } from "react-icons/tb";
import { TbStretching2 } from "react-icons/tb";
import { MdDirectionsBike, MdWaterDrop } from "react-icons/md";
import { FaAppleAlt, FaRunning, FaSwimmer } from "react-icons/fa";
import { IoFootstepsSharp } from "react-icons/io5";
import { BiInjection } from "react-icons/bi";
import { GrYoga } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import Image from "../../public/profile-icon.png";

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const items = [
  { name: "muscle gain", image: <GiGrowth size={40} /> },
  { name: "strength training", image: <GiStrong size={40} /> },
  { name: "powerlifting", image: <GiWeightLiftingUp size={40} /> },
  { name: "bodybuilding", image: <GiMuscleFat size={40} /> },
  { name: "running", image: <FaRunning size={40} /> },
  { name: "cycling", image: <MdDirectionsBike size={40} /> },
  { name: "swimming", image: <FaSwimmer size={40} /> },
  { name: "body recomposition", image: <GiMuscleUp size={40} /> },
  { name: "flexibility & mobility", image: <GiBodyBalance size={40} /> },
  { name: "injury recovery", image: <BiInjection size={40} /> },
  { name: "stress reduction", image: <GiMeditation size={40} /> },
  { name: "improved sleep", image: <GiNightSleep size={40} /> },
  { name: "speed & agility", image: <GiSpeedometer size={40} /> },
  { name: "endurance training", image: <GiHeartBeats size={40} /> },
  { name: "yoga", image: <GrYoga size={40} /> },
  { name: "recovery & relaxation", image: <TbStretching2 size={40} /> },
  { name: "step count", image: <IoFootstepsSharp size={40} /> },
  { name: "hydration", image: <MdWaterDrop size={40} /> },
  { name: "nutrition", image: <FaAppleAlt size={40} /> },
];

const badgeData = [
  {
    name: "streak-100",
    image: <TbNumber100Small size={30} />,
    info: "Log in for 100 days in a row.",
    date: "10/2/2024",
  },
  {
    name: "streak-50",
    image: <TbNumber50Small size={30} />,
    info: "Log in for 50 days in a row.",
    date: "10/2/2024",
  },
];

function Profile() {
  let { userId } = useParams();

  let sampleData = {
    user_name: "Bill Jones",
    location: "Blacksburg",
    join_date: "10/23/2024",
    badges: ["streak-100"],
    goals: {
      objectives: ["speed & agility", "yoga", "nutrition", "hydration"],
      w_direction: "lose",
      w_quantity: 20,
      w_timeline: 5,
      has_dietary_goals: true,
    },
    achievements: [
      {
        icon: <GiMuscleUp />,
        info: "Flat Bench Press Personal Record of 235.",
        date: "2/4/2025",
      },
    ],
  };

  if (userId == "thisIsGarrett") {
    sampleData = {
      user_name: "Garrett Post",
      location: "Blacksburg",
      join_date: "2/7/2025",
      badges: ["streak-50"],
      goals: {
        objectives: [
          "muscle gain",
          "strength training",
          "swimming",
          "nutrition",
        ],
        w_direction: "lose",
        w_quantity: 5,
        w_timeline: 12,
        has_dietary_goals: true,
      },
      achievements: [
        {
          icon: <GiMuscleUp />,
          info: "Flat Bench Press Personal Record of 180.",
          date: "1/12/2025",
        },
        {
          icon: <GiNightSleep />,
          info: "Sleep 8 hours for one week straight.",
          date: "2/23/2025",
        },
      ],
    };
  }

  const filtered = items.filter((object) =>
    sampleData.goals.objectives.includes(object.name)
  );
  const filteredBadges = badgeData.filter((object) =>
    sampleData.badges.includes(object.name)
  );

  return (
    <div className="flex flex-1 flex-col p-4 gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <img src={Image} alt="profile picture" className="w-16 h-16" />
          <div className="flex flex-col">
            <div className="flex text-lg items-center gap-2 font-semibold">
              {sampleData.user_name}{" "}
              <span className="text-sm font-medium text-black/60">
                @{userId}
              </span>
            </div>
            <div className="flex text-black/60 gap-1 items-center">
              <FaLocationDot />
              {sampleData.location}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex justify-end flex-1 gap-2 items-center">
            <div className="text-sm">Join Date:</div>
            <div className="text-lg font-semibold">{sampleData.join_date}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-xl font-bold">
          Goals:
          <div className="flex justify-center gap-2">
            {filtered.map((object) => {
              return (
                <div
                  className="bg-blue-200 p-4 rounded-xl border-2 flex flex-col items-center font-semibold"
                  key={object.name}
                >
                  {object.image}
                  {capitalizeFirstLetter(object.name)}
                </div>
              );
            })}
          </div>
          <div className="font-medium pt-2">
            {sampleData.user_name} wants to {sampleData.goals.w_direction}{" "}
            {sampleData.goals.w_quantity} in {sampleData.goals.w_timeline}{" "}
            months!
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="text-xl font-bold pb-1">Badges:</div>
            <div className="flex items-center gap-2">
              {filteredBadges.map((object) => {
                return (
                  <div
                    key={object.name}
                    className="flex flex-1 bg-blue-200 border-2 rounded-lg items-center justify-between px-2"
                  >
                    {object.image}
                    <div>{object.info}</div>
                    <div>{object.date}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col pt-2">
            <div className="text-xl font-bold pb-1">Achievements:</div>
            <div className="flex items-center gap-2 flex-col flex-1">
              {sampleData.achievements.map((item) => {
                return (
                  <div className="flex flex-1 w-full bg-blue-200 border-2 rounded-lg items-center justify-between px-2">
                    {item.icon}
                    <div>{item.info}</div>
                    <div>{item.date}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
