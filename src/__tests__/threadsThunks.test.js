import api from "../api/dicodingForumAPI";
import { fetchThreads } from "../features/threads/threadsSlice";

jest.mock("../api/dicodingForumAPI");

describe("threads thunks", () => {
  it("fetchThreads dispatches fulfilled on success", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    const threads = [{ id: "t1" }];
    api.get.mockResolvedValue({ data: { data: { threads } } });

    const thunk = fetchThreads();
    await thunk(dispatch, getState, undefined);

    const fulfilled = dispatch.mock.calls.find(
      (c) => c[0] && c[0].type && c[0].type.endsWith("/fulfilled"),
    );
    expect(fulfilled).toBeTruthy();
  });

  it("fetchThreads dispatches rejected on failure", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    api.get.mockRejectedValue(new Error("error"));

    const thunk = fetchThreads();
    await thunk(dispatch, getState, undefined);

    const rejected = dispatch.mock.calls.find(
      (c) => c[0] && c[0].type && c[0].type.endsWith("/rejected"),
    );
    expect(rejected).toBeTruthy();
  });
});
