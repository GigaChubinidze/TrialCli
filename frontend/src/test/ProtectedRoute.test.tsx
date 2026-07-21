import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

function ProtectedScreen() {
  return <div>Protected content</div>;
}

describe("ProtectedRoute", () => {
  it("redirects unauthenticated users to login", () => {
    localStorage.clear();

    render(
      <MemoryRouter initialEntries={["/participants"]}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<div>Login screen</div>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/participants" element={<ProtectedScreen />} />
            </Route>
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText("Login screen")).toBeInTheDocument();
  });
});
