import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { usersModel } from "../users/users.model";
import { Iusers } from "../users/users.interface";
import AppError from "../../errors/AppError";
import comparePassword from "../../utils/comparePassword";

const Register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // check if user already exists:
  const user: Iusers | null = await usersModel.findOne({
    email: req.body.email,
  });
  if (user) {
    throw new AppError(status.CONFLICT, "User already exists");
  }

  // create user:
  const newUser = await usersModel.create(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Register successfully",
    data: newUser,
  });
});


const Login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // check if  user not exists:
    const user: Iusers | null = await usersModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      throw new AppError(status.CONFLICT, "User not exists! please register");
    }

    // compare password:
    const isMatch = await comparePassword(req.body.password, user.password);

    
    if (!isMatch) {
      throw new AppError(status.UNAUTHORIZED, "Password is incorrect");
    }
  const result = "";
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Login successfully",
    data: result,
  });
});

export const authController = { Register, Login };
