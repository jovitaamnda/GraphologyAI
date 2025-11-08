"use client";

import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";


export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#7B61FF] flex flex-col items-center">
      {/* Card */}
      <div className="bg-white mt-16 p-10 rounded-2xl shadow-xl w-[400px] text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome</h1>
        <p className="text-gray-500 mb-6">Log in to your account or create a new account</p>

        {/* Tabs */}
        <div className="flex mb-6 rounded-lg overflow-hidden">
          <button onClick={() => setIsLogin(true)} className={`w-1/2 py-2 font-medium transition-all ${isLogin ? "bg-[#4330a2] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            Login
          </button>
          <button onClick={() => setIsLogin(false)} className={`w-1/2 py-2 font-medium transition-all ${!isLogin ? "bg-[#4330a2] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            Register
          </button>
        </div>

        {/* Conditional Forms */}
        {isLogin ? <LoginForm /> : <RegisterForm />}

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400 text-sm">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Button */}
        <button className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span className="text-gray-600 font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  );
}
