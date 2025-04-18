import { Transaction } from "@prisma/client";
import prisma from "../../config/prisma";
import { userTransactionQueue } from "../../jobs/queues/transaction.queue";
import { ApiError } from "../../utils/api-error";

export const createTransactionService = async (
  body: Pick<Transaction, "productId" | "qty">,
  authUserId: number
) => {
  // cek dulu stocknya cukup atau tidak berdasarkan qty dari body
  // kalo tidak cukup throw error
  // kalo cukup create transaksi baru dan masukan ke dalam variable
  // kurangi stock di table product
  // create data baru menggunakan bullmq dan masukan uuid transaksi
  // return message transaksi sukses

  const product = await prisma.product.findFirst({
    where: { id: body.productId },
  });

  if (!product) {
    throw new ApiError("Invalid product id", 400);
  }

  if (body.qty > product.stock) {
    throw new ApiError("Insufficient stock", 400);
  }

  const newTransaction = await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id: body.productId },
      data: { stock: { decrement: body.qty } },
    });

    return await tx.transaction.create({
      data: { ...body, userId: authUserId },
    });
  });

  await userTransactionQueue.add(
    "new-transaction",
    {
      uuid: newTransaction.uuid,
    },
    {
      jobId: newTransaction.uuid,
      delay: 2 * 60000, // 2 menit
      removeOnComplete: true,
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    }
  );

  return { message: "create transaction success" };
};