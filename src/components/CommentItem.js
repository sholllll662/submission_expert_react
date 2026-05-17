import React from "react";
import { formatDate } from "../utils/date";
import "./CommentItem.css";

const CommentItem = ({ comment }) => (
  <article className="comment-item">
    <div className="comment-owner">
      {comment.owner?.avatar && (
        <img src={comment.owner.avatar} alt={comment.owner.name} />
      )}
      <div>
        <strong>{comment.owner?.name || "Pengguna"}</strong>
        <small>{formatDate(comment.createdAt)}</small>
      </div>
    </div>
    <p>{comment.content}</p>
  </article>
);

export default CommentItem;
