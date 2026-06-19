import { useEffect, useState } from "react";

// Import your images
import bedroom from "../assets/gallery/bedroom.jpg";
import kitchen from "../assets/gallery/kitchen.jpg";
import wardrobe from "../assets/gallery/wardrobe.jpg";
import table from "../assets/gallery/table.jpg";
import door from "../assets/gallery/door.jpg";
import vanity from "../assets/gallery/vanity.jpg";

export function Gallery() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Images with captions
  const images = [
    { src: bedroom, title: "Modern Bedroom Design" },
    { src: kitchen, title: "Elegant Kitchen Setup" },
    { src: wardrobe, title: "Spacious Wardrobe" },
    { src: table, title: "Stylish Table Design" },
    { src: door, title: "Premium Wooden Door" },
    { src: vanity, title: "Luxury Vanity Setup" },
  ];

  return (
    <div
      id="gallery-section"
      className={`p-10 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 transition-transform duration-700 transform hover:scale-105">
        Our Designs
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((item, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl bg-white"
          >
            {/* Image */}
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-100 object-contain rounded-t-xl p-2"
            />

            {/* Text under image */}
            <div className="text-center p-3">
              <p className="font-semibold text-gray-800 hover:text-yellow-600 transition">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}