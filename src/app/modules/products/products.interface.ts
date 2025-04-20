// models/Product.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  vendor: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  category: Types.ObjectId;
  subCategory?: Types.ObjectId;
  tags?: string[];
  brand?: Types.ObjectId;
  images: string[];
  featuredImage?: string;
  price: number;
  discount?: number;
  finalPrice: number;
  stock: number;
  sku?: string;
  variants?: {
    size?: string;
    color?: string;
    material?: string;
    [key: string]: any;
  }[];
  rating: number;
  totalReviews: number;
  isActive: boolean;
  isDeleted: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },

    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
    tags: [{ type: String }],

    brand: { type: String },
    images: [{ type: String }],

    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number, required: true }, // should be calculated

    stock: { type: Number, default: 0 },
    sku: { type: String, unique: true },

    variants: [
      {
        size: { type: String },
        color: { type: String },
        material: { type: String },
        // extendable
      }
    ],

    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const ProductModel = model<IProduct>('Product', productSchema);
