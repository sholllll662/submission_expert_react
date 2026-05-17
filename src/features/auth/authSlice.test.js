import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  logout,
  setTokenFromStorage,
  loginUser,
  fetchOwnProfile,
} from "./authSlice";
import api from "../../api/dicodingForumAPI";

jest.mock("../../api/dicodingForumAPI");

describe("auth reducers and thunks", () => {
  const makeStore = () => configureStore({ reducer: { auth: authReducer } });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("logout clears token and user", () => {
    const store = makeStore();
    store.dispatch(setTokenFromStorage("tok-123"));
    store.dispatch(logout());
    const state = store.getState().auth;
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });

  test("setTokenFromStorage sets token", () => {
    const store = makeStore();
    store.dispatch(setTokenFromStorage("tok-abc"));
    const state = store.getState().auth;
    expect(state.token).toBe("tok-abc");
  });

  test("loginUser thunk saves token", async () => {
    const store = makeStore();
    api.post.mockResolvedValue({ data: { data: { token: "tok-login" } } });
    api.get.mockResolvedValue({
      data: { data: { user: { id: "u1", name: "A" } } },
    });

    await store.dispatch(loginUser({ email: "a@a.com", password: "secret" }));
    const state = store.getState().auth;
    expect(state.token).toBe("tok-login");
  });

  test("fetchOwnProfile thunk fills user when token present", async () => {
    const store = makeStore();
    // set token in state
    store.dispatch(setTokenFromStorage("tok-fetch"));
    api.get.mockResolvedValue({
      data: { data: { user: { id: "u2", name: "B" } } },
    });

    await store.dispatch(fetchOwnProfile());
    const state = store.getState().auth;
    expect(state.user).toEqual({ id: "u2", name: "B" });
  });
});
