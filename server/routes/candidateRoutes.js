const express = require("express");
const router = express.Router();
const {
  getCandidates,
  getUserCandidates,
} = require("../controllers/candidateController");

router.get("/candidates", getCandidates);
router.get(
  "/candidates/user/:userId",
  getUserCandidates
);


module.exports = router;