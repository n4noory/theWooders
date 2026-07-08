import { Hero } from "../components/Hero";
import { Gallery } from "../components/Gallery";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaUser, FaBriefcase, FaPhone, FaCity, FaCommentAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
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
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("https://thewooders.onrender.com/api/categories")
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
    setLoading(true); setError(""); setSuccessMsg("");
    try {
      const res = await fetch("https://thewooders.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, furnitureType: selectedFurniture.join(", ") }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Order failed"); setLoading(false); return; }
      setSuccessMsg("✅ Order placed successfully!");
      setFormData({ name: "", profession: "", phone: "", city: "", message: "" });
      setSelectedFurniture([]);
    } catch { setError("Cannot connect to server."); }
    setLoading(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Gallery Section */}
      <Gallery />

      {/* Our Promise Section */}
      <section className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"} bg-[#f7c302] py-16`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 transition-transform duration-700 transform hover:scale-105">
            Our Promise
          </h2>
          <p className="text-lg md:text-xl text-black mb-4">
            <b>Your imagination, our craftsmanship — together we create interiors that are timeless, elegant, and meticulously crafted.</b>
          </p>
          <p className="text-lg md:text-xl text-black mb-4">
            <b>Every piece we design is authentic, using only the finest materials, because we believe your home deserves nothing less than perfection.</b>
          </p>
          <p className="text-lg md:text-xl text-black">
            <b>Trust in our work, and let us transform your spaces into stunning environments where style, comfort, and quality coexist harmoniously.</b>
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 transition-transform duration-700 transform hover:scale-105">
            Testimonials
          </h2>
          <p className="text-lg text-black-600 mb-12">
            Hear what our happy clients say about our craftsmanship, quality, and service.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <p className="text-black-700 mb-4">"Absolutely amazing work! They transformed my living room beyond my expectations. The quality and attention to detail are unmatched."</p>
              <h4 className="font-semibold text-black">Ali Raza</h4>
              <span className="text-sm text-black-500">Homeowner</span>
            </div>
            <div className="bg-black-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <p className="text-black-700 mb-4">"I loved how I could customize everything according to my needs. The team was professional and delivered exactly what I imagined."</p>
              <h4 className="font-semibold text-black">Sara Khan</h4>
              <span className="text-sm text-black-500">Interior Client</span>
            </div>
            <div className="bg-black-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <p className="text-black-700 mb-4">"Top-notch service and premium quality furniture. Highly recommended for anyone looking for elegant and durable designs."</p>
              <h4 className="font-semibold text-black">Usman Malik</h4>
              <span className="text-sm text-black-500">Business Owner</span>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8 items-start">

          {/* Form */}
          <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#f7c302]">
            <h2 className="text-3xl font-bold mb-2 text-center transition-transform duration-700 transform hover:scale-105">
              Contact Us
            </h2>
            <p className="text-center text-gray-400 text-sm mb-6">
              Fill in details and we'll craft your dream space!
            </p>

            {!user && (
              <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg mb-4 text-sm font-semibold">
                ⚠️ Please{" "}
                <button onClick={() => navigate("/login")} className="underline">login</button>
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
                className="bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-md disabled:opacity-50">
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

        {/* WhatsApp Floating Button */}
        
        <a
          href="https://wa.me/923224094950?text=Hello%2C%20I%20am%20interested%20in%20your%20services"
          target="_blank" rel="noopener noreferrer"
          className="fixed bottom-5 right-5 bg-green-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 animate-bounce"
        >
          <FaWhatsapp className="w-7 h-7 text-white" />
        </a>
      </section>
    </div>
  );
}