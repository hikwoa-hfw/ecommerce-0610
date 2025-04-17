import { NextFunction, Request, Response } from "express";
import { fromBuffer } from "file-type";
import { ApiError } from "../utils/api-error";

export const fileFilter = (allowedTypes: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    for (const fieldname in files) {
      const fileArray = files[fieldname];

      for (const file of fileArray) {
        const type = await fromBuffer(file.buffer);

        if (!type || !allowedTypes.includes(type.mime)) {
          throw new ApiError(`File type ${type?.mime} is not allowed`, 400);
        }
      }
    }
    
    next();
  };
};
