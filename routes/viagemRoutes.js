import express from "express";
import {
  createViagem,
  getAllViagens,
  getViagemById,
  updateViagem,
  deleteViagem
} from "../controllers/viagemController.js";
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/viagem", authenticateToken, authorizeRole('organizador'), createViagem);
router.get("/viagens", authenticateToken, getAllViagens);
router.get("/viagem/:id", authenticateToken, getViagemById);
router.put("/viagem/:id", authenticateToken, authorizeRole('orgainzador'), updateViagem);
router.delete("/viagem/:id", authenticateToken, authorizeRole('orgainzador'), deleteViagem);

export default router;
