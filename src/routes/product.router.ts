import { Router } from "express";
import { getSamplesController } from "../controllers/sample.controller";
import {
  createProductController,
  deleteProductController,
  getProductBySlugController,
  getProductsController,
  updateProductController,
} from "../controllers/product.controller";
import { verifyToken } from "../lib/jwt";
import { verifyRole } from "../middleware/role.middleware";
import { uploader } from "../lib/multer";
import { fileFilter } from "../lib/fileFilter";

const router = Router();

router.get("/", getProductsController);
router.get("/:slug", getProductBySlugController);
router.post(
  "/",
  verifyToken,
  verifyRole(["ADMIN"]),
  uploader(5).fields([{ name: "thumbnail", maxCount: 1 }]),
  fileFilter(["image/jpeg", "image/png", "image/avif"]),
  createProductController
);
router.patch(
  "/:id",
  verifyToken,
  verifyRole(["ADMIN"]),
  updateProductController
);
router.delete(
  "/:id",
  verifyToken,
  verifyRole(["ADMIN"]),
  deleteProductController
);

export default router;
