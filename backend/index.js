const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config();

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });

app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
  console.error("Error: GEMINI_API_KEY is not set in the .env file.");
  process.exit(1); 
}
const genAI = new GoogleGenerativeAI(geminiApiKey);

// Route to generate tagline
app.post("/api/tagline", async (req, res) => {
  const { companyName, industry } = req.body;

  if (!companyName || !industry) {
    return res
      .status(400)
      .json({ error: "Company name and industry are required." });
  }

  try {
    // Use the Gemini 1.5 Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Define the prompt for the tagline
    const prompt = `Generate a short, catchy, and professional brand tagline for a company named "${companyName}" in the "${industry}" industry. Keep it concise, under 10 words.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const tagline = response.text().trim(); 
    res.json({ tagline });
  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    if (error.response && error.response.status) {
      console.error("Gemini API Response Status:", error.response.status);
      console.error("Gemini API Response Data:", await error.response.text());
    }
    res
      .status(500)
      .json({
        error:
          "Failed to generate tagline with Gemini. Please try again later.",
      });
  }
});

const userRoutes = require("./routes/userRoutes");
const logoRoutes = require("./routes/logoRoutes");

app.use("/api/users", userRoutes);
app.use("/api/generate-logo", logoRoutes);

app.get("/", (req, res) => {
  res.send(" BrandCraft API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}||https://brandcraft-4421.onrender.com`);
});
