import React from "react";
import { useSelector } from "react-redux";
import cup from "../assets/cup.svg";
import { RootState } from "../store/index";
import "../scss/index.scss";
import ProgressSegment from "./ProgressSegment";
import { getProgressLine, progressSegments } from "./progressUtils";

const ProgressBar: React.FC = () => {
  const gamesData = useSelector((state: RootState) => state.games.data);

  return (
    <div className="progress-bar-container">
      {gamesData?.length > 0 ? (
        gamesData.map(({ thresholdPoints, name}, index) => {
          const progressLine = getProgressLine(thresholdPoints);
          return (
            <div key={index} className="progress-bar-wrapper">
              <div className="name">{name}</div>
              <div
                className="progress-bar"
                style={{
                  background: `linear-gradient(to right, #3300FF ${progressLine}%, transparent ${progressLine}%)`,
                }}
              >
                <img className="cup" src={cup} alt="cup" />
                {progressSegments.map(({ threshold }, index) => (
                  <ProgressSegment key={index} threshold={threshold} totalProgress={thresholdPoints} />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-data">No data available</div>
      )}
    </div>
  );
};

export default ProgressBar;
