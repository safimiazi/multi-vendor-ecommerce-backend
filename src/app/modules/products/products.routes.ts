import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { productsController } from "./products.controller";
import {
  productsPostValidation,
  productsUpdateValidation,
} from "./products.validation";

const router = express.Router();

router.post(
  "/post_products",
  validateRequest(productsPostValidation),
  productsController.postProducts
);
router.get("/get_all_products", productsController.getAllProducts);
router.get("/get_single_products/:id", productsController.getSingleProducts);
router.put(
  "/update_products/:id",
  validateRequest(productsUpdateValidation),
  productsController.updateProducts
);
router.delete("/delete_products/:id", productsController.deleteProducts);

export const productsRoutes = router;
