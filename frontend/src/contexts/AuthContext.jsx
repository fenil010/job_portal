import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

const STORAGE_KEY = "jp_auth";

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load auth from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setAuth(JSON.parse(stored));
            }
        } catch (err) {
            console.error("Invalid auth storage", err);
            localStorage.removeItem(STORAGE_KEY);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 🔐 REAL LOGIN (Django)
const login = useCallback(async (username, password) => {
  // 1️⃣ Login to get tokens
  const response = await api.post("/auth/login/", {
    username,
    password,
  });

  const access = response.data.access;
  const refresh = response.data.refresh;

  localStorage.setItem("access_token", access);

  // 2️⃣ Fetch current user info (role, email, etc.)
  const meResponse = await api.get("/auth/me/");

  const authData = {
    access,
    refresh,
    user: meResponse.data, // 👈 THIS FIXES EVERYTHING
  };

  setAuth(authData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));

  return authData;
}, []);



    const logout = useCallback(() => {
        setAuth(null);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem("access_token");
    }, []);

    // Keep axios token in sync
    useEffect(() => {
        if (auth?.access) {
            localStorage.setItem("access_token", auth.access);
        } else {
            localStorage.removeItem("access_token");
        }
    }, [auth]);

const value = useMemo(
  () => ({
    user: auth?.user || null,   // 👈 IMPORTANT
    isAuthenticated: !!auth,
    isLoading,
    login,
    logout,
  }),
  [auth, isLoading, login, logout]
);


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
}

export default AuthContext;
