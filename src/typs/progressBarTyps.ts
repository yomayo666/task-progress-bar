export interface GameObject {
    name: string;
    isPlayed: boolean;
    bestResult: number;
  }
  
export interface DataObject {
    id: string;
    thresholdPoints: number;
    name: string;
    games: GameObject[];
}