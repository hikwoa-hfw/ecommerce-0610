import { User } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { comparePassword } from "../../lib/argon";
import { sign } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config/env";

export const loginService = async (body: Pick<User, "email" | "password">) => {
  //cek email ada atau tdk di database
  //kalau tdk ada eror
  //kalau ada cek paswot sama ato tdk
  //kalo tdk eror
  //KALO SESUAI kirim data user tsb bersama jwt

  const { email, password } = body;

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw new ApiError("Invalid Credential", 400);
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError("Invalid Credential", 400);
  }

  const tokenPayload = {id: user.id, role: user.role}

  const token = sign(tokenPayload, JWT_SECRET_KEY!, {
    expiresIn: "2h"
  });

  const {password: pw, ...userWithoutPassword} = user

  return{...userWithoutPassword, token}
};
