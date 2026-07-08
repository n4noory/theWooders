import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_KEY = "wooders-admin-secret-2024";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ New category inputs
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState("");

  const adminName = localStorage.getItem("adminName") || "Admin";
  const adminEmail = localStorage.getItem("adminEmail") || "";

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) { navigate("/login"); return; }
    fetchAll();
    fetchCategories();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [ordRes, resRes] = await Promise.all([
        fetch("https://thewooders.onrender.com/api/admin/orders", {
          headers: { "admin-key": ADMIN_KEY },
        }),
        fetch("https://thewooders.onrender.com/api/admin/reservations", {
          headers: { "admin-key": ADMIN_KEY },
        }),
      ]);
      const ordData = await ordRes.json();
      const resData = await resRes.json();
      setOrders(Array.isArray(ordData) ? ordData : []);
      setReservations(Array.isArray(resData) ? resData : []);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://thewooders.onrender.com/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
  };

  // ✅ Add category
  const addCategory = async () => {
    if (!newCategoryName.trim()) {
      setCategoryError("Category name is required!");
      return;
    }
    setCategoryLoading(true);
    setCategoryError("");
    try {
      const res = await fetch("https://thewooders.onrender.com/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "admin-key": ADMIN_KEY,
        },
        body: JSON.stringify({
          name: newCategoryName.trim(),
          icon: newCategoryIcon.trim() || "🪑",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCategoryError(data.message || "Failed to add category");
        setCategoryLoading(false);
        return;
      }
      setNewCategoryName("");
      setNewCategoryIcon("");
      setSuccessMsg("✅ Category added successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
      fetchCategories();
    } catch (err) {
      setCategoryError("Cannot connect to server.");
    }
    setCategoryLoading(false);
  };

  // ✅ Delete category
  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await fetch(`https://thewooders.onrender.com/api/categories/${id}`, {
        method: "DELETE",
        headers: { "admin-key": ADMIN_KEY },
      });
      setSuccessMsg("✅ Category deleted!");
      setTimeout(() => setSuccessMsg(""), 3000);
      fetchCategories();
    } catch (err) { console.error(err); }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await fetch(`https://thewooders.onrender.com/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "admin-key": ADMIN_KEY },
        body: JSON.stringify({ status }),
      });
      setSuccessMsg("✅ Order status updated!");
      setTimeout(() => setSuccessMsg(""), 3000);
      fetchAll();
    } catch (err) { console.error(err); }
  };

  const updateReservationStatus = async (id, status) => {
    try {
      await fetch(`https://thewooders.onrender.com/api/admin/reservations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "admin-key": ADMIN_KEY },
        body: JSON.stringify({ status }),
      });
      setSuccessMsg("✅ Reservation status updated!");
      setTimeout(() => setSuccessMsg(""), 3000);
      fetchAll();
    } catch (err) { console.error(err); }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-orange-100 text-orange-700 border border-orange-300";
      case "In Progress": return "bg-purple-100 text-purple-700 border border-purple-300";
      case "Completed": return "bg-green-100 text-green-700 border border-green-300";
      case "Reserved": return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Confirmed": return "bg-blue-100 text-blue-700 border border-blue-300";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Success Message */}
      {successMsg && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold">
          {successMsg}
        </div>
      )}

      {/* Header */}
      <div className="bg-black w-full px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f7c302] rounded-xl flex items-center justify-center font-bold text-black text-xl shadow-lg">
              W
            </div>
            <div>
              <p className="text-[#f7c302] text-xs font-semibold uppercase tracking-widest">Admin Panel</p>
              <h1 className="text-xl md:text-2xl font-bold text-white">The Wooders — Admin Dashboard</h1>
              <p className="text-gray-400 text-xs mt-1">{adminName} — {adminEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")}
              className="bg-gray-800 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-700 transition text-sm">
              View Website
            </button>
            <button onClick={adminLogout}
              className="bg-[#f7c302] text-black px-5 py-2 rounded-xl font-bold hover:bg-yellow-400 transition hover:scale-105">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats Orders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-2xl shadow p-5 text-center border-t-4 border-black hover:shadow-lg transition">
            <p className="text-4xl font-bold">{orders.length}</p>
            <p className="text-gray-500 text-sm mt-2">📦 Total Orders</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center border-t-4 border-orange-400 hover:shadow-lg transition">
            <p className="text-4xl font-bold">{orders.filter(o => o.status === "Pending").length}</p>
            <p className="text-gray-500 text-sm mt-2">Pending</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center border-t-4 border-purple-400 hover:shadow-lg transition">
            <p className="text-4xl font-bold">{orders.filter(o => o.status === "In Progress").length}</p>
            <p className="text-gray-500 text-sm mt-2">In Progress</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center border-t-4 border-green-400 hover:shadow-lg transition">
            <p className="text-4xl font-bold">{orders.filter(o => o.status === "Completed").length}</p>
            <p className="text-gray-500 text-sm mt-2">Completed</p>
          </div>
        </div>

        {/* Stats Reservations */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow p-5 text-center border-t-4 border-yellow-400 hover:shadow-lg transition w-64">
            <p className="text-4xl font-bold">{reservations.length}</p>
            <p className="text-gray-500 text-sm mt-2">🔖 Total Reservations</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center border-t-4 border-blue-400 hover:shadow-lg transition w-64">
            <p className="text-4xl font-bold">{reservations.filter(r => r.status === "Confirmed").length}</p>
            <p className="text-gray-500 text-sm mt-2">Confirmed</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center border-t-4 border-green-400 hover:shadow-lg transition w-64">
            <p className="text-4xl font-bold">{reservations.filter(r => r.status === "Completed").length}</p>
            <p className="text-gray-500 text-sm mt-2">Completed</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b-2 border-gray-200">
          {["orders", "reservations", "categories"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 font-semibold capitalize rounded-t-lg transition-all ${
                activeTab === tab
                  ? "bg-[#f7c302] text-black border-b-2 border-yellow-500"
                  : "text-gray-400 hover:text-black hover:bg-gray-100"
              }`}>
              {tab === "orders" ? "All Orders" : tab === "reservations" ? "All Reservations" : "Categories"}
            </button>
          ))}
        </div>

        {loading && activeTab !== "categories" ? (
          <div className="text-center py-20 text-gray-400 text-xl">Loading...</div>
        ) : (
          <>
            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-xl font-bold mb-6">All Client Orders</h3>
                {orders.length === 0 ? (
                  <p className="text-gray-400 text-center py-10">No orders yet!</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {orders.map((o) => (
                      <div key={o._id} className="border rounded-2xl p-5 hover:shadow-md transition hover:border-yellow-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                          <div>
                            <h4 className="font-bold text-lg">{o.name}</h4>
                            <p className="text-gray-400 text-sm">
                              {o.userId?.name || "Client"} — {o.userId?.email || "No email"}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(o.status)}`}>
                              {o.status}
                            </span>
                            <select value={o.status}
                              onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                              className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50">
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                          <div><span className="font-semibold">City:</span> {o.city}</div>
                          <div><span className="font-semibold">Phone:</span> {o.phone}</div>
                          {o.profession && <div><span className="font-semibold">Profession:</span> {o.profession}</div>}
                          {o.furnitureType && <div><span className="font-semibold">Type:</span> {o.furnitureType}</div>}
                        </div>
                        {o.message && <p className="mt-3 text-gray-500 text-sm italic">"{o.message}"</p>}
                        <p className="text-gray-300 text-xs mt-3">{new Date(o.createdAt).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* RESERVATIONS TAB */}
            {activeTab === "reservations" && (
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-xl font-bold mb-6">All Client Reservations</h3>
                {reservations.length === 0 ? (
                  <p className="text-gray-400 text-center py-10">No reservations yet!</p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reservations.map((r) => (
                      <div key={r._id} className="border rounded-2xl overflow-hidden hover:shadow-md transition">
                        {r.imageSrc && <img src={r.imageSrc} alt={r.designTitle} className="w-full h-40 object-cover" />}
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-sm">{r.designTitle}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(r.status)}`}>
                              {r.status}
                            </span>
                          </div>
                          <p className="text-gray-500 text-xs mb-1">{r.userId?.name || "Client"}</p>
                          <p className="text-gray-400 text-xs mb-2">{r.userId?.email || ""}</p>
                          <p className="text-gray-500 text-sm mb-1">{r.category}</p>
                          {r.size && <p className="text-gray-500 text-sm">Size: {r.size}</p>}
                          {r.color && <p className="text-gray-500 text-sm">Color: {r.color}</p>}
                          {r.notes && <p className="text-gray-500 text-xs mt-2 italic">"{r.notes}"</p>}
                          <select value={r.status}
                            onChange={(e) => updateReservationStatus(r._id, e.target.value)}
                            className="mt-3 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50">
                            <option value="Reserved">Reserved</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <p className="text-gray-300 text-xs mt-2">{new Date(r.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ✅ CATEGORIES TAB */}
            {activeTab === "categories" && (
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-xl font-bold mb-6">Manage Categories</h3>

                {/* Add New Category */}
                <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-3">Add New Category</h4>

                  {categoryError && (
                    <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-2 rounded-lg mb-3 text-sm">
                      ❌ {categoryError}
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Category name (e.g. Chair)"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                      />
                    </div>
                    <div className="w-full md:w-36">
                      <input
                        type="text"
                        placeholder="Icon (e.g. 🪑)"
                        value={newCategoryIcon}
                        onChange={(e) => setNewCategoryIcon(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-center text-xl"
                      />
                    </div>
                    <button
                      onClick={addCategory}
                      disabled={categoryLoading}
                      className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition hover:scale-105 disabled:opacity-50 whitespace-nowrap"
                    >
                      {categoryLoading ? "Adding..." : "+ Add Category"}
                    </button>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    * Icon field mein koi bhi emoji paste karo — empty choro toh default 🪑 lagega
                  </p>
                </div>

                {/* Categories List */}
                <h4 className="font-semibold text-gray-700 mb-3">
                  Current Categories ({categories.length})
                </h4>
                {categories.length === 0 ? (
                  <p className="text-gray-400 text-center py-10">No categories yet!</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {categories.map((cat) => (
                      <div key={cat._id}
                        className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 hover:border-yellow-300 transition">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="font-semibold text-sm flex-1 ml-2">{cat.name}</span>
                        <button
                          onClick={() => deleteCategory(cat._id)}
                          className="text-red-400 hover:text-red-600 font-bold text-lg ml-2 hover:scale-110 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}