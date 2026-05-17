import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { loginUser, fetchOwnProfile } from "../features/auth/authSlice";
import "./AuthPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth.token && auth.user) {
      navigate("/");
    }
  }, [auth.token, auth.user, navigate]);

  if (auth.token && auth.user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      await dispatch(fetchOwnProfile()).unwrap();
      navigate("/");
    } catch (error) {
      // handled by slice
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
            {auth.status === "loading" ? "Memproses..." : "Login"}
          </button>
          {auth.error && <div className="auth-error">{auth.error}</div>}
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
