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
