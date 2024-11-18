import {axiosInstance} from "@/services/ax-instance";
import {Product} from "@prisma/client";
import {ApiRoutes} from "@/services/constants";

export const search = async (query: string): Promise<Product[]> => {

    return (await axiosInstance.get<Product[]>(ApiRoutes.PRODUCTS_SEARCH, { params: { query } }))
        .data;
}