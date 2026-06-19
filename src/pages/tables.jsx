import React, { useState, useEffect } from "react";
import { ReserveButton } from "../components/ReserveButton";

// ✅ Import your table images
import table1 from "../assets/tables/table1.jpg";
import table2 from "../assets/tables/table2.jpg";
import table3 from "../assets/tables/table3.jpg";
import table4 from "../assets/tables/table4.jpg";
import table5 from "../assets/tables/table5.jpg";
import table6 from "../assets/tables/table6.jpg";

export default function Tables() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const tables = [
    {
      src: table1,
      title: "Elegant Dining Table",
      description: "A stunning centerpiece for your home, crafted to combine elegance with functionality. Perfect for hosting family meals or intimate dinners, it adds warmth and style to any dining space."
    },
    {
      src: table2,
      title: "Versatile Designing Table",
      description: "This designing table is perfect for any space in your home. Whether for work, hobbies, or decor display, it blends style and practicality seamlessly, making it an essential addition to your interiors."
    },
    {
      src: table3,
      title: "Rustic Wooden Table",
      description: "Add warmth and character to your rooms with this rustic wooden table. Its natural textures and sturdy build make it both functional and a beautiful design element that complements any décor."
    },
    {
      src: table4,
      title: "Luxury Conference Table",
      description: "Designed for elegance in professional spaces, this conference table combines sophistication with functionality. Its refined finish and spacious design make it perfect for meetings and collaborative work."
    },
    {
      src: table5,
      title: "Long Office Table",
      description: "A spacious office table designed for productivity and organization. Its sleek design accommodates multiple workstations while maintaining a professional and modern look for any office environment."
    },
    {
      src: table6,
      title: "Multi-Purpose Cabinet Table",
      description: "A versatile cabinet table suitable for any corner of your home. Combining storage and style, it enhances functionality while maintaining a sleek and elegant aesthetic for everyday use."
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
        Our Table Designs
      </h1>

      {/* Intro */}
      <p className="text-black-500 max-w-3xl mx-auto text-center mb-10">
        <b>
          Our tables are crafted to combine elegance, durability, and practicality.  
          Each design is thoughtfully created to complement your interior style while serving everyday needs beautifully.
        </b>
      </p>

      {/* Render all 6 tables */}
      {tables.map((table, index) => (
        <div key={index} className="flex flex-col md:flex-row items-start gap-8 mb-12">
          {/* IMAGE LEFT */}
          <img
            src={table.src}
            alt={table.title}
            className="w-full max-w-xl h-80 object-cover rounded-xl shadow-lg hover:scale-105 transition"
          />

          {/* TEXT RIGHT */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-2">{table.title}</h2>
            <p className="text-black-700">{table.description}</p>
            {/* ✅ RESERVE BUTTON */}
            <div className="mt-4">
              <ReserveButton designTitle={table.title} category="Tables" imageSrc={table.src} />
            </div>
          </div>
        </div>
      ))}

      {/* ✅ NEW ENHANCEMENT SECTION */}
      <div className="mt-12 text-left px-4">
        <p className="text-black mb-4 text-left">
          Our tables are designed to bring together style, strength, and everyday usability. Each piece is carefully crafted to serve
          both functional and decorative purposes, making it a perfect addition to any space.
        </p>

        <p className="text-black mb-4 text-left">
          We use high-quality materials such as solid wood, engineered wood, and premium finishes to ensure durability, stability,
          and a refined look that enhances your interiors.
        </p>

        <p className="text-black mb-8 text-left">
          Whether you need a dining table, office table, or a custom multi-purpose design, our tables can be fully customized to match
          your requirements, space, and personal style.
        </p>

        {/* Why Choose */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <u>Why Choose The Wooders Tables</u>
        </h2>

        <ul className="list-disc pl-6 text-black space-y-2 mb-6">
          <li>Fully customizable table designs according to your needs</li>
          <li>Premium quality materials for strength and long-lasting use</li>
          <li>Elegant and modern designs suitable for every space</li>
          <li>Perfect balance of functionality and aesthetic appeal</li>
          <li>Affordable pricing with high-quality finishing</li>
        </ul>

        {/* Pricing */}
        <p className="text-black mb-4">
          Prices may vary based on size, material, and customization. Contact us for an exact quote based on your table requirements.
        </p>

        {/* CTA */}
        <p className="text-black font-semibold text-lg">
          Contact us today to get started with your custom table design in Pakistan.
        </p>
      </div>
    </div>
  );
}