import React, { useState, useEffect } from "react";
import { ReserveButton } from "../components/ReserveButton";

// ✅ Import your kitchen images
import kitchen1 from "../assets/kitchens/kitchen1.jpg";
import kitchen2 from "../assets/kitchens/kitchen2.jpg";
import kitchen3 from "../assets/kitchens/kitchen3.jpg";
import kitchen4 from "../assets/kitchens/kitchen4.jpg";

export default function Kitchens() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const kitchens = [
    {
      src: kitchen1,
      title: "Modern Kitchen",
      description: "Where functionality meets refined elegance.",
    },
    {
      src: kitchen2,
      title: "Minimal Kitchen",
      description: "Clean lines and smart storage for everyday ease.",
    },
    {
      src: kitchen3,
      title: "Luxury Kitchen",
      description: "Crafted with premium finishes and timeless design.",
    },
    {
      src: kitchen4,
      title: "Compact Kitchen",
      description: "Maximizing space without compromising style.",
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
        Our Kitchen Designs
      </h1>

      {/* Intro */}
      <p className="text-black-500 max-w-3xl mx-auto text-center mb-10">
        <b>
          Our kitchens are designed to bring together beauty and functionality.
          Every space is carefully crafted to enhance your cooking experience
          while maintaining a modern and elegant aesthetic.
        </b>
      </p>

      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <img
          src={kitchens[0].src}
          alt={kitchens[0].title}
          className="w-full max-w-xl h-80 object-cover rounded-xl shadow-lg hover:scale-105 transition"
        />
        <div className="md:w-1/2">
          <p className="text-black-700 mb-4">
            A modern kitchen is more than just a cooking space — it's the heart
            of your home. Designed with sleek finishes and smart layouts, it
            creates a seamless blend of efficiency and style.
          </p>
          <p className="font-medium text-black-800">{kitchens[0].description}</p>
          {/* ✅ RESERVE BUTTON */}
          <div className="mt-4">
            <ReserveButton
              designTitle={kitchens[0].title}
              category="Kitchens"
              imageSrc={kitchens[0].src}
            />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-12">
        <img
          src={kitchens[1].src}
          alt={kitchens[1].title}
          className="w-full max-w-xl h-80 object-cover rounded-xl shadow-lg hover:scale-105 transition"
        />
        <div className="md:w-1/2">
          <p className="text-black-700 mb-4">
            Minimal kitchens focus on simplicity and clarity. With clean lines,
            hidden storage, and neutral tones, they provide a clutter-free and
            calming environment.
          </p>
          <p className="font-medium text-black-800">{kitchens[1].description}</p>
          {/* ✅ RESERVE BUTTON */}
          <div className="mt-4">
            <ReserveButton
              designTitle={kitchens[1].title}
              category="Kitchens"
              imageSrc={kitchens[1].src}
            />
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <img
          src={kitchens[2].src}
          alt={kitchens[2].title}
          className="w-full max-w-xl h-80 object-cover rounded-xl shadow-lg hover:scale-105 transition"
        />
        <div className="md:w-1/2">
          <p className="text-black-700 mb-4">
            Luxury kitchens are designed with premium materials and attention to
            detail. From elegant countertops to custom cabinetry, every element
            reflects sophistication and durability.
          </p>
          <p className="font-medium text-black-800">{kitchens[2].description}</p>
          {/* ✅ RESERVE BUTTON */}
          <div className="mt-4">
            <ReserveButton
              designTitle={kitchens[2].title}
              category="Kitchens"
              imageSrc={kitchens[2].src}
            />
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <p className="text-black-700 mb-4">
            Compact kitchens are designed to make the most of every inch of space.
            With intelligent layouts and innovative storage solutions, they offer
            both practicality and modern elegance.
          </p>
          <p className="font-medium text-black-800">{kitchens[3].description}</p>
          {/* ✅ RESERVE BUTTON */}
          <div className="mt-4">
            <ReserveButton
              designTitle={kitchens[3].title}
              category="Kitchens"
              imageSrc={kitchens[3].src}
            />
          </div>
        </div>
        <img
          src={kitchens[3].src}
          alt={kitchens[3].title}
          className="w-full max-w-xl h-80 object-cover rounded-xl shadow-lg hover:scale-105 transition"
        />
      </div>

      {/* NEW ENHANCEMENT SECTION */}
      <div className="mt-12 text-left px-4">
        <p className="text-black-700 mb-4 text-left">
          Our kitchen designs are thoughtfully created to combine modern style with everyday functionality.
          Each layout is carefully planned to ensure smooth workflow, making cooking and daily use both efficient and enjoyable.
        </p>

        <p className="text-black-700 mb-4 text-left">
          We use high-quality materials such as premium wood, durable laminates, and elegant countertops to ensure long-lasting
          performance and a refined finish that enhances the beauty of your home.
        </p>

        <p className="text-black-700 mb-8 text-left">
          Whether you prefer a sleek modern kitchen or a more luxurious design, every kitchen can be fully customized to match your
          needs, lifestyle, and available space.
        </p>

        {/* Why Choose */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <u>Why Choose The Wooders Kitchens</u>
        </h2>

        <ul className="list-disc pl-6 text-black-700 space-y-2 mb-6">
          <li>Fully customizable kitchen designs based on your needs and space</li>
          <li>Premium quality materials for durability and long life</li>
          <li>Modern layouts with smart storage solutions</li>
          <li>Stylish finishes that enhance the overall look of your home</li>
          <li>Affordable pricing with high-end results</li>
        </ul>

        {/* Pricing */}
        <p className="text-black-700 mb-4">
          Prices may vary based on size, material, and customization. Contact us for an exact quote tailored to your kitchen requirements.
        </p>

        {/* CTA */}
        <p className="text-black font-semibold text-lg">
          Contact us today to get started with your custom kitchen design in Pakistan.
        </p>
      </div>
    </div>
  );
}