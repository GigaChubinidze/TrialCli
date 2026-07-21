import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AuthProvider } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";

describe("LoginPage", () => {
  it("renders sign in form", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "TriaCli" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });
});
