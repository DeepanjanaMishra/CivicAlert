import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

import {
  createComplaint,
  getAllComplaints,
  updateComplaintStatus,
  getMyComplaints
} from "../controllers/complaintController.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  allowRoles("citizen"),
  createComplaint
);

router.get(
  "/",
  verifyToken,
  allowRoles("authority", "admin"),
  getAllComplaints
);

router.put(
  "/:id",
  verifyToken,
  allowRoles("authority"),
  updateComplaintStatus
);

router.get(
  "/my",
  verifyToken,
  allowRoles("citizen"),
  getMyComplaints
);

export default router;