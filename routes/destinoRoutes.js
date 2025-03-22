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