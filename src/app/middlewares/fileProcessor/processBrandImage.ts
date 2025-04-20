/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

// middleware/fileProcessor.ts
export const processBrandImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const body: any = {
      ...req.body,

      // ✅ Use correct field name "image"
      brandImage:
        files && files.brandImage && files.brandImage.length > 0
          ? files.brandImage[0].path
          : null,

  
    };

    req.body = body;

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Something went wrong from the route.";
    res.status(400).json({ error: errorMessage });
  }
};