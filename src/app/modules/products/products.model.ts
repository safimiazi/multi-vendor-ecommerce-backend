import mongoose from "mongoose";
    
    const productsSchema = new mongoose.Schema({
    
     isDelete: {
            type: Boolean,
            default: false,
        }}, { timestamps: true });
    
    export const productsModel = mongoose.model("products", productsSchema);