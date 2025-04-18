import { Sample } from "@prisma/client";
import prisma from "../../config/prisma";
import { redisConnection } from "../../lib/redis";

export const createSamplesService = async (body: Sample) => {
  const newSample = await prisma.sample.create({
    data: body,
  });

  // delete data samples di redis
  // biar kalo ada yg fetch samples bakalan dapat data yg fresh
  await redisConnection.del("samples");

  return newSample;
};