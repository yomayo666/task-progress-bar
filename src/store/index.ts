import { configureStore } from '@reduxjs/toolkit';
import reducer from './games/reducer';

const store = configureStore({
  reducer: {
    games: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;