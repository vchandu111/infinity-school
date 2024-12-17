import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

// Define a type for the API response
interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    user: {
      _id: string;
      userName: string;
      userEmail: string;
    };
  };
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: email,
        password: password,
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:3000/auth/login",
        requestOptions
      );
      const data: LoginResponse = await response.json();

      if (response.ok) {
        toast.success("Login successful!");

        // Save user details and token in localStorage
        if (data.data?.accessToken) {
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("userName", data.data.user.userName);
          localStorage.setItem("userEmail", data.data.user.userEmail);

          console.log("User logged in:", data.data.user);
          router.push("/");
        }
      } else {
        toast.error(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <ToastContainer />
      {/* Left Side Image Panel */}
      <div className="hidden lg:flex w-3/4  items-center justify-center p-12">
        <Image src="/login.svg" alt="login" width={700} height={700} />
      </div>

      {/* Right Side Login Form */}
      <div className="w-full lg:w-1/3 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="mb-4">
            <h3 className="text-2xl font-bold">Login</h3>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-8">
            {/* Email Field */}
            <div className="flex items-center space-x-3 bg-gray-800 border border-gray-700 rounded-md p-3">
              <MdOutlineEmail className="text-orange-500" size={24} />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                placeholder="Email address"
              />
            </div>

            {/* Password Field */}
            <div className="flex items-center space-x-3 bg-gray-800 border border-gray-700 rounded-md p-3">
              <RiLockPasswordLine className="text-orange-500" size={24} />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                placeholder="Password"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            {/* Redirect to Signup */}
            <div className="flex justify-center">
              <div className="border-t border-gray-600 w-full" />
              <span className="px-3 -mt-2 bg-gray-900 text-gray-400">OR</span>
              <div className="border-t border-gray-600 w-full" />
            </div>
            <a
              href="/signup"
              className="w-full flex justify-center py-2 px-4 border border-orange-500 rounded-md text-sm font-medium bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Signup now
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
