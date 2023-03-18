import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Please enter product description"],
  },

  normalPrice: {
    type: Number,
    required: [true, "Please enter normal price"],
    maxLength: [8, "Noraml price cannot exceed 8 characters"],
  },

  salePrice: {
    type: Number,
    required: [true, "Please enter sale price"],
    maxLength: [8, "Sale price cannot exceed 8 characters"],
  },

  stock: {
    type: Number,
    required: [true, "Please enter Product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },

  brand: {
    type: String,
    required: [true, "Please enter Product Brand"],
  },

  category: {
    type: String,
    required: [true, "Please enter Product Category"],
  },

  tags: {
    type: [String],
  },

  photos: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);
