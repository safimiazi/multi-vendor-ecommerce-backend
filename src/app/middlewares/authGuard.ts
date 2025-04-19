import { NextFunction, Request, Response } from "express";

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
import jwt from "jsonwebtoken";
import { usersModel } from "../modules/users/users.model";
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("No token provided");
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await usersModel.findById(decoded.userId);

    if (!user || !user.isActive) {
      {
        throw new Error("User not found or inactive");
      }
    }

    req.user = user as any;
    next();
  } catch (error) {
    next(error);
  }
};
export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }
        next();
    };
};
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Forbidden",
        });
    }
    next();
}
export const isVendor = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== "vendor") {
        return res.status(403).json({
            success: false,
            message: "Forbidden",
        });
    }
    next();
}
export const isCustomer = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== "customer") {
        return res.status(403).json({
            success: false,
            message: "Forbidden",
        });
    }
    next();
}
export const isActive = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user.isActive) {
        return res.status(403).json({
            success: false,
            message: "Forbidden",
        });
    }
    next();
}
export const isDeleted = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.isDelete) {
        return res.status(403).json({
            success: false,
            message: "Forbidden",
        });
    }
    next();
}
export const isNotDeleted = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.isDelete) {
        return res.status(403).json({
            success: false,
            message: "Forbidden",
        });
    }
    next();
}
