import {axiosInstance} from "@/services/ax-instance";
import {Ingredient} from "@prisma/client";
import {ApiRoutes} from "@/services/constants";

export const getAll = async (query: string): Promise<Ingredient[]> => {

    return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS))
        .data;
}