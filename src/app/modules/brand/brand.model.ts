import mongoose from "mongoose";
    
    const brandSchema = new mongoose.Schema({
    
     isDelete: {
            type: Boolean,
            default: false,
        }}, { timestamps: true });
    
    export const brandModel = mongoose.model("brand", brandSchema);