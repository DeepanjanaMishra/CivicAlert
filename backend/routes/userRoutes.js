import express from "express";
import { getUsers, updateUserStatus } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// GET ALL USERS (Admin only)
router.get(
  "/users",
  verifyToken,
  allowRoles("admin"),
  getUsers
);

// UPDATE USER STATUS / ROLE
router.put(
  "/users/:id",
  verifyToken,
  allowRoles("admin"),
  updateUserStatus
);

export default router;