// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function Signup() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });

//   const handleSignup = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/register", form);

//       alert("Signup successful ✅");

//       // After signup go to login page
//       navigate("/login");
//     } catch (error) {
//       console.error(error);
//       alert("Signup failed ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-gray-100 to-gray-200">
//       <div className="p-8 bg-white rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
//         {/* Header */}
//         <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 drop-shadow-lg">
//           📝 Signup
//         </h1>

//         {/* Name Input */}
//         <input
//           type="text"
//           placeholder="Name"
//           className="border p-3 mb-4 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         {/* Email Input */}
//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-3 mb-4 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         {/* Password Input */}
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-3 mb-4 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         {/* Role Selector */}
//         <select
//           className="border p-3 mb-6 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//           onChange={(e) => setForm({ ...form, role: e.target.value })}
//         >
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>

//         {/* Signup Button */}
//         <button
//           onClick={handleSignup}
//           className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition flex items-center justify-center gap-2"
//         >
//           🚀 Signup
//         </button>

//         {/* Redirect to Login */}
//         <p className="mt-6 text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert(res.data.message || "Signup successful ✅");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data);

      alert(
        error.response?.data?.message ||
          "Signup failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-gray-100 to-gray-200">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        {/* Header */}
        <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 drop-shadow-lg">
          📝 Signup
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter your name"
          className="border p-3 mb-4 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        {/* Email */}
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

        {/* Password */}
        <input
          type="password"
          placeholder="Enter password"
          className="border p-3 mb-4 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        {/* Role */}
        <select
          className="border p-3 mb-6 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
          value={form.role}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
        >
          🚀 Signup
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}