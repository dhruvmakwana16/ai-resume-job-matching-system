import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/candidates");
      setCandidates(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalCandidates = candidates.length;

  const averageScore =
    totalCandidates > 0
      ? (
          candidates.reduce((sum, c) => sum + c.match_score, 0) /
          totalCandidates
        ).toFixed(2)
      : 0;

  const scoreData = candidates.map((candidate) => ({
    name: candidate.name,
    score: candidate.match_score,
  }));

  const skillCount = {};
  candidates.forEach((candidate) => {
    candidate.skills.forEach((skill) => {
      skillCount[skill] = (skillCount[skill] || 0) + 1;
    });
  });

  const pieData = Object.keys(skillCount).map((skill) => ({
    name: skill,
    value: skillCount[skill],
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-100 to-gray-200 p-8">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-700 drop-shadow-lg">
        📈 Analytics Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center">
          <h2 className="text-lg font-semibold text-gray-700">👥 Total Candidates</h2>
          <p className="text-4xl font-bold mt-3 text-indigo-600">{totalCandidates}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center">
          <h2 className="text-lg font-semibold text-gray-700">📊 Average Score</h2>
          <p className="text-4xl font-bold mt-3 text-green-600">{averageScore}%</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-10">
        <h2 className="text-xl font-bold mb-6 text-gray-700">Candidate Scores</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={scoreData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#4F46E5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-700">Skills Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={120} label>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
