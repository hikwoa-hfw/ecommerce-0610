import { NextFunction, Request, Response } from "express";
import { getSamplesService } from "../services/sample/get-samples.service";
import { createProductService } from "../services/product/create-product.service";
import { updateProductService } from "../services/product/update-product.service";
import { getProductsService } from "../services/product/get-products.service";
import { getProductBySlugService } from "../services/product/get-product-by-slug.service";
import { deleteProductService } from "../services/product/delete-product.service";

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const thumbnail = files.thumbnail?.[0];
    const result = await createProductService(req.body, thumbnail);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await updateProductService(Number(req.params.id), req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = {
      page: parseInt(req.query.page as string) || 1,
      take: parseInt(req.query.take as string) || 3,
      sortOrder: (req.query.sortOrder as string) || "desc",
      sortBy: (req.query.sortBy as string) || "createdAt",
      search: (req.query.search as string) || "",
    };

    const result = await getProductsService(query);

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getProductBySlugController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getProductBySlugService(req.params.slug);

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUserId = res.locals.user.id;
    const result = await deleteProductService(
      Number(req.params.id),
      authUserId
    );

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
