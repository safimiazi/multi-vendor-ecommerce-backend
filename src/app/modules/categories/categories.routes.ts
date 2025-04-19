
    import express from "express";
    import { validateRequest } from "../../middlewares/validateRequest";
    import { categoriesController } from "./categories.controller";
    import { categoriesPostValidation,categoriesUpdateValidation } from "./categories.validation";

    const router = express.Router();
    
    router.post("/post_categories", validateRequest(categoriesPostValidation), categoriesController.postCategories);
    router.get("/get_all_categories", categoriesController.getAllCategories);
    router.get("/get_single_categories/:id", categoriesController.getSingleCategories);
    router.put("/update_categories/:id", validateRequest(categoriesUpdateValidation), categoriesController.updateCategories);
    router.delete("/delete_categories/:id", categoriesController.deleteCategories);
    
    export const categoriesRoutes = router;