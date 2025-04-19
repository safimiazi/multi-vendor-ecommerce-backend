import mongoose from "mongoose";
    
    const categoriesSchema = new mongoose.Schema({
    
     isDelete: {
            type: Boolean,
            default: false,
        }}, { timestamps: true });
    
    export const categoriesModel = mongoose.model("categories", categoriesSchema);