import { apiFetch } from "./client";
import type { TokenResponse } from "../types/api";

export function login(username: string, password: string): Promise<TokenResponse> {
  return apiFetch<TokenResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}
