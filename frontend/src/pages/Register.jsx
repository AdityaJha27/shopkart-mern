import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "../api/axios"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const { data } = await axios.post("/auth/register", { name, email, password })
      login(data)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: "100%", padding: "12px 16px",
    border: "1px solid #e0e0e0", borderRadius: "8px",
    fontSize: "14px", outline: "none",
    marginBottom: "16px", marginTop: "6px"
  }

  return (
    <div style={{
      minHeight: "calc(100vh - 64px)",
      display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f8f8fc"
    }}>
      <div style={{
        background: "white", borderRadius: "16px",
        padding: "40px", width: "100%", maxWidth: "420px",
        boxShadow: "0 4px 24px #0000000f"
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "40px", marginBottom: "8px" }}>🎉</div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a2e" }}>
            Create Account
          </h1>
          <p style={{ color: "#888", fontSize: "14px", marginTop: "4px" }}>
            Join ShopKart today
          </p>
        </div>

        {error && (
          <div style={{
            background: "#fce4ec", color: "#c62828",
            padding: "12px 16px", borderRadius: "8px",
            fontSize: "13px", marginBottom: "16px"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: "13px", fontWeight: "600", color: "#555" }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your full name"
            required
            style={inputStyle}
          />

          <label style={{ fontSize: "13px", fontWeight: "600", color: "#555" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={inputStyle}
          />

          <label style={{ fontSize: "13px", fontWeight: "600", color: "#555" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Min 6 characters"
            required
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "12px",
              background: loading ? "#9e9e9e" : "#6C63FF",
              color: "white", border: "none",
              borderRadius: "8px", fontSize: "15px",
              fontWeight: "600", cursor: loading ? "not-allowed" : "pointer",
              marginTop: "8px"
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#888" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#6C63FF", fontWeight: "600" }}>Login</Link>
        </p>
      </div>
    </div>
  )
}