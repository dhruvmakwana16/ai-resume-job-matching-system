import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold tracking-wide text-indigo-400">
        AI Resume System 🚀
      </h1>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/dashboard"
          className="hover:text-indigo-300 transition font-medium"
        >
          Dashboard
        </Link>

        <Link
          to="/user-dashboard"
          className="hover:text-indigo-300 transition font-medium"
        >
          User Dashboard
        </Link>

        <Link
          to="/upload"
          className="hover:text-indigo-300 transition font-medium"
        >
          Upload
        </Link>

        <Link
          to="/recruiter-dashboard"
          className="hover:text-indigo-300 transition font-medium"
        >
          Recruiter Dashboard
        </Link>

        <Link
          to="/analytics"
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
        >
          Analytics
        </Link>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}