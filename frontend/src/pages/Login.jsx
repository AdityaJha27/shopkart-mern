import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "../api/axios"

export default function Login() {
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
      const { data } = await axios.post("/auth/login", { email, password })
      login(data)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: "100%", padding: "12px 16px",
    border: "1px solid #e0e0e0", borderRadius: "8px",
    fontSize: "14px", outline: "none",
    marginBottom: "16px"
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
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "40px", marginBottom: "8px" }}>🛒</div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a2e" }}>
            Welcome back!
          </h1>
          <p style={{ color: "#888", fontSize: "14px", marginTop: "4px" }}>
            Login to your ShopKart account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#fce4ec", color: "#c62828",
            padding: "12px 16px", borderRadius: "8px",
            fontSize: "13px", marginBottom: "16px"
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: "13px", fontWeight: "600", color: "#555" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ ...inputStyle, marginTop: "6px" }}
          />

          <label style={{ fontSize: "13px", fontWeight: "600", color: "#555" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{ ...inputStyle, marginTop: "6px" }}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#888" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#6C63FF", fontWeight: "600" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}