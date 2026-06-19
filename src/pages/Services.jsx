import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ✅ Import images from correct folders inside assets
import roomPreview from "../assets/rooms/room1.jpg";
import kitchenPreview from "../assets/kitchens/kitchen1.jpg";
import wardrobePreview from "../assets/wardrobes/wardrobes1.jpg";
import tablePreview from "../assets/tables/table1.jpg";
import doorPreview from "../assets/doors/door1.jpg";
import vanityPreview from "../assets/vanities/vanities1.jpg";

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "Room Designs",
      image: roomPreview,
      description: "Elegant bedrooms, living areas, and personalized interiors.",
      link: "/rooms",
    },
    {
      title: "Kitchens",
      image: kitchenPreview,
      description: "Modern and functional kitchens crafted with premium materials.",
      link: "/kitchens",
    },
    {
      title: "Wardrobes",
      image: wardrobePreview,
      description: "Luxury wardrobes that blend style, storage, and elegance.",
      link: "/wardrobes",
    },
    {
      title: "Tables",
      image: tablePreview,
      description: "Custom tables for every space, designed to impress.",
      link: "/tables",
    },
    {
      title: "Doors",
      image: doorPreview,
      description: "Elegant wooden doors that complement any interior.",
      link: "/doors",
    },
    {
      title: "Vanities",
      image: vanityPreview,
      description: "Luxury and simple vanities for bathrooms and bedrooms.",
      link: "/vanities",
    },
  ];

  return (
    <div className={`p-10 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Our Services
      </h1>
      <p className="text-center text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
        From custom bedrooms and kitchens to tables, wardrobes, doors, and vanities, The Wooders brings elegance, craftsmanship, and functionality to every corner of your home.
      </p>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <Link
            to={service.link}
            key={index}
            className="flex flex-col items-center text-center bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-700">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Button to Contact Page */}
      <div className="text-center mt-16">
        <p className="text-xl md:text-2xl mb-4">
          Ready to transform your home with The Wooders?
        </p>
        <Link
          to="/contact"
          className="bg-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}