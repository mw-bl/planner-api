import express from "express";
import { signUp, login } from "../controllers/authController.js";
import {
  authenticationToken,
  authorizedRole,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", authenticationToken, authorizedRole("viajante"), signUp);
router.post("/login", login);

export default router;
