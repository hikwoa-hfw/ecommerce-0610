import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const uploadPaymentProofService = async (
  uuid: string,
  authUserId: number
) => {
  // cek dulu transaksi berdasarkan uuid
  // kalo tidak ada, throw error
  // kalo ada, pastikan id user dalam token itu sama dengan id user yang
  // ada di table transaction
  // kalo id user dalam token tidak sama dengan id user transaksi
  // throw error unauthorized
  // upload image payment proof ke cloudinary
  // kalo sama ubah status transaction tsb menjadi WAITING_CONFIRMATION
  // simpan juga secure_url cloudinary ke kolom paymentProof
  // return success

  const transaction = await prisma.transaction.findFirst({
    where: { uuid },
  });

  if (!transaction) {
    throw new ApiError("Invalid transaction uuid", 400);
  }

  if (transaction.userId !== authUserId) {
    throw new ApiError("Unauthorized", 401);
  }

  await prisma.transaction.update({
    where: { uuid },
    data: { status: "WAITING_CONFIRMATION" },
  });

  return { message: "upload payment success" };
};