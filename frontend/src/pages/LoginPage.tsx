import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { ApiError } from "../api/client";
import { useAuth } from "../context/AuthContext";

function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  return "Something went wrong";
}

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState("researcher");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/participants" replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: "420px", margin: "4rem auto" }}>
        <h1>TriaCli</h1>
        <p className="muted">Clinical trial dashboard login</p>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="error">{error}</p> : null}
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
