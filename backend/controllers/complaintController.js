// Create Complaint (Citizen)
import Complaint from "../models/Complaint.js";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import {
  extractKeywords,
  detectContext,
  calculateUrgency,
  getPriority,
  assignDepartment
} from "../utils/analyzer.js";
import { getEmotionFromAudio } from "../utils/emotionService.js";

export const createComplaint = async (req, res) => {
  try {
    const citizenId = req.user.id;

    // ✅ Step 1: take text safely
    let text = req.body.complaintText || "";

    let transcription = null;

    // 🎤 Step 2: If audio → get transcription
    if (req.file) {
      try {
        const formData = new FormData();
        formData.append("audio", fs.createReadStream(req.file.path));

        const response = await axios.post(
          "http://127.0.0.1:5001/transcribe",
          formData,
          {
            headers: formData.getHeaders(),
            timeout: 60000
          }
        );

        transcription = response.data.text;

        console.log("🧠 Transcription:", transcription);

        // ✅ IMPORTANT: override text
        if (transcription) {
          text = transcription;
        }

      } catch (err) {
        console.error("❌ Whisper Error:", err.message);
      }
    }

    // 🚨 Step 3: Validate text
    if (!text || text.trim() === "") {
      return res.status(400).json({
        message: "Complaint text is required (text or audio)"
      });
    }

    // 🔥 Step 4: Run AI pipeline (NOW SAFE)
    const keywords = extractKeywords(text);
    const context = detectContext(keywords);
    const urgencyScore = calculateUrgency(text, keywords);
    const priority = getPriority(urgencyScore);
    const department = assignDepartment(context);

    // 🔥 Step 5: Emotion detection
    let emotion = "neutral";
    let emotionConfidence = 0;

    if (req.file) {
      const result = await getEmotionFromAudio(req.file.path);
      emotion = result.emotion;
      emotionConfidence = result.confidence;
    }

    // 💾 Step 6: Save
    const complaint = new Complaint({
      citizenId,
      complaintText: text,
      audioUrl: req.file ? req.file.path : null,
      transcription,

      keywords,
      context,
      urgencyScore,
      priority,
      department,

      emotion,
      emotionConfidence,

      status: "Pending",
    });
    console.log("🎯 Emotion:", emotion);
    console.log("📊 Confidence:", emotionConfidence);

    const savedComplaint = await complaint.save();

    res.status(201).json(savedComplaint);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Complaints (Authority/Admin)
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("citizenId", "name email");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Complaint Status (Authority)
export const updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate("citizenId", "name email");

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Complaints (Citizen)
export const getMyComplaints = async (req, res) => {
  try {
    const citizenId = req.user.id;

    const complaints = await Complaint.find({ citizenId })
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
