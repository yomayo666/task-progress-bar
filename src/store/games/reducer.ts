import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataObject } from '../../typs/ProgressBar';

interface AppState {
  data: DataObject[];
}

const initialState: AppState = {
  data: [],
};

const appSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<DataObject>) => {
      const existingDataObject = state.data.find((dataObject) => dataObject.name === action.payload.name);
      if (existingDataObject) {
        existingDataObject.thresholdPoints += action.payload.thresholdPoints;
        const existingDataObjectIndex = state.data.indexOf(existingDataObject);
        const newBestResult = action.payload.thresholdPoints;
        const gamesLength = existingDataObject.games.length
        const bestResult = Math.max(existingDataObject.games[gamesLength - 1]?.bestResult || 0, newBestResult)
  
        existingDataObject.games.push({
          name: `Игра ${existingDataObjectIndex + 1}.${gamesLength + 1}`,
          bestResult: bestResult,
          isPlayed: bestResult >= 25,
        });
      } else {
        const newIndex = state.data.length + 1;
        state.data.push({
          ...action.payload,
          games: [
            {
              name: `Игра ${newIndex}.1`,
              bestResult: action.payload.thresholdPoints,
              isPlayed: action.payload.thresholdPoints >= 25 ? true : false,
            },
          ],
        });
      }
    },
  },
});

export const { addData } = appSlice.actions;
export default appSlice.reducer;
