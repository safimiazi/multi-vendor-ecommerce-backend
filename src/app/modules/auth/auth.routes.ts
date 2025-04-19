
    import express from "express";
    import { validateRequest } from "../../middlewares/validateRequest";
    import { authController } from "./auth.controller";
    import { authPostValidation,authUpdateValidation } from "./auth.validation";

    const router = express.Router();
    
    router.post("/post_auth", validateRequest(authPostValidation), authController.postAuth);
    router.get("/get_all_auth", authController.getAllAuth);
    router.get("/get_single_auth/:id", authController.getSingleAuth);
    router.put("/update_auth/:id", validateRequest(authUpdateValidation), authController.updateAuth);
    router.delete("/delete_auth/:id", authController.deleteAuth);
    
    export const authRoutes = router;