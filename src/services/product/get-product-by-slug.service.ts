import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const getProductBySlugService = async (slug: string) => {
  const product = await prisma.product.findFirst({
    where: { slug },
  });

  if (!product) {
    throw new ApiError("Product doesn't exist", 400);
  }

  return product;
};
