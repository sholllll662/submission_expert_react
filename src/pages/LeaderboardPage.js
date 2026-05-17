import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/dicodingForumAPI";
import Loading from "../components/Loading";
import "./LeaderboardPage.css";

const fetchLeaderboardApi = async () => {
  const res = await api.get("/leaderboards");
  return res.data.data.leaderboards;
};

const LeaderboardPage = () => {
  const {
    data: list = [],
    isLoading,
    isError,
    error,
  } = useQuery(["leaderboard"], fetchLeaderboardApi);

  return (
    <main className="leaderboard-page">
      <header>
        <h1>Leaderboard</h1>
        <p>Pengguna dengan skor tertinggi berdasarkan kontribusi di forum.</p>
      </header>
      {isLoading && <Loading />}
      {isError && (
        <p className="error-message">{error?.message || "Failed to load"}</p>
      )}
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
