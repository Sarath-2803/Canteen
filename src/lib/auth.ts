import { User } from "./types";

export const getToken = () =>
  localStorage.getItem("token");

export const setToken = (
  token: string
) =>
  localStorage.setItem(
    "token",
    token
  );

export const getStoredUser =
  (): User | null => {
    const user =
      localStorage.getItem("user");

    return user
      ? JSON.parse(user)
      : null;
  };

export const setStoredUser = (
  user: User
) =>
  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isTokenExpired = (
  token: string
) => {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    return (
      payload.exp * 1000 <=
      Date.now()
    );
  } catch {
    return true;
  }
};