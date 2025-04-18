import { Router } from "express";
import { createSamplesController, getSamplesController } from "../controllers/sample.controller";

const router = Router()

router.get("/", getSamplesController)
router.post("/", createSamplesController)

export default router