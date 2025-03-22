import express from "express";
import {
  createLink,
  getAllLinks,
  getLinkById,
  deleteLink
} from "../controllers/linkController.js";
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// router.post("/link", authenticateToken, authorizeRole('organizador'), createLink);
// router.get("/links", authenticateToken, getAllLinks);
// router.get("/link/:id", authenticateToken, getLinkById);
// router.delete("/link/:id", authenticateToken, authorizeRole('organizador'), deleteLink);

router.post("/link", createLink);
router.get("/links", getAllLinks);
router.get("/link/:id", getLinkById);
router.delete("/link/:id", deleteLink);

export default router;
