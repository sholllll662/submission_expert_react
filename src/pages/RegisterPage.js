import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";
import "./AuthPage.css";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      navigate("/login");
    } catch (error) {
      // handled by slice
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Daftar</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Nama
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
            />
          </label>
          <label>
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              minLength="6"
              required
            />
          </label>
          <button type="submit" disabled={auth.status === "loading"}>
            {auth.status === "loading" ? "Memproses..." : "Daftar"}
          </button>
          {auth.error && <div className="auth-error">{auth.error}</div>}
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;
