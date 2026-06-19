import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", email: "", password: "", phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Cannot connect to server. Is backend running?");
      setLoading(false);
    }
  };

  // ✅ Google Signup — Fixed
  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photo: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Google signup failed");
        setGoogleLoading(false);
        return;
      }

      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google error:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setError("Google popup closed. Please try again.");
      } else if (err.code === "auth/popup-blocked") {
        setError("Popup blocked by browser. Please allow popups.");
      } else {
        setError("Google signup failed. Please try again.");
      }
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">
          Create your The Wooders account
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* ✅ Google Button — Active */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {googleLoading ? (
            <span className="text-gray-500">Connecting...</span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                <path fill="#EA4335" d="M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.5 3.1 29.6 1 24 1 14.8 1 7 6.7 3.7 14.6l7 5.4C12.3 13.7 17.7 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/>
                <path fill="#FBBC05" d="M10.7 28.6A14.7 14.7 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-7-5.4A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l8.1-6.1z"/>
                <path fill="#34A853" d="M24 47c5.9 0 10.9-2 14.5-5.4l-7.5-5.8c-2 1.4-4.6 2.2-7 2.2-6.3 0-11.7-4.2-13.6-10l-8.1 6.1C7 41.3 14.8 47 24 47z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text" name="name" placeholder="Full Name" required
            value={formData.name} onChange={handleChange}
            className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="email" name="email" placeholder="Email Address" required
            value={formData.email} onChange={handleChange}
            className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="password" name="password" placeholder="Password" required
            value={formData.password} onChange={handleChange}
            className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="tel" name="phone" placeholder="Phone Number"
            value={formData.phone} onChange={handleChange}
            className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit" disabled={loading}
            className="bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up with Email"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}