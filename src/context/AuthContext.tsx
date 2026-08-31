import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


type User = {
  userId: number;
  customerId: number;
  firstName: string;
  lastName: string;
  address: string;
  postalCode: number;
  city: string;
  role: string;
  email:string;
  phone: number
  exp: number;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {


  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded: User = jwtDecode(storedToken);
        setToken(storedToken);
        setUser(decoded);
      } catch {
        localStorage.removeItem("token");
      }
    }

    setIsAuthLoading(false);
  }, []);

  const login = (token: string) => {
    const decoded: User = jwtDecode(token);

    localStorage.setItem("token", token);
    setToken(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isLoggedIn, isAuthLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
