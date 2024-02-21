import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./Features/Task/TaskSlice";

export const store = configureStore({
  reducer: {
    todo: taskReducer,
  },
});
