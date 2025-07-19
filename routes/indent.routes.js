import express from "express";
import {
  submitIndent,
  getMyIndents,
} from "../controllers/indent.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", verifyToken, submitIndent);
router.get("/", verifyToken, getMyIndents);

export default router;
