import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({

  citizenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  complaintText: {
    type: String,
    required: true
  },
  transcription: String,

  audioUrl: {
    type: String,
    default: null
  },

  emotion: {
    type: String,
    default: "neutral"
  },

  emotionConfidence: {
  type: Number,
  default: 0
  },

  urgencyScore: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending"
  },

  assignedAuthority: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  keywords: {
    type: [String],
    default: []
  },

  context: {
    type: String,
    default: "General"
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Low"
  },

  department: {
    type: String,
    default: "General Administration"
  }

}, { timestamps: true });   // automatically adds createdAt & updatedAt


const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;