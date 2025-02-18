import { useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      console.log("frommm storage", storedToken);
      return setToken(storedToken);
    }
    navigate("/login");
  }, []);

  const login = (userData: string) => {
    console.log(userData);
    setToken(userData);
    localStorage.setItem("token", userData);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
