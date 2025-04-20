import { attributeOptionModel } from "./attributeOption.model";
      import { ATTRIBUTEOPTION_SEARCHABLE_FIELDS } from "./attributeOption.constant";
    import QueryBuilder from "../../builder/QueryBuilder";
    import status from "http-status";
    import AppError from "../../errors/AppError";
    




    export const attributeOptionService = {
      async postAttributeOptionIntoDB(data: any) {
      try {
        return await attributeOptionModel.create(data);
         } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(`${error.message}`);
          } else {
            throw new Error("An unknown error occurred while fetching by ID.");
          }
        }
      },
      async getAllAttributeOptionFromDB(query: any) {
      try {
    
    
      const service_query = new QueryBuilder(attributeOptionModel.find(), query)
            .search(ATTRIBUTEOPTION_SEARCHABLE_FIELDS)
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
      async getSingleAttributeOptionFromDB(id: string) {
        try {
        return await attributeOptionModel.findById(id);
         } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(`${error.message}`);
          } else {
            throw new Error("An unknown error occurred while fetching by ID.");
          }
        }
      },
      async updateAttributeOptionIntoDB(data: any) {
      try {
    
    
    
      const isDeleted = await attributeOptionModel.findOne({ _id: data.id });
        if (isDeleted?.isDelete) {
          throw new AppError(status.NOT_FOUND, "attributeOption is already deleted");
        }
    
        const result = await attributeOptionModel.updateOne({ _id: data.id }, data, {
          new: true,
        });
        if (!result) {
          throw new Error("attributeOption not found.");
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
      async deleteAttributeOptionFromDB(id: string) {
        try {
    
    
     // Step 1: Check if the attributeOption exists in the database
        const isExist = await attributeOptionModel.findOne({ _id: id });
    
        if (!isExist) {
          throw new AppError(status.NOT_FOUND, "attributeOption not found");
        }
    
        // Step 4: Delete the home attributeOption from the database
        await attributeOptionModel.updateOne({ _id: id }, { isDelete: true });
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