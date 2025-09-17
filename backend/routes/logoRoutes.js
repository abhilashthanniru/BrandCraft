const express = require("express");
const generateSVG = require("../services/generateSVG");

const router = express.Router();

router.post("/", (req, res) => {
  const { companyName, industry, style } = req.body;

  if (!companyName || !industry || !style) {
    return res
      .status(400)
      .json({ error: "Company name, industry, and style are required" });
  }

  try {
    const svg = generateSVG({ companyName, industry, style });
    res.status(200).json({ svg });
  } catch (error) {
    console.error("SVG generation error:", error);
    res.status(500).json({ error: "Failed to generate logo" });
  }
});

module.exports = router;
