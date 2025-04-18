import { NextFunction, Request, Response } from "express";
import { getSamplesService } from "../services/sample/get-samples.service";
import { createSamplesService } from "../services/sample/create-samples.service";

export const getSamplesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getSamplesService();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const createSamplesController = async (
req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createSamplesService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
