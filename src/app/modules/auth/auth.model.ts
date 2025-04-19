import mongoose from "mongoose";
    
    const authSchema = new mongoose.Schema({
    
     isDelete: {
            type: Boolean,
            default: false,
        }}, { timestamps: true });
    
    export const authModel = mongoose.model("auth", authSchema);