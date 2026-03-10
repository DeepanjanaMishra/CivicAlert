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

  audioUrl: {
    type: String
  },

  emotion: {
    type: String,
    default: "neutral"
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
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;