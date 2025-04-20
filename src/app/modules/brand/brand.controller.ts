import { Request, Response } from "express";
import { brandService } from "./brand.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { brandModel } from "./brand.model";
import path from "path";
import fs from "fs";

const postBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await brandService.postBrandIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Brand created successfully",
    data: result,
  });
});

const getAllBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await brandService.getAllBrandFromDB(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Fetched successfully",
    data: result,
  });
});

const getSingleBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await brandService.getSingleBrandFromDB(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Fetched successfully",
    data: result,
  });
});

const updateBrand = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const brand = await brandModel.findById(id);
  if (!brand) {
    throw new Error("Brand not found");
  }
  if (brand.isDelete) {
    throw new Error("Brand is already deleted");
  }
  if (!brand.isActive) {
    throw new Error("Brand is not active");
  }

  if (req.body.brandImage) {
    const existingBrandImagePath = path.join(
      __dirname,
      "../../..",
      brand.brandImage as string
    );
    console.log(existingBrandImagePath);
    if (fs.existsSync(existingBrandImagePath)) {
      if (brand.brandImage && brand.brandImage !== req.body.brandImage) {
        fs.unlink(existingBrandImagePath, (err: any) => {
          if (err) {
            throw new Error("Error deleting file");
          }
        });
      }
      req.body.brandImage = req.body.brandImage.replace(/\\/g, "/");
    } else {
      throw new Error("File does not exist");
    }
  }

  const result = await brandService.updateBrandIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Updated successfully",
    data: result,
  });
});

const deleteBrand = catchAsync(async (req: Request, res: Response) => {
  await brandService.deleteBrandFromDB(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Deleted successfully",
    data: null,
  });
});

export const brandController = {
  postBrand,
  getAllBrand,
  getSingleBrand,
  updateBrand,
  deleteBrand,
};
