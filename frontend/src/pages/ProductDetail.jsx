import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

const demoProducts = [
  { _id: "1", name: "iPhone 15 Pro", price: 134900, category: "Electronics", stock: 10, description: "Latest iPhone with A17 Pro chip, titanium design and advanced camera system.", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400" },
  { _id: "2", name: "Nike Air Max", price: 8999, category: "Shoes", stock: 25, description: "Iconic Nike Air Max sneakers with visible air cushioning for all day comfort.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { _id: "3", name: "MacBook Pro M3", price: 198900, category: "Electronics", stock: 5, description: "Apple MacBook Pro with M3 chip — blazing fast performance for professionals.", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400" },
  { _id: "4", name: "Levi's Jeans", price: 2499, category: "Clothing", stock: 50, description: "Classic Levi's 501 jeans — timeless style and durable denim fabric.", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
  { _id: "5", name: "Sony Headphones", price: 14999, category: "Electronics", stock: 15, description: "Sony WH-1000XM5 with industry leading noise cancellation and 30hr battery.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { _id: "6", name: "Adidas T-Shirt", price: 1299, category: "Clothing", stock: 100, description: "Premium Adidas cotton t-shirt with classic 3-stripe design.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
]

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  // Direct demo product find karo — no useEffect needed
  const product = demoProducts.find(p => p._id === id)

  const handleAdd = () => {
    if (!product) return
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (!product) return (
    <div style={{ textAlign: "center", padding: "60px" }}>
      <div style={{ fontSize: "48px" }}>😕</div>
      <h2 style={{ color: "#1a1a2e", marginTop: "16px" }}>Product not found</h2>
      <button onClick={() => navigate("/")} style={{
        marginTop: "16px", padding: "10px 24px",
        background: "#6C63FF", color: "white",
        border: "none", borderRadius: "8px",
        cursor: "pointer", fontSize: "14px"
      }}>
        Go Back Home
      </button>
    </div>
  )

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
      <button onClick={() => navigate("/")} style={{
        background: "none", border: "none",
        color: "#6C63FF", cursor: "pointer",
        fontSize: "14px", marginBottom: "24px",
        display: "flex", alignItems: "center", gap: "6px"
      }}>
        ← Back to Home
      </button>

      <div style={{
        background: "white", borderRadius: "16px",
        overflow: "hidden", boxShadow: "0 4px 24px #0000000f",
        display: "grid", gridTemplateColumns: "1fr 1fr"
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
        <div style={{ padding: "40px" }}>
          <span style={{
            fontSize: "12px", color: "#6C63FF",
            fontWeight: "600", textTransform: "uppercase",
            background: "#6C63FF11", padding: "4px 12px",
            borderRadius: "20px"
          }}>
            {product.category}
          </span>
          <h1 style={{
            fontSize: "28px", fontWeight: "700",
            color: "#1a1a2e", margin: "12px 0 16px"
          }}>
            {product.name}
          </h1>
          <p style={{ color: "#666", lineHeight: "1.7", marginBottom: "24px" }}>
            {product.description}
          </p>
          <div style={{
            fontSize: "36px", fontWeight: "800",
            color: "#6C63FF", marginBottom: "8px"
          }}>
            ₹{product.price?.toLocaleString()}
          </div>
          <p style={{ fontSize: "13px", color: "#4caf50", marginBottom: "32px", fontWeight: "600" }}>
            ✅ {product.stock} items in stock
          </p>
          <button
            onClick={handleAdd}
            style={{
              width: "100%", padding: "14px",
              background: added ? "#4caf50" : "#6C63FF",
              color: "white", border: "none",
              borderRadius: "10px", fontSize: "16px",
              fontWeight: "600", cursor: "pointer",
              transition: "background 0.3s"
            }}
          >
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  )
}