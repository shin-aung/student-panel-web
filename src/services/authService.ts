import type { AuthResponse, StudentDto, RegisterData } from "../types";

const API_BASE = import.meta.env.VITE_API_URL;

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error((await res.json()).message || "Login failed");
    return res.json() as Promise<AuthResponse>;
  },

  async register(data: Omit<RegisterData, "confirmPassword">): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).message || "Registration failed");
    return res.json() as Promise<AuthResponse>;
  },

  logout(): void {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("student");
  },

  getToken(): string | null {
    return localStorage.getItem("jwt_token");
  },

  getStudent(): StudentDto | null {
    return JSON.parse(localStorage.getItem("student") || "null") as StudentDto | null;
  },
};