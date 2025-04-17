import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";
import { PaginationQueryParams } from "../../types/pagination";

interface GetProductsService extends PaginationQueryParams {
  search: string;
}

export const getProductsService = async (queries: GetProductsService) => {
  const { page, take, sortBy, sortOrder, search } = queries;

  const whereClause: Prisma.ProductWhereInput = {
    deletedAt: null,
  };

  if (search) {
    whereClause.name = { contains: search, mode: "insensitive" };
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    take: take,
    skip: (page - 1) * take,
    orderBy: { [sortBy]: sortOrder },
  });

  const count = await prisma.product.count({ where: whereClause });

  return {
    data: products,
    meta: { page, take, total: count },
  };
};