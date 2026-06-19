import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMINS = [
  { email: "admin@thewooders.com", password: "wooders@admin123", name: "Admin" },
  { email: "adeel@thewooders.com", password: "adeel@123", name: "Adeel Ahmad" },
];

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const found = ADMINS.find(
        (a) => a.email === formData.email && a.password === formData.password
      );

      if (found) {
        localStorage.setItem("adminToken", "admin-logged-in");
        localStorage.setItem("adminName", found.name);
        localStorage.setItem("adminEmail", found.email);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid admin credentials!");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600')] bg-cover bg-center opacity-10"></div>

      <div className="relative z-10 w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#f7c302] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl">🪑</span>
          </div>
          <h1 className="text-white text-2xl font-bold">The Wooders</h1>
          <p className="text-gray-400 text-sm">Admin Control Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-[#f7c302]">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-black">Admin Login</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to manage orders & reservations</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
              <input
                type="email"
                placeholder="Admin Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition text-sm"
              >
                {showPassword ? "" : ""}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Verifying...
                </>
              ) : (
                <>
                  🔐 Login as Admin
                </>
              )}
            </button>
          </form>

          {/* Back to website */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/")}
              className="text-gray-400 text-sm hover:text-black transition underline"
            >
              ← Back to Website
            </button>
          </div>
        </div>

        {/* Security Note */}
        <p className="text-center text-gray-500 text-xs mt-4">
          🔒 This is a secure admin area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}