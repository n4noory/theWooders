import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Rooms from "./pages/rooms";
import Kitchens from "./pages/kitchens";
import Tables from "./pages/tables";
import Doors from "./pages/doors";
import Wardrobes from "./pages/wardrobes";
import Vanities from "./pages/vanities";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { AppErrorBoundary } from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { AdminRoute } from "./components/AdminRoute";

// ✅ Layout — useLocation yahan use hoga
function Layout() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <AppErrorBoundary>

      {/* Navbar — Admin pages pe bilkul nahi */}
      {!isAdminPage && <Navbar />}

      {/* pt-20 sirf normal pages pe — Admin pe nahi */}
      <div className={!isAdminPage ? "pt-20" : ""}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/kitchens" element={<Kitchens />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/doors" element={<Doors />} />
          <Route path="/wardrobes" element={<Wardrobes />} />
          <Route path="/vanities" element={<Vanities />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Client Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </div>

      {/* Footer — Admin pages pe bilkul nahi */}
      {!isAdminPage && <Footer />}

    </AppErrorBoundary>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}