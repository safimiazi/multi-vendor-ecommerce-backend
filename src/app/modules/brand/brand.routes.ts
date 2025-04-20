import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { brandController } from "./brand.controller";
import { brandPostValidation, brandUpdateValidation } from "./brand.validation";
import { authenticate, authorize } from "../../middlewares/authGuard";
import { ROLE } from "../../constant/role";
import { photoComposure } from "../../middlewares/photoComposure";
import { processBrandImage } from "../../middlewares/fileProcessor/processBrandImage";
import { getMuler } from "../../middlewares/multer";

const router = express.Router();
const { configurableCompression } = photoComposure();

router.post(
  "/post_brand",
  authenticate,
  authorize(ROLE.ADMIN, ROLE.VENDOR),
  getMuler({
    upload_file_destination_path: "uploads",
    regex: /\.(jpg|jpeg|png|webp)$/,
    images: "jpg, jpeg, png, webp",
  }).fields([
    { name: "brandImage", maxCount: 1 }, 
  ]),

  configurableCompression("jpeg", 60),
  processBrandImage,
  validateRequest(brandPostValidation),

  brandController.postBrand
);
router.get("/get_all_brand", brandController.getAllBrand);
router.get("/get_single_brand/:id", brandController.getSingleBrand);
router.put(
  "/update_brand/:id",
  authenticate,
  authorize(ROLE.ADMIN, ROLE.VENDOR),
  getMuler({
    upload_file_destination_path: "uploads",
    regex: /\.(jpg|jpeg|png|webp)$/,
    images: "jpg, jpeg, png, webp",
  }).fields([
    { name: "brandImage", maxCount: 1 }, 
  ]),
  configurableCompression("jpeg", 60),
  processBrandImage,
  validateRequest(brandUpdateValidation),
  brandController.updateBrand
);
router.delete("/delete_brand/:id", brandController.deleteBrand);

export const brandRoutes = router;
