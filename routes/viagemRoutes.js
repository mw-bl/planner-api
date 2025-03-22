import express from "express";
import {
  createViagem,
  getAllViagens,
  getViagemById,
  updateViagem,
  deleteViagem
} from "../controllers/viagemController.js";
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/viagem", authenticateToken, createViagem);
router.get("/viagens", authenticateToken, getAllViagens);
router.get("/viagem/:id", authenticateToken, getViagemById);
router.put("/viagem/:id", authenticateToken, updateViagem);
router.delete("/viagem/:id", authenticateToken, deleteViagem);

export default router;
