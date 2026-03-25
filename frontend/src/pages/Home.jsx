import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import axios from "../api/axios"

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div style={{
      background: "white", borderRadius: "12px",
      overflow: "hidden", boxShadow: "0 2px 12px #0000000a",
      transition: "transform 0.2s", cursor: "pointer"
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name}
          style={{ width: "100%", height: "200px", objectFit: "cover" }} />
      </Link>
      <div style={{ padding: "16px" }}>
        <div style={{ fontSize: "11px", color: "#6C63FF", fontWeight: "600", textTransform: "uppercase", marginBottom: "4px" }}>
          {product.category}
        </div>
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#1a1a2e", marginBottom: "8px", lineHeight: "1.4" }}>
            {product.name}
          </h3>
        </Link>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" }}>
          <div style={{ fontSize: "20px", fontWeight: "700", color: "#6C63FF" }}>
            ₹{product.price}
          </div>
          <button onClick={handleAdd} style={{
            padding: "8px 16px",
            background: added ? "#4caf50" : "#6C63FF",
            color: "white", border: "none", borderRadius: "8px",
            fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "background 0.3s"
          }}>
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
        <div style={{ fontSize: "12px", color: "#888", marginTop: "8px" }}>
          Stock: {product.stock} left
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const demoProducts = [
    { _id: "1", name: "iPhone 15 Pro", price: 134900, category: "Electronics", stock: 10, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400" },
    { _id: "2", name: "Nike Air Max", price: 8999, category: "Shoes", stock: 25, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { _id: "3", name: "MacBook Pro M3", price: 198900, category: "Electronics", stock: 5, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400" },
    { _id: "4", name: "Levi's Jeans", price: 2499, category: "Clothing", stock: 50, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
    { _id: "5", name: "Sony Headphones", price: 14999, category: "Electronics", stock: 15, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
    { _id: "6", name: "Adidas T-Shirt", price: 1299, category: "Clothing", stock: 100, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/products${search ? `?search=${search}` : ""}`)
        // Fix — check karo array hai ya nahi
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data)
        } else {
          setProducts(demoProducts)
        }
      } catch {
        setProducts(demoProducts)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [search])

  const categories = ["All", ...new Set(products.map(p => p.category))]
  const filtered = category === "All" ? products : products.filter(p => p.category === category)

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>

      <div style={{
        background: "linear-gradient(135deg, #1a1a2e, #6C63FF)",
        borderRadius: "20px", padding: "48px 40px",
        marginBottom: "40px", color: "white", textAlign: "center"
      }}>
        <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "12px" }}>
          Welcome to ShopKart 🛒
        </h1>
        <p style={{ fontSize: "16px", opacity: 0.8, marginBottom: "24px" }}>
          Discover amazing products at great prices
        </p>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", maxWidth: "480px",
            padding: "14px 20px", borderRadius: "10px",
            border: "none", fontSize: "15px", outline: "none"
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "32px", flexWrap: "wrap" }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{
            padding: "8px 20px", borderRadius: "20px",
            border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "600",
            background: category === cat ? "#6C63FF" : "white",
            color: category === cat ? "white" : "#555",
            boxShadow: "0 2px 8px #0000000a", transition: "all 0.2s"
          }}>
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
          Loading products...
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "24px"
        }}>
          {filtered.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}