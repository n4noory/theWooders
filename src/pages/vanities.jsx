import React, { useState, useEffect } from "react";
import { ReserveButton } from "../components/ReserveButton";

// ✅ Import your vanity images
import vanities1 from "../assets/vanities/vanities1.jpg";
import vanities2 from "../assets/vanities/vanities2.jpg";

export default function Vanities() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const vanities = [
    {
      src: vanities1,
      title: "Luxury Vanity",
      description: "A luxurious vanity designed to elevate your bathroom experience. Crafted with premium materials and elegant detailing, it combines style and functionality seamlessly."
    },
    {
      src: vanities2,
      title: "Elegant Home Vanity",
      description: "A simple yet elegant vanity perfect for home use. Thoughtfully designed to maximize space while maintaining a sophisticated and refined aesthetic."
    },
  ];

  return (
    <div className={`p-10 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Our Vanity Designs
      </h1>

      {/* Intro */}
      <p className="text-black-500 max-w-3xl mx-auto text-center mb-10">
        <b>
          Explore our collection of luxury and elegant vanities, crafted to bring style, functionality, and premium quality to your home.
        </b>
      </p>

      {/* Render vanities */}
      {vanities.map((vanity, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center gap-8 mb-12 ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* IMAGE */}
          <img
            src={vanity.src}
            alt={vanity.title}
            className="w-full max-w-xl h-150 object-cover rounded-xl shadow-lg hover:scale-105 transition"
          />

          {/* TEXT */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-2">{vanity.title}</h2>
            <p className="text-black-700">{vanity.description}</p>
            {/* ✅ RESERVE BUTTON */}
            <div className="mt-4">
              <ReserveButton designTitle={vanity.title} category="Vanities" imageSrc={vanity.src} />
            </div>
          </div>
        </div>
      ))}

      {/* NEW ENHANCEMENT SECTION */}
      <div className="mt-12 text-left px-4">
        <p className="text-black mb-4 text-left">
          Our vanities are designed to bring elegance and practicality together, creating a perfect space for your daily routine.
          Each design is thoughtfully crafted to enhance both functionality and visual appeal in your home.
        </p>

        <p className="text-black mb-4 text-left">
          We use high-quality materials such as durable wood, moisture-resistant finishes, and premium fittings to ensure long-lasting
          performance, especially in bathroom environments.
        </p>

        <p className="text-black mb-8 text-left">
          Whether you prefer a modern minimalist vanity or a more luxurious design, our vanities can be fully customized to suit your
          space, storage needs, and personal style.
        </p>

        {/* Why Choose */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <u>Why Choose The Wooders Vanities</u>
        </h2>

        <ul className="list-disc pl-6 text-black space-y-2 mb-6">
          <li>Fully customizable vanity designs based on your needs</li>
          <li>High-quality, moisture-resistant materials for durability</li>
          <li>Elegant and modern designs to enhance your interiors</li>
          <li>Smart storage solutions for better organization</li>
          <li>Affordable pricing with premium finishing</li>
        </ul>

        {/* Pricing */}
        <p className="text-black mb-4">
          Prices may vary based on size, material, and customization. Contact us for an exact quote based on your vanity requirements.
        </p>

        {/* CTA */}
        <p className="text-black font-semibold text-lg">
          Contact us today to get started with your custom vanity design in Pakistan.
        </p>
      </div>
    </div>
  );
}