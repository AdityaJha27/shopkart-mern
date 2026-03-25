import { useState, useEffect } from "react"
import axios from "../api/axios"

const emptyForm = {
  name: "", price: "", category: "",
  description: "", image: "", stock: ""
}

export default function AdminPanel() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/products")
      setProducts(data)
    } catch { setProducts([]) }
  }

  useEffect(() => { fetchProducts() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editing) {
        await axios.put(`/products/${editing}`, form)
      } else {
        await axios.post("/products", form)
      }
      setForm(emptyForm)
      setEditing(null)
      fetchProducts()
    } catch (err) {
      alert(err.response?.data?.message || "Error!")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return
    try {
      await axios.delete(`/products/${id}`)
      fetchProducts()
    } catch { alert("Delete failed") }
  }

  const handleEdit = (product) => {
    setEditing(product._id)
    setForm({
      name: product.name, price: product.price,
      category: product.category, description: product.description,
      image: product.image, stock: product.stock
    })
  }

  const inputStyle = {
    width: "100%", padding: "10px 14px",
    border: "1px solid #e0e0e0", borderRadius: "8px",
    fontSize: "14px", outline: "none", marginBottom: "12px"
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1a1a2e", marginBottom: "32px" }}>
        Admin Panel
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "32px" }}>
        {/* Form */}
        <div style={{
          background: "white", borderRadius: "12px",
          padding: "24px", boxShadow: "0 2px 8px #0000000a",
          height: "fit-content"
        }}>
          <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px", color: "#1a1a2e" }}>
            {editing ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSubmit}>
            {["name", "price", "category", "image", "stock"].map(field => (
              <div key={field}>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#555", textTransform: "capitalize" }}>
                  {field}
                </label>
                <input
                  type={field === "price" || field === "stock" ? "number" : "text"}
                  placeholder={field}
                  value={form[field]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  required
                  style={inputStyle}
                />
              </div>
            ))}
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#555" }}>Description</label>
            <textarea
              placeholder="Product description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              required
              style={{ ...inputStyle, height: "80px", resize: "vertical" }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" disabled={loading} style={{
                flex: 1, padding: "10px",
                background: loading ? "#9e9e9e" : "#6C63FF",
                color: "white", border: "none",
                borderRadius: "8px", fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer"
              }}>
                {loading ? "Saving..." : editing ? "Update" : "Add Product"}
              </button>
              {editing && (
                <button type="button" onClick={() => { setEditing(null); setForm(emptyForm) }} style={{
                  padding: "10px 16px", background: "#f5f5f5",
                  border: "none", borderRadius: "8px",
                  cursor: "pointer", fontWeight: "600", color: "#555"
                }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Products Table */}
        <div style={{
          background: "white", borderRadius: "12px",
          padding: "24px", boxShadow: "0 2px 8px #0000000a"
        }}>
          <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px", color: "#1a1a2e" }}>
            All Products ({products.length})
          </h2>
          {products.length === 0 ? (
            <p style={{ color: "#888", textAlign: "center", padding: "40px" }}>
              No products yet — add one!
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {products.map(product => (
                <div key={product._id} style={{
                  display: "flex", alignItems: "center", gap: "16px",
                  padding: "12px", borderRadius: "8px",
                  border: "1px solid #f0f0f0"
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a2e" }}>{product.name}</p>
                    <p style={{ fontSize: "12px", color: "#888" }}>{product.category} — ₹{product.price}</p>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => handleEdit(product)} style={{
                      padding: "6px 14px", background: "#e8f0fe",
                      color: "#1a73e8", border: "none",
                      borderRadius: "6px", cursor: "pointer", fontSize: "13px"
                    }}>Edit</button>
                    <button onClick={() => handleDelete(product._id)} style={{
                      padding: "6px 14px", background: "#fce4ec",
                      color: "#c62828", border: "none",
                      borderRadius: "6px", cursor: "pointer", fontSize: "13px"
                    }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}