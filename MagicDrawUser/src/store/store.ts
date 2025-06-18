import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import categorySlice from './slices/categorySlice';
import paintingsSlice from './slices/paintingsSlice';
import paintingPaintedSlice from './slices/paintingPaintedSlice';
import colorInstructionsReducer from "./slices/AIinstructionsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice, // Add the auth reducer
    categories: categorySlice, // Add the category reducer
    paintings: paintingsSlice, // Add the paintings reducer
    paintedPaintings: paintingPaintedSlice, // Add the paintingsPainted reducer
    AIcolorInstructions: colorInstructionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;