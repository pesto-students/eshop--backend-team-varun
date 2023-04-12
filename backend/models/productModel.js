const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter the Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter the Product Price "],
    maxLength: [8, "Price cannot exceed8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  featured: {
    type: String,
    default: false,
  },
  images: [ 
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
  category: {
    type: String,
    required: [true, "Please Enter the Product Category"],
  },
  brand: {
    type: String,
    required: [true, "Please Enter the Product Brand"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter the Product Stock"],
    maxLength: [4, "Stock cannot exceed 4 Character"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
      },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
