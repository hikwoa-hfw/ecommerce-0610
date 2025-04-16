import { Router } from "express";
import { getSamplesController } from "../controllers/sample.controller";
import {
  createProductController,
  getProductBySlugController,
  getProductsController,
  updateProductController,
} from "../controllers/product.controller";
import { verifyToken } from "../lib/jwt";
import { verifyRole } from "../middleware/role.middleware";

const router = Router();

router.get("/", getProductsController);
router.get("/:slug", getProductBySlugController);
router.post("/", verifyToken, verifyRole(["ADMIN"]), createProductController);
router.patch(
  "/:id",
  verifyToken,
  verifyRole(["ADMIN"]),
  updateProductController
);

export default router;
