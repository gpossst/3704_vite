import React from "react";
import { TwitterShareButton, ThreadsShareButton, TwitterIcon, ThreadsIcon } from "react-share";

const iconBgStyle = {
  fill: "oklch(0.707 0.165 254.624)", 
};

const ShareButtons = ({ steps }) => {
  return (
    <div className="share-buttons flex gap-1">
      <TwitterShareButton url={" "} title={"Doing " + steps + " steps a day with fitnessapp!"} hashtags={["fitnessapp", "cardio"]}>
        <TwitterIcon size={26} round={true} bgStyle={iconBgStyle}/>
      </TwitterShareButton>

      <ThreadsShareButton url={" "} title={"Doing " + steps + " steps a day with fitnessapp!"}>
        <ThreadsIcon size={26} round={true} bgStyle={iconBgStyle}/>
      </ThreadsShareButton>
    </div>
  );
};

export default ShareButtons;