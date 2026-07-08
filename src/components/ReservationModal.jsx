import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function ReservationModal({ design, onClose, onSuccess }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    size: "",
    color: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://thewooders.onrender.com/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          designTitle: design.designTitle,
          category: design.category,
          imageSrc: design.imageSrc,
          ...formData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Reservation failed");
        setLoading(false);
        return;
      }

      onSuccess();
    } catch (err) {
      setError("Server se connect nahi ho saka.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-1">Reserve This Design</h2>
        <p className="text-gray-500 text-sm mb-4">
          {design.category} — {design.designTitle}
        </p>

        {/* Design Image */}
        {design.imageSrc && (
          <img
            src={design.imageSrc}
            alt={design.designTitle}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="size"
            placeholder="Size (e.g. 10x12 feet)"
            value={formData.size}
            onChange={handleChange}
            className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="color"
            placeholder="Preferred Color / Finish"
            value={formData.color}
            onChange={handleChange}
            className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <textarea
            name="notes"
            placeholder="Any special requirements or notes..."
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Reserving..." : "Confirm Reservation"}
          </button>
        </form>
      </div>
    </div>
  );
}