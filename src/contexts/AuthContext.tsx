"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import { useRouter } from "next/navigation";

import { User } from "@/lib/types";

import {
  getToken,
  setToken,
  clearAuth,
  getStoredUser,
  setStoredUser,
  isTokenExpired,
} from "@/lib/auth";

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;

  login: (
    user: User,
    token: string
  ) => void;

  logout: () => void;

  isAuthenticated: boolean;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  const [token, setJwtToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const logout = useCallback(() => {
    clearAuth();

    setUser(null);
    setJwtToken(null);

    window.dispatchEvent(
      new Event("userChanged")
    );

    router.replace("/login");
  }, [router]);

  const login = useCallback(
    (
      userData: User,
      jwtToken: string
    ) => {
      setStoredUser(userData);
      setToken(jwtToken);

      setUser(userData);
      setJwtToken(jwtToken);

      window.dispatchEvent(
        new Event("userChanged")
      );
    },
    []
  );

  useEffect(() => {
    const storedToken = getToken();

    if (
      !storedToken ||
      isTokenExpired(storedToken)
    ) {

      clearAuth();
      setLoading(false);
      return;
    }

    const storedUser =
      getStoredUser();

    setJwtToken(storedToken);
    setUser(storedUser);

    setLoading(false);
  }, []);

  // useEffect(() => {
  //   if (!token) return;

  //   const payload = JSON.parse(
  //     atob(token.split(".")[1])
  //   );

  //   const expiresAt =
  //     payload.exp * 1000;

  //   const remaining =
  //     expiresAt - Date.now();

  //   if (remaining <= 0) {
  //     logout();
  //     return;
  //   }

  //   const MAX_TIMEOUT = 2147483647;

  //   const timer = setTimeout(
  //     logout,
  //     Math.min(remaining, MAX_TIMEOUT)
  //   );

  //   return () =>
  //     clearTimeout(timer);
  // }, [token, logout]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,

      login,
      logout,

      isAuthenticated:
        !!user && !!token,
    }),
    [
      user,
      token,
      loading,
      login,
      logout,
    ]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}