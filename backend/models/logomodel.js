const mongoose = require("mongoose");

const LogoSchema = new mongoose.Schema({
  prompt: String,
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Logo", LogoSchema);
