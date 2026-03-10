import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

// Create Complaint (Citizen)
export const createComplaint = async (req, res) => {

  try {

    const citizenId = req.user.id;   // take from token
    const { complaintText } = req.body;

    const complaint = new Complaint({
      citizenId,
      complaintText
    });

    const savedComplaint = await complaint.save();

    res.status(201).json(savedComplaint);

  } catch (error) {

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