const express = require("express")
const router = express.Router()
const Order = require("../models/Order")
const { protect } = require("../middleware/authMiddleware")

// Place order
router.post("/", protect, async (req, res) => {
  try {
    const { items, totalPrice } = req.body

    // Demo products ke liye product field optional rakho
    const orderItems = items.map(item => ({
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity
    }))

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice
    })

    res.status(201).json(order)
  } catch (err) {
    console.error("Order error:", err)
    res.status(500).json({ message: err.message })
  }
})

// Get my orders
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router