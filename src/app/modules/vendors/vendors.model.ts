import mongoose from "mongoose";
import { Ivendors } from "./vendors.interface";

const vendorsSchema = new mongoose.Schema<Ivendors>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    logo: {
      type: String,
    },
    shopName: {
      type: String,
      required: true,
    },
    shopAddress: {
      type: String,
    },
    shopPhone: {
      type: String,
    },
    shopEmail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    reating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const vendorsModel = mongoose.model<Ivendors>("vendors", vendorsSchema);
