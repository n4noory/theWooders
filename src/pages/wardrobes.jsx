import React, { useState, useEffect } from "react";
import { ReserveButton } from "../components/ReserveButton";

// ✅ Import wardrobe images
import wardrobe1 from "../assets/wardrobes/wardrobes1.jpg";
import wardrobe2 from "../assets/wardrobes/wardrobes2.jpg";
import wardrobe3 from "../assets/wardrobes/wardrobes3.jpg";
import wardrobe4 from "../assets/wardrobes/wardrobes4.jpg";
import wardrobe5 from "../assets/wardrobes/wardrobes5.jpg";

export default function Wardrobes() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const wardrobes = [
    {
      src: wardrobe1,
      title: "Classic Wooden Wardrobe",
      description: "Timeless wooden wardrobe crafted with premium finishes. Its spacious compartments and elegant design bring a sense of sophistication and warmth to your bedroom."
    },
    {
      src: wardrobe2,
      title: "Luxury Sliding Wardrobe",
      description: "A sleek sliding wardrobe designed for modern spaces. Combining high-quality materials with smart storage solutions, it offers elegance and practicality in every detail."
    },
    {
      src: wardrobe3,
      title: "Minimalist Wardrobe",
      description: "A contemporary wardrobe that maximizes space without compromising style. Clean lines, subtle textures, and functional storage make it perfect for modern interiors."
    },
    {
      src: wardrobe4,
      title: "Luxury Corner Wardrobe",
      description: "Optimized for corner spaces, this wardrobe combines luxury design with practical organization. Every detail reflects craftsmanship and attention to aesthetics."
    },
    {
      src: wardrobe5,
      title: "Custom Home Wardrobe",
      description: "A bespoke wardrobe tailored for your home. Designed to fit your unique space and lifestyle, it seamlessly blends functionality with luxurious style."
    },
  ];

  return (
    <div className={`p-10 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Our Wardrobe Designs
      </h1>

      {/* Intro */}
      <p className="text-black-500 max-w-3xl mx-auto text-center mb-10">
        <b>
          Explore our luxury wardrobes crafted with precision and elegance.  
          Each piece combines style, functionality, and quality materials for a premium storage solution.
        </b>
      </p>

      {/* Render all 5 wardrobes */}
      {wardrobes.map((wardrobe, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center gap-8 mb-12 ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* IMAGE */}
          <img
            src={wardrobe.src}
            alt={wardrobe.title}
            className="w-full max-w-xl h-100 object-cover rounded-xl shadow-lg hover:scale-105 transition"
          />

          {/* TEXT */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-2">{wardrobe.title}</h2>
            <p className="text-black-700">{wardrobe.description}</p>
            {/* ✅ RESERVE BUTTON */}
            <div className="mt-4">
              <ReserveButton designTitle={wardrobe.title} category="Wardrobes" imageSrc={wardrobe.src} />
            </div>
          </div>
        </div>
      ))}

      {/* NEW ENHANCEMENT SECTION */}
      <div className="mt-12 text-left px-4">
        <p className="text-black mb-4 text-left">
          Our wardrobes are designed to offer the perfect combination of elegance and functionality. Each design is carefully crafted
          to maximize storage while maintaining a clean and stylish appearance that enhances your living space.
        </p>

        <p className="text-black mb-4 text-left">
          We use premium quality materials such as solid wood, high-grade laminates, and durable fittings to ensure long-lasting
          performance and a refined finish that stands out in every room.
        </p>

        <p className="text-black mb-8 text-left">
          Whether you need a compact wardrobe or a luxurious walk-in design, our solutions are fully customizable to suit your space,
          lifestyle, and personal preferences.
        </p>

        {/* Why Choose */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <u>Why Choose The Wooders Wardrobes</u>
        </h2>

        <ul className="list-disc pl-6 text-black space-y-2 mb-6">
          <li>Fully customizable wardrobe designs tailored to your needs</li>
          <li>High-quality materials for durability and long-term use</li>
          <li>Smart storage solutions for maximum space utilization</li>
          <li>Modern and elegant designs to match your interiors</li>
          <li>Affordable pricing with premium finishing</li>
        </ul>

        {/* Pricing */}
        <p className="text-black mb-4">
          Prices may vary based on size, material, and customization. Contact us for an exact quote based on your wardrobe requirements.
        </p>

        {/* CTA */}
        <p className="text-black font-semibold text-lg">
          Contact us today to get started with your custom wardrobe design in Pakistan.
        </p>
      </div>
    </div>
  );
}