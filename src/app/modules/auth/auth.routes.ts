
    import express from "express";
    import { validateRequest } from "../../middlewares/validateRequest";
    import { authController } from "./auth.controller";
import { authLoginValidation, authRegisterValidation } from "./auth.validation";

    const router = express.Router();
    
    router.post("/register", validateRequest(authRegisterValidation), authController.postAuth);
    router.post("/login", validateRequest(authLoginValidation), authController.postAuth);

    export const authRoutes = router;