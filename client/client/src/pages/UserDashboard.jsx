import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDashboard() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchUserResumes();
  }, []);

  const fetchUserResumes = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.get(
        `http://localhost:5000/api/candidates/user/${userId}`
      );

      setResumes(res.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-100 to-gray-200 p-8">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-lg text-center mb-8">
        👤 User Dashboard
      </h1>

      {/* Info Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl mx-auto border border-gray-200 mb-8 text-center">
        <p className="text-lg text-gray-700 font-medium">
          Here you can{" "}
          <span className="text-indigo-600 font-semibold">
            upload
          </span>{" "}
          and{" "}
          <span className="text-indigo-600 font-semibold">
            view resumes
          </span>.
        </p>
      </div>

      {/* Resume History Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold p-6 text-gray-800 border-b">
          📄 My Resume History
        </h2>

        {resumes.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">
            No resumes uploaded yet.
          </p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Score</th>
                <th className="p-4 text-left">Skills</th>
              </tr>
            </thead>

            <tbody>
              {resumes.map((resume) => (
                <tr
                  key={resume._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    {resume.name}
                  </td>

                  <td className="p-4 font-semibold text-indigo-600">
                    {resume.match_score}%
                  </td>

                  <td className="p-4">
                    {Array.isArray(resume.skills)
                      ? resume.skills.join(", ")
                      : "No skills found"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}