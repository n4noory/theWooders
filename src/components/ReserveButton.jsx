import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ReserveButton({ designTitle, category, imageSrc }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Store design info in localStorage for modal
    localStorage.setItem("reserveDesign", JSON.stringify({
      designTitle,
      category,
      imageSrc,
    }));
    navigate("/dashboard?reserve=true");
  };

  return (
    <button
      onClick={handleClick}
      className="mt-3 bg-[#f7c302] text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition transform hover:scale-105 shadow-md"
    >
      🔖 Reserve This Design
    </button>
  );
}