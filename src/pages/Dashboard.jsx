import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ReservationModal } from "../components/ReservationModal";

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);
  const [reserveDesign, setReserveDesign] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Check if redirected from Reserve button
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("reserve") === "true") {
      const stored = localStorage.getItem("reserveDesign");
      if (stored) {
        setReserveDesign(JSON.parse(stored));
        setShowModal(true);
        localStorage.removeItem("reserveDesign");
      }
    }
  }, [location]);

  // Fetch reservations & orders
  useEffect(() => {
    if (!token) return;
    fetchData();
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resRes, ordRes] = await Promise.all([
        fetch("https://thewooders.onrender.com/api/reservations/my", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("https://thewooders.onrender.com/api/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      const resData = await resRes.json();
      const ordData = await ordRes.json();
      setReservations(Array.isArray(resData) ? resData : []);
      setOrders(Array.isArray(ordData) ? ordData : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  const handleReservationSuccess = () => {
    setShowModal(false);
    setSuccessMsg("Design successfully reserved!");
    fetchData();
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Reserved": return "bg-yellow-100 text-yellow-700";
      case "Confirmed": return "bg-blue-100 text-blue-700";
      case "Completed": return "bg-green-100 text-green-700";
      case "Pending": return "bg-orange-100 text-orange-700";
      case "In Progress": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Reservation Modal */}
      {showModal && reserveDesign && (
        <ReservationModal
          design={reserveDesign}
          onClose={() => setShowModal(false)}
          onSuccess={handleReservationSuccess}
        />
      )}

      {/* Success Message */}
      {successMsg && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold">
          {successMsg}
        </div>
      )}

      {/* TOP HEADER */}
      <div className="bg-[#f7c302] px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Welcome */}
          <div className="flex items-center gap-4">
            {user?.photo ? (
              <img
                src={user.photo}
                alt={user.name}
                className="w-16 h-16 rounded-full border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold shadow-md">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-black">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-black/70 text-sm">{user?.email}</p>
            </div>
          </div>

          {/* Logout Button
              <button
                onClick={logout}
                className="relative overflow-hidden bg-black text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
              >
                Logout
              </button> */}
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-5 text-center border-t-4 border-yellow-400">
            <p className="text-3xl font-bold text-black">{reservations.length}</p>
            <p className="text-gray-500 text-sm mt-1">Total Reservations</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 text-center border-t-4 border-black">
            <p className="text-3xl font-bold text-black">{orders.length}</p>
            <p className="text-gray-500 text-sm mt-1">Total Orders</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 text-center border-t-4 border-orange-400">
            <p className="text-3xl font-bold text-black">
              {orders.filter((o) => o.status === "Pending").length}
            </p>
            <p className="text-gray-500 text-sm mt-1">Pending Orders</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 text-center border-t-4 border-green-400">
            <p className="text-3xl font-bold text-black">
              {orders.filter((o) => o.status === "Completed").length}
            </p>
            <p className="text-gray-500 text-sm mt-1">Completed Orders</p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {["overview", "reservations", "orders", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 font-semibold capitalize rounded-t-lg transition ${
                activeTab === tab
                  ? "bg-[#f7c302] text-black border-b-2 border-yellow-500"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-xl">Loading...</div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-2 gap-6">

                {/* Recent Reservations */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🔖 Recent Reservations
                  </h3>
                  {reservations.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400 mb-3">No reservations yet</p>
                      <button
                        onClick={() => navigate("/rooms")}
                        className="bg-[#f7c302] text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
                      >
                        Browse Designs
                      </button>
                    </div>
                  ) : (
                    reservations.slice(0, 3).map((r) => (
                      <div key={r._id} className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                        {r.imageSrc && (
                          <img src={r.imageSrc} alt={r.designTitle} className="w-14 h-14 object-cover rounded-lg" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{r.designTitle}</p>
                          <p className="text-gray-400 text-xs">{r.category}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(r.status)}`}>
                          {r.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    📦 Recent Orders
                  </h3>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400 mb-3">No orders yet</p>
                      <button
                        onClick={() => navigate("/contact")}
                        className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                      >
                        Place an Order
                      </button>
                    </div>
                  ) : (
                    orders.slice(0, 3).map((o) => (
                      <div key={o._id} className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                          {o.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{o.name}</p>
                          <p className="text-gray-400 text-xs">{o.city}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(o.status)}`}>
                          {o.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* RESERVATIONS TAB */}
            {activeTab === "reservations" && (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-xl font-bold mb-6">🔖 All Reservations</h3>
                {reservations.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-400 text-lg mb-4">No reservations yet!</p>
                    <p className="text-gray-400 mb-6">Browse our designs and reserve your favorite ones.</p>
                    <button
                      onClick={() => navigate("/rooms")}
                      className="bg-[#f7c302] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
                    >
                      Browse Designs
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reservations.map((r) => (
                      <div key={r._id} className="border rounded-xl overflow-hidden hover:shadow-md transition">
                        {r.imageSrc && (
                          <img src={r.imageSrc} alt={r.designTitle} className="w-full h-40 object-cover" />
                        )}
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold">{r.designTitle}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(r.status)}`}>
                              {r.status}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm mb-1">📁 {r.category}</p>
                          {r.size && <p className="text-gray-500 text-sm">📐 {r.size}</p>}
                          {r.color && <p className="text-gray-500 text-sm">🎨 {r.color}</p>}
                          {r.notes && <p className="text-gray-500 text-sm mt-2 italic">"{r.notes}"</p>}
                          <p className="text-gray-300 text-xs mt-3">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-xl font-bold mb-6">📦 All Orders</h3>
                {orders.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-400 text-lg mb-4">No orders yet!</p>
                    <p className="text-gray-400 mb-6">Contact us to place your custom furniture order.</p>
                    <button
                      onClick={() => navigate("/contact")}
                      className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                    >
                      Place an Order
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {orders.map((o) => (
                      <div key={o._id} className="border rounded-xl p-5 hover:shadow-md transition">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-bold text-lg">{o.name}</h4>
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(o.status)}`}>
                            {o.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                          <div><span className="font-semibold">📍 City:</span> {o.city}</div>
                          <div><span className="font-semibold">📞 Phone:</span> {o.phone}</div>
                          {o.profession && <div><span className="font-semibold">💼 Profession:</span> {o.profession}</div>}
                          {o.furnitureType && <div><span className="font-semibold">🪑 Furniture:</span> {o.furnitureType}</div>}
                        </div>
                        {o.message && (
                          <p className="mt-3 text-gray-500 text-sm italic">"{o.message}"</p>
                        )}
                        <p className="text-gray-400 text-xs mt-3">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow p-6 max-w-md">
                <h3 className="text-xl font-bold mb-6">👤 My Profile</h3>
                <div className="flex items-center gap-4 mb-6">
                  {user?.photo ? (
                    <img src={user.photo} alt={user.name} className="w-20 h-20 rounded-full shadow" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="text-xl font-bold">{user?.name}</h4>
                    <p className="text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="border rounded-lg p-4">
                    <p className="text-gray-400 text-xs mb-1">Full Name</p>
                    <p className="font-semibold">{user?.name}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-gray-400 text-xs mb-1">Email Address</p>
                    <p className="font-semibold">{user?.email}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-gray-400 text-xs mb-1">Total Reservations</p>
                    <p className="font-semibold">{reservations.length}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-gray-400 text-xs mb-1">Total Orders</p>
                    <p className="font-semibold">{orders.length}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}