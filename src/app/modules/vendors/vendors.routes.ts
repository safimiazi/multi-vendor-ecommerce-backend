import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { vendorsController } from "./vendors.controller";
import {
  vendorsPostValidation,
  vendorsUpdateValidation,
} from "./vendors.validation";

const router = express.Router();

router.post(
  "/post_vendors",
  validateRequest(vendorsPostValidation),
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
