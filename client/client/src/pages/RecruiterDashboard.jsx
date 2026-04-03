// import { useState } from "react";

// export default function RecruiterDashboard() {
//   const [candidates, setCandidates] = useState([
//     {
//       name: "Dhruv Makwana",
//       score: 85,
//       skills: ["react", "node", "mongodb"],
//       status: "Pending",
//     },
//     {
//       name: "Rahul Patel",
//       score: 72,
//       skills: ["react", "javascript"],
//       status: "Pending",
//     },
//     {
//       name: "Priya Shah",
//       score: 91,
//       skills: ["python", "react", "mongodb"],
//       status: "Pending",
//     },
//   ]);

//   const shortlistCandidate = (index) => {
//     const updated = [...candidates];
//     updated[index].status = "Shortlisted";
//     updated.sort((a, b) => b.score - a.score);
//     setCandidates(updated);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-100 to-gray-200 p-8">
//       {/* Header */}
//       <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-700 drop-shadow-lg">
//         📊 Recruiter ATS Dashboard
//       </h1>

//       {/* Table Card */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
//         <table className="w-full text-left">
//           <thead className="bg-indigo-100 text-indigo-700">
//             <tr>
//               <th className="p-4 font-semibold">Rank</th>
//               <th className="p-4 font-semibold">Candidate</th>
//               <th className="p-4 font-semibold">Score</th>
//               <th className="p-4 font-semibold">Skills</th>
//               <th className="p-4 font-semibold">Status</th>
//               <th className="p-4 font-semibold">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {candidates
//               .sort((a, b) => b.score - a.score)
//               .map((candidate, index) => (
//                 <tr
//                   key={index}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="p-4 font-bold text-gray-700">#{index + 1}</td>
//                   <td className="p-4 font-medium text-gray-800">{candidate.name}</td>
//                   <td className="p-4 text-green-600 font-semibold">{candidate.score}%</td>
//                   <td className="p-4">
//                     <div className="flex flex-wrap gap-2">
//                       {candidate.skills.map((skill, i) => (
//                         <span
//                           key={i}
//                           className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
//                         candidate.status === "Shortlisted"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {candidate.status}
//                     </span>
//                   </td>
//                   <td className="p-4">
//                     <button
//                       onClick={() => shortlistCandidate(index)}
//                       className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition"
//                     >
//                       ✅ Shortlist
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }







import { useEffect, useState } from "react";
import axios from "axios";

export default function RecruiterDashboard() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/candidates"
      );

      // Add default status if missing
      const updatedCandidates = res.data.map(
        (candidate) => ({
          ...candidate,
          status: candidate.status || "Pending",
        })
      );

      setCandidates(updatedCandidates);

    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const shortlistCandidate = (index) => {
    const updated = [...candidates];

    updated[index].status = "Shortlisted";

    // Sort by score descending
    updated.sort(
      (a, b) =>
        b.match_score - a.match_score
    );

    setCandidates(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-100 to-gray-200 p-8">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-700">
        📊 Recruiter ATS Dashboard
      </h1>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="p-4 font-semibold">
                Rank
              </th>
              <th className="p-4 font-semibold">
                Candidate
              </th>
              <th className="p-4 font-semibold">
                Score
              </th>
              <th className="p-4 font-semibold">
                Skills
              </th>
              <th className="p-4 font-semibold">
                Status
              </th>
              <th className="p-4 font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {candidates
              .sort(
                (a, b) =>
                  b.match_score -
                  a.match_score
              )
              .map(
                (candidate, index) => (
                  <tr
                    key={candidate._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-bold text-gray-700">
                      #{index + 1}
                    </td>

                    <td className="p-4 font-medium text-gray-800">
                      {candidate.name}
                    </td>

                    <td className="p-4 text-green-600 font-semibold">
                      {
                        candidate.match_score
                      }
                      %
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills?.map(
                          (
                            skill,
                            i
                          ) => (
                            <span
                              key={i}
                              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          )
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          candidate.status ===
                          "Shortlisted"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {
                          candidate.status
                        }
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          shortlistCandidate(
                            index
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                        ✅ Shortlist
                      </button>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}