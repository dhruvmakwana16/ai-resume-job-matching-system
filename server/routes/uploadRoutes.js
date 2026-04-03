// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");

// // ================= MULTER STORAGE CONFIG =================
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // ================= IMPORT CONTROLLERS =================
// const { uploadResume, analyzeResume } = require("../controllers/uploadController");

// // ================= ROUTES =================

// // Upload only
// router.post("/upload", upload.single("resume"), uploadResume);

// // Analyze resume (Node → Python)
// router.post("/analyze", upload.single("resume"), analyzeResume);

// module.exports = router;




const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ ONLY import this
const { uploadResume } = require("../controllers/uploadController");

// ✅ ONLY ONE ROUTE
router.post("/upload", upload.single("resume"), uploadResume);

module.exports = router;