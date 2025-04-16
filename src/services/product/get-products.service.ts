import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";
import { PaginationQueryParams } from "../../types/pagination";

interface GetProductsService extends PaginationQueryParams {
  search: string;
}

export const getProductsService = async (queries: GetProductsService) => {
  const { page, search, sortBy, sortOrder, take } = queries;

  const whereClause: Prisma.ProductWhereInput = {};

  if (search) {
    whereClause.name = { contains: search, mode: "insensitive" };
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    take,
    skip: (page - 1) * take,
    orderBy: { [sortBy]: sortOrder },
  });

  const count = await prisma.product.count({
    where: whereClause,
  });

  return {
    data: products,
    meta: { page, take, total: count },
  };
};
