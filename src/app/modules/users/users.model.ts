import mongoose from "mongoose";
    
    const usersSchema = new mongoose.Schema({
    
     isDelete: {
            type: Boolean,
            default: false,
        }}, { timestamps: true });
    
    export const usersModel = mongoose.model("users", usersSchema);