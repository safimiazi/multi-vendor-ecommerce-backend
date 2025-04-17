import { error } from "console";
import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
    return (req : Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            console.log("Error in catchAsync:", error);
            next(error);
        })
    }
}

export default catchAsync;