const Candidate = require("../models/Candidate");

exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .sort({ match_score: -1 });

    res.json(candidates);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching candidates",
    });
  }
};

exports.getUserCandidates = async (req, res) => {
  try {
    const { userId } = req.params;

    const candidates = await Candidate.find({
      userId,
    }).sort({ createdAt: -1 });

    res.json(candidates);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching user resumes",
    });
  }
};