import React, { useState } from "react";
import "./ThreadForm.css";

const ThreadForm = ({ onSubmit, status, error }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("General");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, body, category });
    setTitle("");
    setBody("");
    setCategory("General");
  };

  return (
    <section className="thread-form">
      <h2>Buat Thread Baru</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Judul
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Judul thread"
            required
          />
        </label>
        <label>
          Isi Thread
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Ceritakan topik diskusi Anda"
            rows="5"
            required
          />
        </label>
        <label>
          Kategori
          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="General"
          />
        </label>
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Mengirim..." : "Buat Thread"}
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </section>
  );
};

export default ThreadForm;
