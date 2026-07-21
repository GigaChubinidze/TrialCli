import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #e2e8f0",
          padding: "1rem",
        }}
      >
        <nav
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "flex",
            gap: "1rem",
          }}
        >
          <strong>TriaCli</strong>
          <NavLink to="/participants">Participants</NavLink>
          <NavLink to="/metrics">Metrics</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
