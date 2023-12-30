import React from "react";
import StarIcon from "../assets/StarIcon";
import { getStarClasses } from "./progressUtils";
interface ProgressSegmentProps {
  threshold: number;
  totalProgress: number;
}

const ProgressSegment: React.FC<ProgressSegmentProps> = ({ threshold, totalProgress }) => (
  <div className="progress-segment">
    <div className={`stars ${getStarClasses(threshold, totalProgress)}`}>
      <StarIcon className="star-icon" />
    </div>
    <div className="progress-number">{threshold}</div>
  </div>
);

export default ProgressSegment;