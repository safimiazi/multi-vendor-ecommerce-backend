import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { vendorsController } from "./vendors.controller";
import {
  vendorsPostValidation,
  vendorsUpdateValidation,
} from "./vendors.validation";
import hashPassword from "../../middlewares/hashPassword";
import { getMuler } from "../../middlewares/multer";
import { processImage } from "../../middlewares/processImage";
import { photoComposure } from "../../middlewares/photoComposure";

const router = express.Router();
const { configurableCompression } = photoComposure();

router.post(
  "/vendor_request",
    getMuler({
      upload_file_destination_path: "uploads",
      regex: /\.(jpg|jpeg|png|webp)$/,
      images: "jpg, jpeg, png, webp",
    }).fields([
      { name: "logo", maxCount: 1 }, 
    ]),
  
    configurableCompression("jpeg", 60),
    processImage({ fieldName: "logo" }),
  validateRequest(vendorsPostValidation),
  hashPassword,
  vendorsController.postVendors
);
router.get("/get_all_vendors", vendorsController.getAllVendors);
router.get("/get_single_vendors/:id", vendorsController.getSingleVendors);
router.put(
  "/update_vendors/:id",
  validateRequest(vendorsUpdateValidation),
  vendorsController.updateVendors
);
router.delete("/delete_vendors/:id", vendorsController.deleteVendors);

export const vendorsRoutes = router;
