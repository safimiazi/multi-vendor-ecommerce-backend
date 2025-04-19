import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { brandController } from "./brand.controller";
import { brandPostValidation, brandUpdateValidation } from "./brand.validation";
import { authenticate, authorize } from "../../middlewares/authGuard";
import { ROLE } from "../../constant/role";

const router = express.Router();

router.post(
  "/post_brand",
  validateRequest(brandPostValidation),
  authenticate,
  authorize(ROLE.ADMIN, ROLE.VENDOR),
  brandController.postBrand
);
router.get("/get_all_brand", brandController.getAllBrand);
router.get("/get_single_brand/:id", brandController.getSingleBrand);
router.put(
  "/update_brand/:id",
  validateRequest(brandUpdateValidation),
  brandController.updateBrand
);
router.delete("/delete_brand/:id", brandController.deleteBrand);

export const brandRoutes = router;
