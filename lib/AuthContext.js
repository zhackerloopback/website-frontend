import { createContext, useContext, useEffect, useState } from "react";
import api from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // App load hone pe token se user info le aao
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      setLoadingAuth(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
        setUser(null);
      })
      .finally(() => setLoadingAuth(false));
  }, []);

  const login = (token, userData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    setUser(userData || null);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loadingAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
