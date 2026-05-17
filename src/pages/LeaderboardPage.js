import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboard } from "../features/leaderboard/leaderboardSlice";
import Loading from "../components/Loading";
import "./LeaderboardPage.css";

const LeaderboardPage = () => {
  const dispatch = useDispatch();
  const {
    list = [],
    status,
    error,
  } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLeaderboard());
    }
  }, [dispatch, status]);

  const isLoading = status === "loading";
  const isError = status === "failed";

  return (
    <main className="leaderboard-page">
      <Helmet>
        <title>Leaderboard - Yukdisk</title>
      </Helmet>
      <header>
        <h1>Leaderboard</h1>
        <p>Pengguna dengan skor tertinggi berdasarkan kontribusi di forum.</p>
      </header>
      {isLoading && <Loading />}
      {isError && <p className="error-message">{error || "Failed to load"}</p>}
      <section className="leaderboard-list">
        {list.map((item) => (
          <article key={item.user.id} className="leaderboard-card">
            <div className="leaderboard-user">
              {item.user.avatar && (
                <img src={item.user.avatar} alt={item.user.name} />
              )}
              <div>
                <strong>{item.user.name}</strong>
                <span>{item.user.email}</span>
              </div>
            </div>
            <div className="leaderboard-score">{item.score} pts</div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default LeaderboardPage;
