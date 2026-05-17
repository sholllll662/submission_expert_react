import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/date";
import "./ThreadItem.css";

const ThreadItem = ({ thread, author }) => {
  const navigate = useNavigate();

  return (
    <div
      className="thread-item"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/threads/${thread.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/threads/${thread.id}`);
        }
      }}
    >
      <div className="thread-item-header">
        <div>
          <h3>{thread.title}</h3>
          <p className="thread-category">{thread.category || "General"}</p>
        </div>
        <span className="thread-comments">{thread.totalComments} komentar</span>
      </div>
      <p className="thread-snippet">
        {thread.body.slice(0, 140)}
        {thread.body.length > 140 ? "…" : ""}
      </p>
      <div className="thread-meta">
        <div className="thread-author">
          {author?.avatar && <img src={author.avatar} alt={author.name} />}
          <div>
            <strong>{author?.name || "Pengguna"}</strong>
            <small>{formatDate(thread.createdAt)}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadItem;
