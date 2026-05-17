import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import threadsReducer from "../features/threads/threadsSlice";
import leaderboardReducer from "../features/leaderboard/leaderboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    leaderboard: leaderboardReducer,
  },
});

export default store;
