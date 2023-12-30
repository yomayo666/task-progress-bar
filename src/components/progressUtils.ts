export interface ProgressSegment {
  label: string;
  threshold: number;
}

export const progressSegments: ProgressSegment[] = [
  { label: "0", threshold: 0 },
  { label: "0-25", threshold: 25 },
  { label: "25-50", threshold: 50 },
  { label: "50-100", threshold: 100 },
  { label: "100-200", threshold: 200 },
  { label: "200-500", threshold: 500 },
  { label: "500-1000", threshold: 1000 },
];

export const getProgressLine = (totalProgress: number): number => {
  let progressPercentage: number = 0;
  const totalSegments = progressSegments.length;
  const partOfDevice: number = 100 / (totalSegments - 1);

  for (let i = 1; i < totalSegments; i++) {
    const { threshold } = progressSegments[i];

    if (totalProgress > threshold) {
      progressPercentage += partOfDevice;
    } else {
      const onePercentOfStep = partOfDevice / (threshold - progressSegments[i - 1].threshold);
      const way = totalProgress - progressSegments[i - 1].threshold;
      progressPercentage += onePercentOfStep * way;
      break;
    }
  }

  return progressPercentage;
};

export const getStarClasses = (threshold: number, totalProgress: number): string => {
  return totalProgress >= threshold ? "active" : "";
};