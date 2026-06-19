import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

export function Hero() {
  // ✅ Multiple texts for typewriter effect
  const phrases = [
    "Crafting Your Dream Spaces",
    "Custom Furniture Designed Just for You",
    "Interiors that Inspire",
  ];

  const [currentText, setCurrentText] = useState(phrases[0]);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % phrases.length);
      setCurrentText(phrases[(textIndex + 1) % phrases.length]);
    }, 3000); // Change text every 3s

    return () => clearInterval(timer);
  }, [textIndex]);

  // ✅ Scroll handler
  const scrollToGallery = () => {
    const gallerySection = document.getElementById("gallery-section");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-screen bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6')] bg-cover bg-center flex flex-col items-center justify-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transition-all duration-700">
          {currentText}
        </h1>

        <p className="max-w-xl mx-auto text-white mb-6 text-lg md:text-xl">
          “Transform your home with custom interiors crafted exactly to your vision.”
        </p>

        <button
          onClick={scrollToGallery}
          className="bg-yellow-600 px-6 py-3 rounded-xl hover:bg-yellow-700 transition transform hover:scale-105 hover:shadow-lg shadow-yellow-400 duration-300 font-semibold"
        >
          Explore Designs
        </button>
      </div>

      {/* Pulsing down arrow */}
      <div
        className="absolute bottom-8 animate-bounce cursor-pointer text-white"
        onClick={scrollToGallery}
      >
        <FaArrowDown size={24} />
      </div>
    </div>
  );
}