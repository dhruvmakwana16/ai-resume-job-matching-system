// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const candidateRoutes = require("./routes/candidateRoutes");
// const authRoutes = require("./routes/authRoutes");

// const app = express();

// // ================= MIDDLEWARE =================
// app.use(cors());
// app.use(express.json());

// // ================= ROUTES =================
// const uploadRoutes = require("./routes/uploadRoutes");
// app.use("/api", uploadRoutes);

// // ================= STATIC FOLDER =================
// // Access uploaded files via: http://localhost:5000/uploads/filename
// app.use("/uploads", express.static("uploads"));

// app.use("/api", candidateRoutes);

// // ================= TEST ROUTE =================
// app.get("/", (req, res) => {
//   res.send("🚀 API is running...");
// });

// app.use("/api/auth", authRoutes);

// // ================= DATABASE =================
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log("❌ DB Error:", err));

// // ================= SERVER =================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const uploadRoutes = require("./routes/uploadRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= STATIC FOLDER =================
app.use("/uploads", express.static("uploads"));

// ================= ROUTES =================
app.use("/api", uploadRoutes);
app.use("/api", candidateRoutes);
app.use("/api/auth", authRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 API is running...",
    status: "success",
  });
});

// ================= DATABASE =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err.message);
  });