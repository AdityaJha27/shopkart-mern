import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import ProductDetail from "./pages/ProductDetail"
import Orders from "./pages/Orders"
import AdminPanel from "./pages/AdminPanel"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: "#0f0f1a",
      overflowX: "hidden"
    }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App