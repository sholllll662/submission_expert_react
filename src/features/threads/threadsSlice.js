import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { setAuthToken } from "../../api/dicodingForumAPI";

const initialState = {
  list: [],
  selectedThread: null,
  users: [],
  categories: ["All"],
  selectedCategory: "All",
  status: "idle",
  selectedStatus: "idle",
  actionStatus: "idle",
  error: null,
};

export const fetchThreads = createAsyncThunk(
  "threads/fetchThreads",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/threads");
      return response.data.data.threads;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchUsers = createAsyncThunk(
  "threads/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");
      return response.data.data.users;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchThreadById = createAsyncThunk(
  "threads/fetchThreadById",
  async (threadId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/threads/${threadId}`);
      return response.data.data.detailThread;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const createThread = createAsyncThunk(
  "threads/createThread",
  async ({ title, body, category }, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    setAuthToken(token);
    try {
      const response = await api.post("/threads", { title, body, category });
      return response.data.data.thread;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const createComment = createAsyncThunk(
  "threads/createComment",
  async ({ threadId, content }, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    setAuthToken(token);
    try {
      const response = await api.post(`/threads/${threadId}/comments`, {
        content,
      });
      return response.data.data.comment;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const selectVotePath = (threadId, commentId, voteType) => {
  if (commentId) {
    if (voteType === 1) return `/threads/${threadId}/comments/${commentId}/up-vote`;
    if (voteType === -1) return `/threads/${threadId}/comments/${commentId}/down-vote`;
    return `/threads/${threadId}/comments/${commentId}/neutral-vote`;
  }
  if (voteType === 1) return `/threads/${threadId}/up-vote`;
  if (voteType === -1) return `/threads/${threadId}/down-vote`;
  return `/threads/${threadId}/neutral-vote`;
};

export const vote = createAsyncThunk(
  "threads/vote",
  async ({ threadId, commentId, voteType }, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    setAuthToken(token);
    try {
      const path = selectVotePath(threadId, commentId, voteType);
      await api.post(path);
      return { threadId, commentId, voteType };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
        const categories = ["All"];
        action.payload.forEach((thread) => {
          if (thread.category && !categories.includes(thread.category)) {
            categories.push(thread.category);
          }
        });
        state.categories = categories;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to load threads";
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to load users";
      })
      .addCase(fetchThreadById.pending, (state) => {
        state.selectedStatus = "loading";
        state.error = null;
      })
      .addCase(fetchThreadById.fulfilled, (state, action) => {
        state.selectedStatus = "succeeded";
        state.selectedThread = action.payload;
      })
      .addCase(fetchThreadById.rejected, (state, action) => {
        state.selectedStatus = "failed";
        state.error = action.payload || "Failed to load thread detail";
      })
      .addCase(createThread.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(createThread.fulfilled, (state) => {
        state.actionStatus = "succeeded";
      })
      .addCase(createThread.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload || "Failed to create thread";
      })
      .addCase(createComment.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.actionStatus = "succeeded";
      })
      .addCase(createComment.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload || "Failed to post comment";
      })
      .addCase(vote.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(vote.fulfilled, (state) => {
        state.actionStatus = "succeeded";
      })
      .addCase(vote.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload || "Failed to vote";
      });
  },
});

export const { setCategoryFilter } = threadsSlice.actions;
export default threadsSlice.reducer;
