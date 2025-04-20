import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { categoriesController } from "./categories.controller";
import {
  categoriesPostValidation,
  categoriesUpdateValidation,
} from "./categories.validation";

const router = express.Router();

router.post(
  "/post_category",
  validateRequest(categoriesPostValidation),
  categoriesController.postCategories
);
router.get("/get_all_category", categoriesController.getAllCategories);
router.get(
  "/get_single_category/:id",
  categoriesController.getSingleCategories
);
router.put(
  "/update_category/:id",
  validateRequest(categoriesUpdateValidation),
  categoriesController.updateCategories
);
router.delete("/delete_category/:id", categoriesController.deleteCategories);

export const categoriesRoutes = router;
