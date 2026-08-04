// services/categories.ts

import api from "@/lib/api";
import { ApiResponse, Category } from "@/lib/types";

export const categoriesService = {
  getAll: () =>
    api.get<ApiResponse<Category[]>>("/categories"),
};