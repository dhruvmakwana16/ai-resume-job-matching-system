// const axios = require("axios");
// const FormData = require("form-data");
// const fs = require("fs");
// const Candidate = require("../models/Candidate");

// // ================= UPLOAD + ANALYZE + SAVE =================
// exports.uploadResume = async (req, res) => {
//   try {
//     // Check file
//     if (!req.file) {
//       return res.status(400).json({
//         message: "No file uploaded",
//       });
//     }

//     const filePath = req.file.path;
//     const jobDescription =
//       req.body.jobDescription || "";

//     const candidateName =
//       req.body.name || "Unknown Candidate";

//     // Create form data for Python API
//     const formData = new FormData();

//     formData.append(
//       "file",
//       fs.createReadStream(filePath)
//     );

//     formData.append(
//       "job_description",
//       jobDescription
//     );

//     // Send to Python API
//     const response = await axios.post(
//       "http://127.0.0.1:8000/analyze",
//       formData,
//       {
//         headers: formData.getHeaders(),
//       }
//     );

//     const aiResult = response.data;

//     // ================= SAVE TO MONGODB =================
//     const newCandidate = new Candidate({
//       name: candidateName,
//       skills: aiResult.skills,
//       job_skills: aiResult.job_skills,
//       match_score: aiResult.match_score,
//       missing_skills: aiResult.missing_skills,
//     });

//     await newCandidate.save();



    
//     // ================= SEND TO FRONTEND =================
//     res.status(200).json({
//       message:
//         "✅ File uploaded, analyzed & saved successfully",
//       data: aiResult,
//     });

//   } catch (error) {
//     console.error(
//       "❌ Error:",
//       error.response?.data || error.message
//     );

//     res.status(500).json({
//       message: "Error analyzing resume",
//     });
//   }
// };


const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const Candidate = require("../models/Candidate");

// ================= UPLOAD + ANALYZE + SAVE =================
exports.uploadResume = async (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const filePath = req.file.path;
    const jobDescription =
      req.body.jobDescription || "";

    const candidateName =
      req.body.name || "Unknown Candidate";

    const userId =
      req.body.userId || null;

    // Create form data for Python API
    const formData = new FormData();

    formData.append(
      "file",
      fs.createReadStream(filePath)
    );

    formData.append(
      "job_description",
      jobDescription
    );

    // Send file to Python AI API
    const response = await axios.post(
      "http://127.0.0.1:8000/analyze",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    const aiResult = response.data;

    // ================= SAVE TO MONGODB =================
    const newCandidate = new Candidate({
      userId: userId,
      name: candidateName,
      skills: aiResult.skills,
      job_skills: aiResult.job_skills,
      match_score: aiResult.match_score,
      missing_skills: aiResult.missing_skills,
    });

    await newCandidate.save();

    // ================= SEND TO FRONTEND =================
    res.status(200).json({
      message:
        "✅ File uploaded, analyzed & saved successfully",
      data: aiResult,
    });

  } catch (error) {
    console.error(
      "❌ Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Error analyzing resume",
    });
  }
};