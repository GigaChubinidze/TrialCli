import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { logout } = useAuth();

  return (
    <div>
      <header className="header">
        <nav className="nav">
          <strong>TriaCli</strong>
          <NavLink to="/participants">Participants</NavLink>
          <NavLink to="/metrics">Metrics</NavLink>
          <button type="button" className="link-button" onClick={logout}>
            Log out
          </button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
