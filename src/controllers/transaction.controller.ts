import { NextFunction, Request, Response } from "express";
import { createTransactionService } from "../services/transaction/create-transaction.service";
import { uploadPaymentProofService } from "../services/transaction/upload-payment-proof.service";

export const createTransactionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createTransactionService(
      req.body,
      Number(res.locals.user.id) // ambil id user dalam token
    );
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const uploadPaymentProofController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await uploadPaymentProofService(
      req.body.uuid,
      Number(res.locals.user.id) // ambil id user dalam token
    );
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};