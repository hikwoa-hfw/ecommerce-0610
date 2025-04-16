import { Router } from "express";
import { getSamplesController } from "../controllers/sample.controller";
import { createProductController } from "../controllers/product.controller";
import { verifyToken } from "../lib/jwt";
import { verifyRole } from "../middleware/role.middleware";

const router = Router()

router.post("/", verifyToken, verifyRole(["ADMIN"]), createProductController)

export default router