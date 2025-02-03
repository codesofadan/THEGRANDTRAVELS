import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

interface NavigateProviderProps {
  children: ReactNode;
}

const NavigateProvider: React.FC<NavigateProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  return <AuthProvider navigate={navigate}>{children}</AuthProvider>;
};

export default NavigateProvider;