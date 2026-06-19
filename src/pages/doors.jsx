import React, { useState, useEffect } from "react";
import { ReserveButton } from "../components/ReserveButton";

// ✅ Import your door images
import door1 from "../assets/doors/door1.jpg";
import door2 from "../assets/doors/door2.jpg";
import door3 from "../assets/doors/door3.jpg";

export default function Doors() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const doors = [
    {
      src: door1,
      title: "Elegant Wooden Door",
      description: "A beautifully crafted wooden door that adds charm and warmth to your home. Its timeless design combines durability with aesthetic elegance, making a perfect first impression."
    },
    {
      src: door2,
      title: "Luxury Wooden Door",
      description: "A premium wooden door designed for sophistication and style. Its exquisite craftsmanship and elegant finishes enhance any room, adding a luxurious touch to your interiors."
    },
    {
      src: door3,
      title: "Home Wooden Door",
      description: "An elegant wooden door suitable for any home space. Combining classic design with quality materials, it creates a welcoming and stylish entrance for every room."
    },
  ];

  return (
    <div
      className={`p-10 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Our Door Designs
      </h1>

      {/* Intro */}
      <p className="text-black-500 max-w-3xl mx-auto text-center mb-10">
        <b>
          Our doors are designed to combine elegance, security, and functionality.  
          Each door is carefully crafted to enhance the aesthetics of your home while providing lasting durability.
        </b>
      </p>

      {/* Render all 3 doors */}
      {doors.map((door, index) => (
        <div key={index} className="flex flex-col md:flex-row items-start gap-8 mb-12">
          {/* IMAGE LEFT */}
          <img
            src={door.src}
            alt={door.title}
            className="w-100 max-w-xl h-100 object-cover rounded-xl shadow-lg hover:scale-105 transition"
          />

          {/* TEXT RIGHT */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-2">{door.title}</h2>
            <p className="text-black-700">{door.description}</p>

            {/* RESERVE BUTTON */}
            <div className="mt-4">
              <ReserveButton
                designTitle={door.title}
                category="Doors"
                imageSrc={door.src}
              />
            </div>
          </div>
        </div>
      ))}

      {/* NEW ENHANCEMENT SECTION */}
      <div className="mt-12 text-left px-4 ">
        <p className="text-black mb-4 text-left">
          Our doors are crafted to provide the perfect balance of style, strength, and security. Each design is created to enhance
          the overall look of your home while ensuring durability and long-term performance.
        </p>

        <p className="text-black mb-4 text-left">
          We use premium quality wood, strong hardware, and high-end finishes to ensure that every door is not only visually appealing
          but also reliable and resistant to daily wear and tear.
        </p>

        <p className="text-black mb-8 text-left">
          Whether you are looking for modern, classic, or luxury designs, our doors can be fully customized to match your interior
          theme and personal preferences.
        </p>

        {/* Why Choose */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <u>Why Choose The Wooders Doors</u>
        </h2>

        <ul className="list-disc pl-6 text-black space-y-2 mb-6">
          <li>Fully customizable door designs according to your style</li>
          <li>High-quality wood and durable materials for long-lasting use</li>
          <li>Strong and secure construction for safety and reliability</li>
          <li>Elegant finishes that enhance the beauty of your home</li>
          <li>Affordable pricing with premium craftsmanship</li>
        </ul>

        {/* Pricing */}
        <p className="text-black mb-4">
          Prices may vary based on size, material, and customization. Contact us for an exact quote based on your door requirements.
        </p>

        {/* CTA */}
        <p className="text-black font-semibold text-lg">
          Contact us today to get started with your custom door design in Pakistan.
        </p>
      </div>
    </div>
  );
}