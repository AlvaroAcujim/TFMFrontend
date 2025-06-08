import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import exerciseTableReducer from './features/exerciseTable/exerciseTableSlice';
import exerciseReducer from "./features/exercise/exerciseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exerciseTable: exerciseTableReducer,
    exercise: exerciseReducer
  },
});