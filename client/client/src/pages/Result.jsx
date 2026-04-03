import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const data =
    location.state?.result ||
    JSON.parse(localStorage.getItem("resumeResult"));

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [candidateName, setCandidateName] = useState("");

const handleUpload = async () => {
  try {
    if (!file) {
      alert("Please select PDF");
      return;
    }

    const userId = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobDescription", jobDescription);
    formData.append("name", candidateName);
    formData.append("userId", userId);

    const res = await axios.post(
      "http://localhost:5000/api/upload",
      formData
    );

    console.log("API Response:", res.data);

    // FIXED HERE
    localStorage.setItem(
      "resumeResult",
      JSON.stringify(res.data.ai_result)
    );

    navigate("/result", {
      state: { result: res.data.ai_result },
    });

  } catch (err) {
    console.error(err);
    alert("Upload failed");
  }
};

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="border p-2"
        />

        <input
          type="text"
          placeholder="Candidate Name"
          value={candidateName}
          onChange={(e) =>
            setCandidateName(e.target.value)
          }
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Enter Job Description"
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
          className="border p-2 rounded w-96 h-32"
        />

        <button
          onClick={handleUpload}
          className="bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Upload Resume
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">
          AI Resume Analyzer
        </h1>

        {/* <ul className="space-y-4">
          <li>📊 Dashboard</li>
          <li>📄 Resume</li>
          <li>📈 Analysis</li>
          <li>⚙ Settings</li>
        </ul> */}
      </div>

      {/* Main */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">
          Resume Analysis Dashboard
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">
              Match Score
            </h2>
            <p className="text-4xl font-bold text-green-600 mt-4">
              {data.match_score}%
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">
              Detected Skills
            </h2>
            <p className="text-2xl font-bold mt-4">
              {data.skills?.length || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">
              Missing Skills
            </h2>
            <p className="text-2xl font-bold text-red-500 mt-4">
              {data.missing_skills?.length || 0}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Skills Found
          </h2>

          <div className="flex flex-wrap gap-3">
            {data.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Missing Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {data.missing_skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}