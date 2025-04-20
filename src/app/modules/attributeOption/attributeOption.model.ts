import mongoose from "mongoose";
    
    const attributeOptionSchema = new mongoose.Schema({
    
     isDelete: {
            type: Boolean,
            default: false,
        }}, { timestamps: true });
    
    export const attributeOptionModel = mongoose.model("attributeOption", attributeOptionSchema);