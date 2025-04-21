import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true },
    description: { type: String },

    brand: { type: mongoose.Types.ObjectId, ref: "brand" },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    subcategories: [{ type: mongoose.Types.ObjectId, ref: "categories" }],
    vendor: { type: mongoose.Types.ObjectId, ref: "vendors", required: true },

    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    stock: { type: Number },
    sku: { type: String, required: true, unique: true },

    images: [{ type: String }],
    thumbnail: { type: String, default: null },
    video: { type: String, default: null },
    
    tags: [{ type: String }],

    variant: [{ type: mongoose.Types.ObjectId, ref: "attribute" }],

    shipping: {
      weight: { type: Number },
      dimensions: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number },
      },
    },

    warranty: { type: String },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const productsModel = mongoose.model("products", productsSchema);
