import { User } from "@prisma/client";
import fs from "fs/promises";
import Handlebars from "handlebars";
import { join } from "path";
import prisma from "../../config/prisma";
import { hashPassword } from "../../lib/argon";
import { transporter } from "../../lib/nodemailer";
import { ApiError } from "../../utils/api-error";

export const registerService = async (body: User) => {
  // cari tau dulu email nya sudah terpakai atau belom
  // kalo sudah terpakai, throw error
  // kalo belom, hash passwordnya user dan
  // buat user nya berdasarkan data yg dikirimkan

  const existingUser = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (existingUser) {
    throw new ApiError("Email already exist!", 400);
  }

  const hashedPassword = await hashPassword(body.password);

  const newUser = await prisma.user.create({
    data: { ...body, password: hashedPassword },
    omit: { password: true },
  });

  const templatePath = join(__dirname, "../../templates/welcome-email.hbs");

  const templateSource = (await fs.readFile(templatePath)).toString();

  const compiledTemplate = Handlebars.compile(templateSource);

  const html = compiledTemplate({ fullName: body.fullName });

  transporter.sendMail({
    to: body.email,
    subject: "Welcome to My App",
    html,
  });

  return newUser;
};