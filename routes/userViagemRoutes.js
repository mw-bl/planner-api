import express from "express";
import { associateUserToViagem } from "../controllers/userViagemController.js";
import { authenticateToken, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rota para associar um usuário a uma viagem
router.post("/user-viagem/:viagemId", authenticateToken, authorizeRole('organizador'), associateUserToViagem);

export default router;