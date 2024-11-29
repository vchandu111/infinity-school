import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine, RiUser3Line } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignupResponse {
  success: boolean;
  message: string;
}

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      userName,
      userEmail: email,
      password,
    });

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers,
        body,
      });

      const result: SignupResponse = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success("Signup successful! Please log in.", {
          position: "top-right",
          autoClose: 3000,
        });
        router.push("/login");
      } else {
        toast.error(result.message || "Signup failed", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong, please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
  {/* Toast Container */}
  <ToastContainer />

  {/* Left Side Image Panel */}
  <div className="hidden lg:flex lg:w-3/4 bg-gradient-to-r from-grey-400 via-grey-600 to-gray-900 items-center justify-center p-12">
    <Image
      src="/login.svg"
      alt="signup"
      width={700}
      height={700}
    />
  </div>

  {/* Right Side Signup Form */}
  <div  className="flex w-full lg:w-1/3 items-center justify-center p-8">
    <div className="max-w-md w-full flex flex-col justify-center min-h-screen lg:min-h-0">
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold">Signup</h3>
        <p className="text-gray-400">Create your account to get started</p>
      </div>
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="flex items-center space-x-3 bg-gray-800 border border-gray-700 rounded-md p-3">
          <RiUser3Line className="text-orange-500" size={24} />
          <input
            type="text"
            id="userName"
            name="userName"
            required
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        {/* Email Field */}
        <div className="flex items-center space-x-3 bg-gray-800 border border-gray-700 rounded-md p-3">
          <MdOutlineEmail className="text-orange-500" size={24} />
          <input
            type="email"
            id="email"
            name="email"
            required
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center space-x-3 bg-gray-800 border border-gray-700 rounded-md p-3">
          <RiLockPasswordLine className="text-orange-500" size={24} />
          <input
            type="password"
            id="password"
            name="password"
            required
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </div>

        <div className="flex justify-center">
          <div className="border-t border-gray-600 w-full" />
          <span className="px-3 -mt-2 bg-gray-900 text-gray-400">OR</span>
          <div className="border-t border-gray-600 w-full" />
        </div>

        {/* Redirect to Login */}
        <a
          href="/login"
          className="w-full flex justify-center py-2 px-4 border border-orange-500 rounded-md text-sm font-medium bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Login now
        </a>
      </form>
    </div>
  </div>
</div>

  );
};

export default Signup;
