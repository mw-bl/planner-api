AtividadeRoutes

import express from "express";
import {
  createAtividade,
  getAllAtividades,
  getAtividadeById,
  updateAtividade,
  deleteAtividade
} from "../controllers/atividadeController.js";
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// router.post("/atividade", authenticateToken, authorizeRole('organizador'), createAtividade);
// router.get("/atividades", authenticateToken, getAllAtividades);
// router.get("/atividade/:id", authenticateToken, getAtividadeById);
// router.put("/atividade/:id", authenticateToken, authorizeRole('organizador'), updateAtividade);
// router.delete("/atividade/:id", authenticateToken, authorizeRole('organizador'), deleteAtividade);

router.post("/atividade", createAtividade);
router.get("/atividades", getAllAtividades);
router.get("/atividade/:id", getAtividadeById);
router.put("/atividade/:id", updateAtividade);
router.delete("/atividade/:id", deleteAtividade);

export default router;