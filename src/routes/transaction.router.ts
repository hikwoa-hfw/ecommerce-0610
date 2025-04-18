import { Router } from "express";
import { createTransactionController } from "../controllers/transaction.controller";
import { verifyToken } from "../lib/jwt";
import { validateCreateTransaction } from "../validators/transaction.validator";
import { verifyRole } from "../middleware/role.middleware";

const router = Router();

router.post(
  "/",
  verifyToken,
  verifyRole(["USER"]),
  validateCreateTransaction,
  createTransactionController
);

export default router;