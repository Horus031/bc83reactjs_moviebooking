import React from "react";
import AuthForm from "./AuthForm";
import { useLocation } from "react-router-dom";

const AuthPage = () => {
  const location = useLocation();

  return (
    <div className="flex items-center justify-center p-4 h-full">
      <AuthForm mode={location.pathname} />
    </div>
  );
};

export default AuthPage;
