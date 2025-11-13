"use client";

import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-[#7B61FF] to-[#5E3BD3] px-4 pt-24">
      {/* Card */}
      <div className="relative bg-white w-full max-w-sm p-8 rounded-2xl shadow-xl text-center overflow-hidden">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome</h1>
        <p className="text-gray-500 mb-6">Log in to your account or create a new account</p>

        {/* Tabs with sliding underline */}
        <div className="relative flex mb-6 bg-gray-100 rounded-xl shadow-inner overflow-hidden">
          <button onClick={() => setIsLogin(true)} className="w-1/2 py-2 font-medium relative z-10">
            Login
          </button>
          <button onClick={() => setIsLogin(false)} className="w-1/2 py-2 font-medium relative z-10">
            Register
          </button>

          {/* Sliding background */}
          <div className={`absolute top-0 left-0 w-1/2 h-full bg-[#4330a2] rounded-xl transition-all duration-300 ${isLogin ? "translate-x-0" : "translate-x-full"}`} />
          {/* Sliding text color */}
          <div className="absolute top-0 left-0 w-full h-full flex">
            <span className={`w-1/2 text-white text-center py-2 transition-colors duration-300 ${isLogin ? "text-white" : "text-gray-600"}`}>Login</span>
            <span className={`w-1/2 text-center py-2 transition-colors duration-300 ${!isLogin ? "text-white" : "text-gray-600"}`}>Register</span>
          </div>
        </div>

        {/* Conditional Forms */}
        <div className="mb-4">{isLogin ? <LoginForm /> : <RegisterForm />}</div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Button */}
        <button className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  );
}
