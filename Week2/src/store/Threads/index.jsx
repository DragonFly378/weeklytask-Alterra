import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialValue = [
  {
    id: uuidv4(),
  },
];

export const threadsReducer = createSlice({
  name: "threads",
  initialState: {
    threads: initialValue,
  },
  reducers: {
    submitThread: (state, action) => {
      state.threads = [...state.threads, action.payload];
    },
    handleDelete: (state, action) => {
      state.threads = state.threads.filter(
        (thread) => thread.id !== action.payload
      );
    },
    handleUpdate: (state, action) => {
      state.threads = state.threads.map((thread) => {
        if (thread.id === action.payload) {
          thread.completed = !thread.completed;
        }
        return thread;
      });
    },
  },
});

export const { submitThread, handleDelete, handleUpdate } =
  threadsReducer.actions;

export default threadsReducer.reducer;
