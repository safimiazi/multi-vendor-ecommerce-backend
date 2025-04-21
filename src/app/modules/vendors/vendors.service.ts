import { vendorsModel } from "./vendors.model";
import { VENDORS_SEARCHABLE_FIELDS } from "./vendors.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import status from "http-status";
import AppError from "../../errors/AppError";
import mongoose from "mongoose";
import { usersModel } from "../users/users.model";

export const vendorsService = {
  async postVendorsIntoDB(payload: any) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      let user: any = await usersModel
        .findOne({
          $or: [
            { email: payload.email },
            {
              phone: payload.phone,
            },
          ],
        })
        .session(session);

      // If user doesn't exist, create one
      if (!user) {
        user = await usersModel
          .create(
            [
              {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                phone: payload.phone,
                address: payload.address,
                role: "vendor",
              },
            ],
            { session }
          )
          .then((res) => res[0]);
      }

      // Step 3: Check if vendor already exists for this user
      const existingVendor = await vendorsModel
        .findOne({ user: user._id })
        .session(session);



      // Create vendor using user id
      const vendor = await vendorsModel.create(
        [
          {
            user: user._id,
            shopName: payload.shopName,
            shopEmail: payload.shopEmail,
            shopPhone: payload.shopPhone,
            shopAddress: payload.shopAddress,
            description: payload.description,
            logo: payload.logo,
            isVarified: false,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return vendor[0];
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async getAllVendorsFromDB(query: any) {
    try {
      const service_query = new QueryBuilder(vendorsModel.find(), query)
        .search(VENDORS_SEARCHABLE_FIELDS)
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
  async getSingleVendorsFromDB(id: string) {
    try {
      return await vendorsModel.findById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async updateVendorsIntoDB(data: any) {
    try {
      const isDeleted = await vendorsModel.findOne({ _id: data.id });
      if (isDeleted?.isDelete) {
        throw new AppError(status.NOT_FOUND, "vendors is already deleted");
      }

      const result = await vendorsModel.updateOne({ _id: data.id }, data, {
        new: true,
      });
      if (!result) {
        throw new Error("vendors not found.");
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
  async deleteVendorsFromDB(id: string) {
    try {
      // Step 1: Check if the vendors exists in the database
      const isExist = await vendorsModel.findOne({ _id: id });

      if (!isExist) {
        throw new AppError(status.NOT_FOUND, "vendors not found");
      }

      // Step 4: Delete the home vendors from the database
      await vendorsModel.updateOne({ _id: id }, { isDelete: true });
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
