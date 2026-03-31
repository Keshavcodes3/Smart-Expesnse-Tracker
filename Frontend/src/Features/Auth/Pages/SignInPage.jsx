/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Mail, Lock, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
const Input = ({ icon: Icon, placeholder, type = "text",value, onChange }) => (
  <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3 focus-within:bg-white focus-within:ring-2 ring-indigo-500 transition">
    <Icon className="w-4 h-4 text-gray-400" />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-transparent outline-none w-full text-sm"
    />
  </div>
);

const Divider = () => (
  <div className="flex items-center gap-3 my-4">
    <div className="flex-1 h-px bg-gray-200" />
    <span className="text-xs text-gray-400">OR</span>
    <div className="flex-1 h-px bg-gray-200" />
  </div>
);

const Social = ({ text }) => (
  <button className="w-full border border-gray-200 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition">
    {text}
  </button>
);

const Logo = () => (
  <div className="flex items-center gap-2 mb-6">
    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
      <Wallet className="w-5 h-5 text-white" />
    </div>
    <span className="font-semibold text-lg text-gray-800">SmartExpense</span>
  </div>
);

export default function SignInPage() {
  const [firstemail, setfirstemail] = useState('')
  const [password, setpassword] = useState('')
  const {handleLogin} = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault()
      const userData = {
        email: firstemail,
        password: password
      }
      const data = await handleLogin(userData);
      console.log(data);
  }
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left Branding */}
      <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-semibold">SmartExpense</h1>
        </div>

        <div>
          <h2 className="text-3xl font-bold leading-snug">
            Welcome back 👋
            <br /> Manage your finances smarter.
          </h2>
          <p className="text-sm mt-3 text-indigo-100">
            Sign in to continue tracking your expenses.
          </p>
        </div>

        <p className="text-xs text-indigo-200">© 2026 SmartExpense</p>
      </div>

      {/* Right Form */}
      <form onSubmit={(e)=>handleSubmit(e)} className="flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-md">
          <Logo />

          <h2 className="text-2xl font-semibold text-gray-800">
            Sign in to your account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Please enter your details
          </p>

          <div className="mt-6 space-y-3">
            <Input icon={Mail} placeholder="Email address" type="email" value={firstemail} onChange={(e)=>setfirstemail(e.target.value)} />
            <Input icon={Lock} placeholder="Password" type="password" value={password} onChange={(e)=>setpassword(e.target.value)} />

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-indigo-600" />
                Remember me
              </label>
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
              Sign in
            </button>

            <Divider />

            <Social text="Continue with Google" />
            <Social text="Continue with Apple" />
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to={"/signup"}
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
