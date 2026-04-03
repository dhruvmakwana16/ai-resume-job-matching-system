import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      // Store auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);

      // Redirect based on role
      if (res.data.role === "admin") {
        navigate("/analytics");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.error(error.response?.data);

      alert(
        error.response?.data?.message ||
          "Login failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-gray-100 to-gray-200">
      <div className="p-8 shadow-xl rounded-2xl bg-white w-full max-w-md border border-gray-200">
        {/* Header */}
        <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 drop-shadow-lg">
          🔐 Login
        </h1>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-3 mb-4 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter your password"
          className="border p-3 mb-6 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
        >
          🚀 Login
        </button>

        {/* Signup Link */}
        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}