import express from "express";
import {
  createDestino,
  getAllDestinos,
  getDestinoById,
  updateDestino,
  deleteDestino
} from "../controllers/destinoController.js";
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// router.post("/destino", authenticateToken, authorizeRole('organizador'), createDestino);
// router.get("/destinos", authenticateToken, getAllDestinos);
// router.get("/destino/:id", authenticateToken, getDestinoById);
// router.put("/destino/:id", authenticateToken, authorizeRole('organizador'), updateDestino);
// router.delete("/destino/:id", authenticateToken, authorizeRole('organizador'), deleteDestino);

router.post("/destino", createDestino);
router.get("/destinos", getAllDestinos);
router.get("/destino/:id", getDestinoById);
router.put("/destino/:id", updateDestino);
router.delete("/destino/:id", deleteDestino);

export default router;