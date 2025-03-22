import express from "express";
import {
  createAtividade,
  getAllAtividades,
  getAtividadeById,
  updateAtividade,
  deleteAtividade
} from "../controllers/atividadeController.js";
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/atividade", authenticateToken, createAtividade);
router.get("/atividades", authenticateToken, getAllAtividades);
router.get("/atividade/:id", authenticateToken, getAtividadeById);
router.put("/atividade/:id", authenticateToken, updateAtividade);
router.delete("/atividade/:id", authenticateToken, deleteAtividade);


export default router;
