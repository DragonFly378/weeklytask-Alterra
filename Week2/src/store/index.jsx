import { configureStore } from "@reduxjs/toolkit";
/** Reducer */
import threadsReducer from "./Threads";
import loginReducer from "./Login";
import userReducer from "./User";

export default configureStore({
  reducer: {
    threads: threadsReducer,
    login: loginReducer,
    user: userReducer,
  },
});
