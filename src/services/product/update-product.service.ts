import { Product } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { generateSlug } from "../../utils/generate-slug";

export const updateProductService = async (
  id: number,
  body: Partial<Product>
) => {
  const product = await prisma.product.findFirst({
    where: { id },
  });

  if (!product) {
    throw new ApiError("Product doesn't exist", 400);
  }

  let { name, slug, price, stock, storeId } = body;

  if (name) {
    const existingProduct = await prisma.product.findFirst({
      where: {
        name,
      },
    });

    if (existingProduct) {
      throw new ApiError("Product name already exist", 400);
    }
    
    slug = generateSlug(name);
  }

  return await prisma.product.update({
    where: { id },
    data: {...body, slug}
  });
};
