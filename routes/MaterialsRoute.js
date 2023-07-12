import express from "express";
import {
  getMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../controllers/Materials.js";

const router = express.Router();

router.get("/materialsbycourse/:uuid", getMaterials);
router.get("/materials/:id", getMaterialById);
router.post("/materials", createMaterial);
router.patch("/materials/:id", updateMaterial);
router.delete("/materials/:id", deleteMaterial);

export default router;
