import { Request, Response } from "express";
import { brandService } from "./brand.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";

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
  console.log(req.body);
  return
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
