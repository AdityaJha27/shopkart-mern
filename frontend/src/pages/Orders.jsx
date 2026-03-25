import { useState, useEffect } from "react"
import axios from "../api/axios"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/orders/myorders")
        setOrders(data)
      } catch {
        setOrders([])
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const statusColor = {
    Processing: "#F9C74F",
    Shipped: "#43BCCD",
    Delivered: "#4caf50",
    Cancelled: "#ef5350"
  }

  if (loading) return (
    <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
      Loading orders...
    </div>
  )

  if (orders.length === 0) return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <div style={{ fontSize: "60px" }}>📦</div>
      <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a2e", marginTop: "16px" }}>
        No orders yet
      </h2>
      <p style={{ color: "#888", marginTop: "8px" }}>Place your first order!</p>
    </div>
  )

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1a1a2e", marginBottom: "24px" }}>
        My Orders
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {orders.map(order => (
          <div key={order._id} style={{
            background: "white", borderRadius: "12px",
            padding: "24px", boxShadow: "0 2px 8px #0000000a"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <p style={{ fontSize: "12px", color: "#888" }}>Order ID</p>
                <p style={{ fontSize: "13px", fontWeight: "600", color: "#1a1a2e" }}>
                  #{order._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div style={{
                padding: "6px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
                background: statusColor[order.status] + "22",
                color: statusColor[order.status]
              }}>
                {order.status}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {order.items.map((item, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: "14px", color: "#555"
                }}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div style={{
              borderTop: "1px solid #f0f0f0", paddingTop: "12px", marginTop: "12px",
              display: "flex", justifyContent: "space-between",
              fontSize: "16px", fontWeight: "700", color: "#1a1a2e"
            }}>
              <span>Total</span>
              <span>₹{order.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}