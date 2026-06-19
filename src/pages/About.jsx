import React, { useState, useEffect } from "react";

// ✅ Import owner picture
import about1 from "../assets/about/about1.jpg";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`p-10 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      
      {/* Owner Name + Title + Motto */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Adeel Ahmad</h1>
        <p className="text-xl text-gray-700 mt-2 italic">Founder & Chief Designer</p>
        <p className="text-yellow-500 mt-1 italic font-semibold">“Crafting spaces with soul and style.”</p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
        {/* LEFT: Owner POV Paragraphs */}
        <div className="md:w-1/2 text-left space-y-6">
          <p className="text-black-700 text-lg">
            Welcome to The Wooders. I started this company with a simple vision: to create interiors that don’t just look beautiful but feel like home. Every project we take on is a journey, where I personally ensure that craftsmanship, quality, and elegance come together in perfect harmony.
          </p>
          <p className="text-black-700 text-lg">
            For me, design is not just about furniture or walls; it’s about creating spaces that inspire, comfort, and delight. I’m involved in every step, from concept to completion, because your home deserves nothing less than perfection.
          </p>
          <p className="text-black-700 text-lg">
            At The Wooders, our team shares my philosophy: attention to detail, use of premium materials, and a passion for timeless design. Together, we transform homes into elegant, functional, and welcoming environments that reflect your unique personality and lifestyle.
          </p>
        </div>

        {/* RIGHT: Floating Owner Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src={about1}
            alt="Adeel Ahmad"
            className="w-100 h-full rounded-full object-cover shadow-lg float-animation"
          />
        </div>
      </div>
    </div>
  );
}