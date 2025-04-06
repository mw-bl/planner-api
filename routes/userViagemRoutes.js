import express from "express";
import { associateUserToViagem } from "../controllers/userViagemController.js";
import { findUserByEmail } from "../controllers/userViagemController.js";
import {confirmarParticipacao} from "../controllers/userViagemController.js";// Importa o controlador para buscar usuários
import { authenticateToken, authorizeRole } from "../middlewares/authMiddleware.js";
import { removerParticipante } from "../controllers/userViagemController.js";

const router = express.Router();


router.post("/user-viagem/:viagemId", authenticateToken, authorizeRole("organizador"), associateUserToViagem);
router.delete("/viagens/:viagemId/participantes/:userId", authenticateToken, authorizeRole("organizador"), removerParticipante);

router.get("/user-viagem/search", authenticateToken, authorizeRole("organizador"), findUserByEmail);
router.post('/viagens/:viagemId/confirmar', authenticateToken, confirmarParticipacao);
export default router;
