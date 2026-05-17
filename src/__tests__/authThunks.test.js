import api from "../api/dicodingForumAPI";
import { loginUser } from "../features/auth/authSlice";

jest.mock("../api/dicodingForumAPI");

describe("auth thunks", () => {
  it("loginUser dispatches fulfilled when api succeeds", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    api.post.mockResolvedValue({ data: { data: { token: "tok" } } });

    const thunk = loginUser({ email: "a@b.com", password: "secret" });
    await thunk(dispatch, getState, undefined);

    const fulfilled = dispatch.mock.calls.find(
      (c) => c[0] && c[0].type && c[0].type.endsWith("/fulfilled"),
    );
    expect(fulfilled).toBeTruthy();
  });

  it("loginUser dispatches rejected when api fails", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    api.post.mockRejectedValue(new Error("fail"));

    const thunk = loginUser({ email: "a@b.com", password: "wrong" });
    await thunk(dispatch, getState, undefined);

    const rejected = dispatch.mock.calls.find(
      (c) => c[0] && c[0].type && c[0].type.endsWith("/rejected"),
    );
    expect(rejected).toBeTruthy();
  });
});
