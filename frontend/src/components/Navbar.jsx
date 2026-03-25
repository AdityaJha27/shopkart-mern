import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav style={{
      background: "#1a1a2e",
      padding: "0 32px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
      width: "100%",
    }}>
      {/* Logo */}
      <Link to="/" style={{
        fontSize: "22px", fontWeight: "700",
        color: "#6C63FF", textDecoration: "none"
      }}>
        🛒 ShopKart
      </Link>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Link to="/" style={{ color: "#ffffff90", textDecoration: "none", fontSize: "14px" }}>
          Home
        </Link>

        {user && (
          <Link to="/orders" style={{ color: "#ffffff90", textDecoration: "none", fontSize: "14px" }}>
            Orders
          </Link>
        )}

        {user?.isAdmin && (
          <Link to="/admin" style={{ color: "#F9C74F", textDecoration: "none", fontSize: "14px" }}>
            Admin
          </Link>
        )}

        {user && (
          <Link to="/cart" style={{
            color: "white", textDecoration: "none", fontSize: "14px",
            background: "#6C63FF", padding: "8px 16px", borderRadius: "8px",
            display: "flex", alignItems: "center", gap: "8px"
          }}>
            Cart
            {totalItems > 0 && (
              <span style={{
                background: "#FF6584", color: "white",
                borderRadius: "50%", width: "20px", height: "20px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: "700"
              }}>
                {totalItems}
              </span>
            )}
          </Link>
        )}

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: "#ffffff60", fontSize: "13px" }}>
              Hi, {user.name}
            </span>
            <button onClick={handleLogout} style={{
              background: "transparent", border: "1px solid #ffffff30",
              color: "#ffffff90", padding: "6px 14px", borderRadius: "8px",
              cursor: "pointer", fontSize: "13px"
            }}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/login" style={{
              color: "#ffffff90", textDecoration: "none", fontSize: "14px",
              padding: "6px 14px", border: "1px solid #ffffff30", borderRadius: "8px"
            }}>
              Login
            </Link>
            <Link to="/register" style={{
              color: "white", textDecoration: "none", fontSize: "14px",
              padding: "6px 14px", background: "#6C63FF", borderRadius: "8px"
            }}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}