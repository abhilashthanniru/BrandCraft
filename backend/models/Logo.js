import mongoose from 'mongoose';

const logoSchema = new mongoose.Schema({
  industry: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  style: {
    type: String,
    required: true,
    enum: ['modern', 'classic', 'minimal', 'bold', 'elegant', 'playful']
  },
  colorScheme: {
    primary: String,
    secondary: String,
    accent: String
  },
  font: {
    type: String,
    default: 'Inter'
  },
  icon: {
    type: String,
    required: true
  },
  svgData: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Logo', logoSchema);