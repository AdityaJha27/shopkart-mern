const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  items: [
    {
      name: String,
      image: String,
      price: Number,
      quantity: Number
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: "Processing",
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"]
  }
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema)