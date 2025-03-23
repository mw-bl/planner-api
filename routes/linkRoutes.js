import express from "express";
import {
  createLink,
  getAllLinks,
  getLinkById,
  deleteLink
} from "../controllers/linkController.js";


const router = express.Router();

router.post("/link", authenticateToken, authorizeRole('organizador'), createLink);
router.get("/links", authenticateToken, getAllLinks);
router.get("/link/:id", authenticateToken, getLinkById);
router.delete("/link/:id", authenticateToken, authorizeRole('organizador'), deleteLink);



export default router;
