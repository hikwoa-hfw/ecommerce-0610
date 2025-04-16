import { User } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { hashPassword } from "../../lib/argon";

export const registerService = async (body: User) => {
  // cari email sudah terpakai blm
  // kalau sudh terpakai throw eror
  //kl blum maka buat hash paswordnya
  // buat user berdasarkan body
  const existingUser = await prisma.user.findFirst({
    where: { email: body.email },
  });
  if (existingUser) {
    throw new ApiError("Email already existt", 400);
  }

  const hashedPassword = await hashPassword(body.password)

  const newUser = await prisma.user.create({
    data: {...body, password: hashedPassword},
    omit: { password: true },
  });

  return newUser
};
