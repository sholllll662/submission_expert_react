import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchThreads,
  fetchUsers,
  setCategoryFilter,
  createThread,
} from "../features/threads/threadsSlice";
import ThreadItem from "../components/ThreadItem";
import ThreadForm from "../components/ThreadForm";
import FilterBar from "../components/FilterBar";
import Loading from "../components/Loading";
import "./ThreadsPage.css";

const ThreadsPage = () => {
  const dispatch = useDispatch();
  const {
    list,
    users,
    categories,
    selectedCategory,
    status,
    error,
    actionStatus,
  } = useSelector((state) => state.threads);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredThreads = selectedCategory === "All"
    ? list
    : list.filter((thread) => thread.category === selectedCategory);

  const handleCreateThread = async (data) => {
    try {
      await dispatch(createThread(data)).unwrap();
      await dispatch(fetchThreads());
    } catch (err) {
      // error handled by slice
    }
  };

  const handleCategoryChange = (category) => {
    dispatch(setCategoryFilter(category));
  };

  return (
    <main className="threads-page">
      <div className="threads-header">
        <div>
          <h1>Diskusi Terkini</h1>
          <p>
            Temukan thread terbaru, berikan komentar, dan bangun diskusi yang
            menarik.
          </p>
        </div>
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={handleCategoryChange}
        />
      </div>

      {status === "loading" && <Loading />}
      {status === "failed" && <p className="error-message">{error}</p>}

      <section className="thread-list">
        {filteredThreads.length === 0 && status === "succeeded" && (
          <p>Tidak ada thread pada kategori ini.</p>
        )}
        {filteredThreads.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            author={users.find((user) => user.id === thread.ownerId)}
          />
        ))}
      </section>

      <section className="thread-form-area">
        {auth.token ? (
          <ThreadForm
            onSubmit={handleCreateThread}
            status={actionStatus}
            error={error}
          />
        ) : (
          <div className="login-prompt">
            <h2>Masuk untuk membuat thread</h2>
            <p>
              Login agar dapat membuat diskusi dan berinteraksi dengan komentar.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default ThreadsPage;
