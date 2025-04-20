import { categoriesModel } from "./categories.model";
import { CATEGORIES_SEARCHABLE_FIELDS } from "./categories.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import status from "http-status";
import AppError from "../../errors/AppError";

export const categoriesService = {
  async postCategoriesIntoDB(data: any) {
    try {
      return await categoriesModel.create(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async getAllCategoriesFromDB(query: any) {
    try {
      const service_query = new QueryBuilder(categoriesModel.find(), query)
        .search(CATEGORIES_SEARCHABLE_FIELDS)
        .filter()
        .sort()
        .paginate()
        .fields();

      const result = await service_query.modelQuery;
      const meta = await service_query.countTotal();
      return {
        result,
        meta,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async getSingleCategoriesFromDB(id: string) {
    try {
      return await categoriesModel.findById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async updateCategoriesIntoDB(data: any) {
    try {
      const isDeleted = await categoriesModel.findOne({ _id: data.id });
      if (isDeleted?.isDelete) {
        throw new AppError(status.NOT_FOUND, "categories is already deleted");
      }

      const result = await categoriesModel.updateOne({ _id: data.id }, data, {
        new: true,
      });
      if (!result) {
        throw new Error("categories not found.");
      }
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async deleteCategoriesFromDB(id: string) {
    try {
      // Step 1: Check if the categories exists in the database
      const isExist = await categoriesModel.findOne({ _id: id });

      if (!isExist) {
        throw new AppError(status.NOT_FOUND, "categories not found");
      }

      // Step 4: Delete the home categories from the database
      await categoriesModel.updateOne({ _id: id }, { isDelete: true });
      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
};
