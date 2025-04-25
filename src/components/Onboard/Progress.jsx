import React, { useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function Progress({
  progress,
  setProgress,
  currentPageCompleted,
  setCurrentPageCompleted,
}) {
  const [furthest, setFurthest] = useState(0);
  const canMoveForward = currentPageCompleted || progress < furthest;

  const forward = () => {
    if (canMoveForward) {
      const newProgress = progress + 1;
      setProgress(newProgress);
      if (newProgress > furthest) {
        setCurrentPageCompleted(false);
        setFurthest(newProgress);
      }
    }
  };
  const back = () => {
    setProgress(progress - 1);
  };

  const buttonClass =
    "items-center justify-center flex p-2 transition-all duration-300";

  return (
    <div className="absolute w-full justify-center mx-auto px-8 flex bottom-4 gap-4 items-center">
      {progress >= 1 ? (
        <button
          onClick={back}
          className={[
            buttonClass,
            "bg-blue-300 hover:bg-blue-400 rounded-full cursor-pointer",
          ]}
        >
          <FaAngleLeft size={30} />
        </button>
      ) : (
        <div className="w-16"></div>
      )}
      <div className="flex-grow h-2 mx-4 bg-gray-200 rounded">
        <div
          className="h-full bg-blue-500 rounded"
          style={{ width: `${(progress / 5) * 100}%` }}
        ></div>
      </div>
      {progress != 5 ? (
        <button
          onClick={forward}
          className={[
            buttonClass,
            canMoveForward
              ? "bg-blue-300 hover:bg-blue-400 rounded-full cursor-pointer"
              : "",
          ]}
        >
          <FaAngleRight size={30} />
        </button>
      ) : (
        <div className="w-16"></div>
      )}
    </div>
  );
}
