import { Request, Response } from "express";
    import { authService } from "./auth.service";
    import catchAsync from "../../utils/catchAsync";
    import sendResponse from "../../utils/sendResponse";
    import status from "http-status";
    
    const postAuth = catchAsync(async (req: Request, res: Response) => {
      const result = await authService.postAuthIntoDB(req.body);
      sendResponse(res, { statusCode: status.CREATED, success: true, message: "Created successfully", data: result });
    });
    
    const getAllAuth = catchAsync(async (req: Request, res: Response) => {
      const result = await authService.getAllAuthFromDB(req.query);
      sendResponse(res, { statusCode: status.OK, success: true, message: "Fetched successfully", data: result });
    });
    
    const getSingleAuth = catchAsync(async (req: Request, res: Response) => {
      const result = await authService.getSingleAuthFromDB(req.params.id);
      sendResponse(res, { statusCode: status.OK, success: true, message: "Fetched successfully", data: result });
    });
    
    const updateAuth = catchAsync(async (req: Request, res: Response) => {
      const result = await authService.updateAuthIntoDB(req.body);
      sendResponse(res, { statusCode: status.OK, success: true, message: "Updated successfully", data: result });
    });
    
    const deleteAuth = catchAsync(async (req: Request, res: Response) => {
      await authService.deleteAuthFromDB(req.params.id);
      sendResponse(res, { statusCode: status.OK, success: true, message: "Deleted successfully",data: null });
    });

    
    export const authController = { postAuth, getAllAuth, getSingleAuth, updateAuth, deleteAuth };
    