import { Worker } from "bullmq";
import { redisConnection } from "../../lib/redis";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const userTransactionWorker = new Worker(
  "user-transaction-queue",
  async (job) => {
    // add logic here
    // cek transaksi berdasarkan uuid
    // kalo misalnya statusnya itu masih WAITING_FOR_PAYMENT
    // update status transaksi tsb menjadi EXPIRED
    // balikin stock nya berdasarkan qty
    // kalo STATUS NYA SELAIN WAITING_FOR_PAYMENT, tidak usah di apa2in

    const uuid = job.data.uuid;

    const transaction = await prisma.transaction.findFirst({
      where: { uuid },
    });

    if (!transaction) {
      throw new ApiError("invalid transaction uuid", 400);
    }

    if (transaction.status === "WAITING_FOR_PAYMENT") {
      await prisma.$transaction(async (tx) => {
        await tx.transaction.update({
          where: { uuid },
          data: { status: "EXPIRED" },
        });

        await tx.product.update({
          where: { id: transaction.productId },
          data: { stock: { increment: transaction.qty } },
        });
      });
    }
  },
  { connection: redisConnection }
);