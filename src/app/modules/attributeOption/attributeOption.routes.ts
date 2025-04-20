
    import express from "express";
    import { validateRequest } from "../../middlewares/validateRequest";
    import { attributeOptionController } from "./attributeOption.controller";
    import { attributeOptionPostValidation,attributeOptionUpdateValidation } from "./attributeOption.validation";

    const router = express.Router();
    
    router.post("/post_attributeOption", validateRequest(attributeOptionPostValidation), attributeOptionController.postAttributeOption);
    router.get("/get_all_attributeOption", attributeOptionController.getAllAttributeOption);
    router.get("/get_single_attributeOption/:id", attributeOptionController.getSingleAttributeOption);
    router.put("/update_attributeOption/:id", validateRequest(attributeOptionUpdateValidation), attributeOptionController.updateAttributeOption);
    router.delete("/delete_attributeOption/:id", attributeOptionController.deleteAttributeOption);
    
    export const attributeOptionRoutes = router;