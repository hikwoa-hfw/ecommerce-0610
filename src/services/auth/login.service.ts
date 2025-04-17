import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config/env";
import prisma from "../../config/prisma";
import { comparePassword } from "../../lib/argon";
import { ApiError } from "../../utils/api-error";

export const loginService = async (body: Pick<User, "email" | "password">) => {
  // cek dulu email yang dimasukkan ada apa tidak di database
  // kalo tidak ada throw error
  // kalo ada cek passwordnya sesuai atau tidak
  // kalo tidak sesuai, throw error
  // kalo sesuai kirim data user tsb beserta token jwt

  const { email, password } = body;

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw new ApiError("Invalid credentials", 400);
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError("Invalid credentials", 400);
  }

  const tokenPayload = { id: user.id, role: user.role };

  const token = sign(tokenPayload, JWT_SECRET_KEY!, {
    expiresIn: "2h",
  });

  const { password: pw, ...userWithoutPassword } = user;

  return { ...userWithoutPassword, token };
};