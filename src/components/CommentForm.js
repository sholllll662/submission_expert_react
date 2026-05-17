import React, { useState } from "react";
import "./CommentForm.css";

const CommentForm = ({ onSubmit, status, error }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ content });
    setContent("");
  };

  return (
    <section className="comment-form">
      <h3>Tulis Komentar</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Tulis komentar untuk thread ini"
          rows="4"
          required
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Mengirim..." : "Kirim Komentar"}
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </section>
  );
};

export default CommentForm;
