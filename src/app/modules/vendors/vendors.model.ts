import mongoose from "mongoose";
    
    const vendorsSchema = new mongoose.Schema({
    
     isDelete: {
            type: Boolean,
            default: false,
        }}, { timestamps: true });
    
    export const vendorsModel = mongoose.model("vendors", vendorsSchema);