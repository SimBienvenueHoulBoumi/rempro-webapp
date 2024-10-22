"use client";

import { useState } from "react";
import HeroSection from "./HeroSection";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthFormSwitcher: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-white to-teal-300 flex items-center justify-center">
      <div className="hero-content flex flex-col lg:flex-row-reverse w-full lg:w-3/4 space-y-8 lg:space-y-0 lg:space-x-10">
        <HeroSection isLogin={isLogin} toggleForm={toggleForm} />

        <div className="relative flex flex-col flex-grow max-w-md w-full p-6 rounded-lg">
          {/* Login Form */}
          <div
            className={`transform transition-all duration-500 ease-in-out ${
              isLogin ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <LoginForm />
          </div>

          {/* Register Form */}
          <div
            className={`absolute inset-0 transform transition-all duration-500 ease-in-out ${
              isLogin
                ? "-translate-y-full opacity-0 pointer-events-none"
                : "translate-y-0 opacity-100"
            }`}
          >
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthFormSwitcher;
