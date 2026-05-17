import { configureStore } from "@reduxjs/toolkit";
import threadsReducer, {
  setCategoryFilter,
  fetchThreads,
  fetchThreadById,
} from "./threadsSlice";
import api from "../../api/dicodingForumAPI";

jest.mock("../../api/dicodingForumAPI");

describe("threads reducers and thunks", () => {
  const makeStore = () =>
    configureStore({ reducer: { threads: threadsReducer } });

  beforeEach(() => jest.clearAllMocks());

  test("setCategoryFilter updates selectedCategory", () => {
    const store = makeStore();
    store.dispatch(setCategoryFilter("Tech"));
    const s = store.getState().threads;
    expect(s.selectedCategory).toBe("Tech");
  });

  test("fetchThreads thunk populates list", async () => {
    const store = makeStore();
    const sample = [
      {
        id: "t1",
        title: "T1",
        body: "B",
        createdAt: new Date().toISOString(),
        ownerId: "u1",
        totalComments: 0,
      },
    ];
    api.get.mockResolvedValueOnce({ data: { data: { threads: sample } } });

    await store.dispatch(fetchThreads());
    const s = store.getState().threads;
    expect(s.list).toHaveLength(1);
    expect(s.categories).toContain("All");
  });

  test("fetchThreadById populates selectedThread", async () => {
    const store = makeStore();
    const detail = {
      id: "t1",
      title: "T1",
      body: "B",
      createdAt: new Date().toISOString(),
      owner: { id: "u1", name: "A" },
      comments: [],
    };
    api.get.mockResolvedValueOnce({ data: { data: { detailThread: detail } } });

    await store.dispatch(fetchThreadById("t1"));
    const s = store.getState().threads;
    expect(s.selectedThread).toBeTruthy();
    expect(s.selectedThread.id).toBe("t1");
  });
});
