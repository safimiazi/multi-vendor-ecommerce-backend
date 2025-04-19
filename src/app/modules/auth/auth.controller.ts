import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";

const postAuth = catchAsync(async (req: Request, res: Response) => {
  const result = "";
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Created successfully",
    data: result,
  });
});

export const authController = { postAuth };
