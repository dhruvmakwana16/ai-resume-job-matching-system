// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Upload() {
//   const [file, setFile] = useState(null);
//   const [jobDescription, setJobDescription] = useState("");
//   const navigate = useNavigate();

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please upload resume");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("resume", file);
//     formData.append("jobDescription", jobDescription);

//     try {
//       const res = await axios.post("http://localhost:5000/api/upload", formData);

//       console.log("API Response:", res.data);

//       // Save in localStorage
//       localStorage.setItem("resumeResult", JSON.stringify(res.data.data));

//       // Navigate to result page
//       navigate("/result", {
//         state: { result: res.data.data },
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-100 to-gray-200 p-8">
//       {/* Header */}
//       <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 drop-shadow-lg">
//         📤 Upload Resume + Job Description
//       </h2>

//       {/* Upload Card */}
//       <div className="bg-white shadow-lg p-8 rounded-2xl max-w-2xl mx-auto border border-gray-200">
        
//         {/* File Input */}
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//         />

//         {/* File Preview */}
//         {file && (
//           <p className="text-sm text-gray-600 mb-4">
//             Selected file:{" "}
//             <span className="font-medium text-indigo-600">{file.name}</span>
//           </p>
//         )}

//         {/* Job Description */}
//         <textarea
//           rows="8"
//           placeholder="Paste Job Description here..."
//           value={jobDescription}
//           onChange={(e) => setJobDescription(e.target.value)}
//           className="w-full border p-3 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//         />

//         {/* Upload Button */}
//         <button
//           onClick={handleUpload}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition flex items-center justify-center gap-2"
//         >
//           🚀 Analyze Resume
//         </button>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, FileText, Sparkles, Loader2, X } from "lucide-react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file || !jobDescription) {
      alert("Please provide both a resume and a job description! 🎯");
      return;
    }

    setIsAnalyzing(true); // Start "AI Scanning" animation

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      // Small delay to simulate "AI Thinking" (optional, looks cool)
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      
      localStorage.setItem("resumeResult", JSON.stringify(res.data.data));
      navigate("/result", { state: { result: res.data.data } });
    } catch (err) {
      console.error(err);
      alert("Neural Link Failed ❌ Check your backend.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900 flex items-center justify-center gap-3">
          <Sparkles className="text-indigo-600" /> AI Resume Matcher
        </h2>
        <p className="text-slate-500 mt-2 font-medium">Upload your PDF and let our NLP engine do the heavy lifting.</p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Drag & Drop Area */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Step 1: Your Resume</label>
          <div 
            className={`relative group border-2 border-dashed rounded-[2rem] p-10 transition-all flex flex-col items-center justify-center h-[400px] bg-white
              ${file ? 'border-emerald-400 bg-emerald-50/30' : 'border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/30'}`}
          >
            {!file ? (
              <>
                <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <UploadIcon size={40} />
                </div>
                <p className="text-lg font-bold text-slate-700">Drop your PDF here</p>
                <p className="text-slate-400 text-sm mt-1">or click to browse files</p>
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
              </>
            ) : (
              <div className="text-center">
                <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl mb-4 mx-auto w-fit">
                  <FileText size={40} />
                </div>
                <p className="text-lg font-bold text-slate-800 truncate max-w-[200px]">{file.name}</p>
                <button 
                  onClick={() => setFile(null)}
                  className="mt-4 text-red-500 font-bold text-sm flex items-center gap-1 mx-auto hover:underline"
                >
                  <X size={16} /> Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Job Description */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Step 2: Target Job</label>
          <div className="relative h-[400px]">
            <textarea
              placeholder="Paste the Job Description (JD) here... The AI uses this to calculate your match score."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-full p-6 rounded-[2rem] border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 resize-none shadow-sm text-slate-700 font-medium placeholder:text-slate-300 transition-all"
            />
            <div className="absolute bottom-6 right-6">
              <span className="bg-slate-100 text-slate-500 text-[10px] px-3 py-1 rounded-full font-bold">NLP READY</span>
            </div>
          </div>
        </div>

        {/* Bottom: Action Button */}
        <div className="lg:col-span-2 mt-4">
          <button
            onClick={handleUpload}
            disabled={isAnalyzing}
            className={`w-full py-5 rounded-2xl font-black text-xl tracking-tight transition-all flex items-center justify-center gap-3 shadow-xl
              ${isAnalyzing 
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-200 hover:-translate-y-1'}`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                NEURAL ANALYSIS IN PROGRESS...
              </>
            ) : (
              <>
                <Sparkles size={24} />
                ANALYZE MATCH SCORE
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}