import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaWhatsapp, FaUser, FaBriefcase, FaPhone, FaCity, FaCommentAlt } from "react-icons/fa";

export default function Contact() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", profession: "", phone: "", city: "", message: "",
  });
  const [selectedFurniture, setSelectedFurniture] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://thewooders-production.up.railway.app/api/categories")
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {
        setCategories([
          { _id: "1", name: "Bed", icon: "🛏️" },
          { _id: "2", name: "Sofa", icon: "🛋️" },
          { _id: "3", name: "Room", icon: "🏠" },
          { _id: "4", name: "Kitchen", icon: "🍳" },
          { _id: "5", name: "Table", icon: "🪑" },
          { _id: "6", name: "Door", icon: "🚪" },
          { _id: "7", name: "Vanity", icon: "🪞" },
          { _id: "8", name: "Wardrobe", icon: "👔" },
          { _id: "9", name: "Other", icon: "✨" },
        ]);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFurnitureToggle = (name) => {
    setSelectedFurniture(prev =>
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate("/login"); return; }
    if (selectedFurniture.length === 0) {
      setError("Please select at least one furniture type.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await fetch("https://thewooders-production.up.railway.app/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, furnitureType: selectedFurniture.join(", ") }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Order failed"); setLoading(false); return; }
      setSuccessMsg("✅ Order placed successfully!");
      setFormData({ name: "", profession: "", phone: "", city: "", message: "" });
      setSelectedFurniture([]);
    } catch {
      setError("Cannot connect to server.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div
        className="relative bg-cover bg-center py-20 px-6 text-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
          <div className="w-20 h-1 bg-[#f7c302] mx-auto mb-4 rounded-full"></div>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto italic">
            "Tell us your vision, and we'll craft it into reality — exactly how you dream it."
          </p>
        </div>
      </div>

      <section id="contact" className="py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-start">

          {/* Form */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#f7c302]">
            <h2 className="text-2xl font-bold text-black mb-1">Place Your Order</h2>
            <p className="text-gray-400 text-sm mb-6">Fill in the details and we'll get back to you!</p>

            {!user && (
              <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg mb-4 text-sm font-semibold">
                ⚠️ Please{" "}
                <button onClick={() => navigate("/login")} className="underline hover:text-yellow-900">login</button>
                {" "}to place an order.
              </div>
            )}
            {successMsg && (
              <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-4 font-semibold">
                {successMsg}
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" name="name" placeholder="Full Name" required
                  value={formData.name} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50" />
              </div>
              <div className="relative">
                <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select name="profession" required value={formData.profession} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50 appearance-none">
                  <option value="">Select Profession</option>
                  <option value="businessman">Businessman</option>
                  <option value="architect">Architect</option>
                  <option value="designer">Designer</option>
                  <option value="homeowner">Homeowner</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="tel" name="phone" placeholder="Phone Number" required
                  value={formData.phone} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50" />
              </div>
              <div className="relative">
                <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" name="city" placeholder="City" required
                  value={formData.city} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50" />
              </div>

              {/* Furniture Checkboxes */}
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <p className="text-sm font-semibold text-gray-600 mb-3">
                  Select Furniture Type(s) — you can select multiple:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <label key={cat._id}
                      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border transition-all ${
                        selectedFurniture.includes(cat.name)
                          ? "border-yellow-400 bg-yellow-50 font-semibold"
                          : "border-gray-200 bg-white hover:border-yellow-300"
                      }`}>
                      <input type="checkbox"
                        checked={selectedFurniture.includes(cat.name)}
                        onChange={() => handleFurnitureToggle(cat.name)}
                        className="accent-yellow-500" />
                      <span>{cat.icon} {cat.name}</span>
                    </label>
                  ))}
                </div>
                {selectedFurniture.length > 0 && (
                  <p className="text-xs text-yellow-700 mt-2 font-semibold">
                    Selected: {selectedFurniture.join(", ")}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="relative">
                <FaCommentAlt className="absolute left-3 top-4 text-gray-400" />
                <textarea name="message"
                  placeholder="Describe your requirements (style, size, color, design preferences...)"
                  rows={4} value={formData.message} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50 resize-none" />
              </div>

              <button type="submit" disabled={loading}
                className="bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-md disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? "Placing Order..." : "🪑 Place My Order"}
              </button>
            </form>
          </div>

          {/* ✅ Map — Fixed size, location centered */}
          <div className="flex-shrink-0 w-full md:w-[420px] sticky top-24">
            <div className="rounded-2xl overflow-hidden shadow-xl border-t-4 border-black">
              <div className="bg-black text-white px-6 py-4">
                <h3 className="font-bold text-lg">📍 Our Location</h3>
                <p className="text-gray-400 text-sm">Harbanspura, Lahore, Pakistan</p>
              </div>
              <iframe
                title="Our Location"
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1699.489284169794!2d74.4614866!3d31.5796355!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDM0JzQ2LjciTiA3NMKwMjcnNDEuNCJF!5e0!3m2!1sen!2s!4v1775389613608!5m2!1sen!2s"
                width="420"
                height="420"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/923224094950?text=Hello%2C%20I%20am%20interested%20in%20your%20services"
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 animate-bounce"
      >
        <FaWhatsapp className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}