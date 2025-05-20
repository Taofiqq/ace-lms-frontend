// src/lib/auth.ts
import api from "./api";

// Request and response interfaces for type safety
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: {
    email: string;
    role: string;
  };
}

interface RegisterCredentials {
  email: string;
  password: string;
  role: string;
}

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
    createdAt: string;
  };
}

// Login function
export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials);
  return response.data;
};

// Register function
export const register = async (
  credentials: RegisterCredentials
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "/users/register",
    credentials
  );
  return response.data;
};
