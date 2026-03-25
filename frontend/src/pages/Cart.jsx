import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const placeOrder = async () => {
    setLoading(true)
    try {
      await axios.post("/orders", {
        items: cartItems,
        totalPrice
      })
      clearCart()
      setSuccess(true)
      setTimeout(() => navigate("/orders"), 2000)
    } catch (err) {
      alert("Order failed — " + (err.response?.data?.message || "Try again"))
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <div style={{ fontSize: "60px" }}>🎉</div>
      <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a2e", marginTop: "16px" }}>
        Order Placed Successfully!
      </h2>
      <p style={{ color: "#888", marginTop: "8px" }}>Redirecting to orders...</p>
    </div>
  )

  if (cartItems.length === 0) return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <div style={{ fontSize: "60px" }}>🛒</div>
      <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a2e", marginTop: "16px" }}>
        Your cart is empty
      </h2>
      <p style={{ color: "#888", marginTop: "8px" }}>Add some products first!</p>
    </div>
  )

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1a1a2e", marginBottom: "24px" }}>
        Your Cart ({cartItems.length} items)
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>
        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {cartItems.map(item => (
            <div key={item._id} style={{
              background: "white", borderRadius: "12px",
              padding: "20px", display: "flex",
              gap: "16px", alignItems: "center",
              boxShadow: "0 2px 8px #0000000a"
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#1a1a2e" }}>{item.name}</h3>
                <p style={{ fontSize: "18px", fontWeight: "700", color: "#6C63FF", marginTop: "4px" }}>
                  ₹{item.price}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  style={{
                    width: "32px", height: "32px", borderRadius: "8px",
                    border: "1px solid #e0e0e0", background: "white",
                    cursor: "pointer", fontSize: "16px"
                  }}
                >-</button>
                <span style={{ fontWeight: "600", minWidth: "20px", textAlign: "center" }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  style={{
                    width: "32px", height: "32px", borderRadius: "8px",
                    border: "1px solid #e0e0e0", background: "white",
                    cursor: "pointer", fontSize: "16px"
                  }}
                >+</button>
              </div>
              <div style={{ fontWeight: "700", color: "#1a1a2e", minWidth: "80px", textAlign: "right" }}>
                ₹{(item.price * item.quantity).toLocaleString()}
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  background: "#fce4ec", color: "#c62828",
                  border: "none", borderRadius: "8px",
                  padding: "6px 12px", cursor: "pointer", fontSize: "13px"
                }}
              >Remove</button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{
          background: "white", borderRadius: "12px",
          padding: "24px", height: "fit-content",
          boxShadow: "0 2px 8px #0000000a"
        }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", marginBottom: "20px" }}>
            Order Summary
          </h2>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px", color: "#555" }}>
            <span>Subtotal</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px", color: "#555" }}>
            <span>Delivery</span>
            <span style={{ color: "#4caf50" }}>FREE</span>
          </div>
          <div style={{
            borderTop: "1px solid #f0f0f0", paddingTop: "16px", marginTop: "8px",
            display: "flex", justifyContent: "space-between",
            fontSize: "18px", fontWeight: "700", color: "#1a1a2e"
          }}>
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <button
            onClick={placeOrder}
            disabled={loading}
            style={{
              width: "100%", padding: "14px",
              background: loading ? "#9e9e9e" : "#6C63FF",
              color: "white", border: "none",
              borderRadius: "10px", fontSize: "15px",
              fontWeight: "600", cursor: loading ? "not-allowed" : "pointer",
              marginTop: "20px"
            }}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  )
}