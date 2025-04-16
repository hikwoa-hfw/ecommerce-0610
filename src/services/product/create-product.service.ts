import { Product } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const createProductService = async (body: Product) => {
    const existingProduct = await prisma.product.findFirst({
        where: {name: body.name}
    })

    if(existingProduct){
        throw new ApiError("Product already exist", 400)
    }

    await prisma.product.create({
        data: body
    })

    return {message: "create product success"}
};
