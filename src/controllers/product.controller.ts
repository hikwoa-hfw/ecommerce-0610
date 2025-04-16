import { NextFunction, Request, Response } from "express";
import { getSamplesService } from "../services/sample/get-samples.service";
import { createProductService } from "../services/product/create-product.service";

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createProductService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
