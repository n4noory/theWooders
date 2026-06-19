import React, { useState, useEffect } from "react";
import { ReserveButton } from "../components/ReserveButton";
// ✅ Import your room images
import room1 from "../assets/rooms/room1.jpg";
import room2 from "../assets/rooms/room2.jpg";
import room3 from "../assets/rooms/room3.jpg";
import room4 from "../assets/rooms/room4.jpg";

export default function Rooms() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const rooms = [
    {
      src: room1,
      title: "Cozy Modern Bedroom",
      description: "Where elegance meets ultimate comfort.",
    },
    {
      src: room2,
      title: "Contemporary Kitchen",
      description: "A serene bedroom designed for comfort and relaxation.",
    },
    {
      src: room3,
      title: "Spacious Wardrobe",
      description: "A stylish living area perfect for gatherings and leisure.",
    },
    {
      src: room4,
      title: "Luxury Living Room",
      description: "Comfort and style perfectly balanced.",
    },
  ];

  return (
    <div
      className={`p-10 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Our Room Designs
      </h1>

      {/* Paragraph 1 - left */}
      <p className="text-black-700 max-w-3xl mx-auto text-left mb-4">
        Discover interiors crafted for style and comfort. Each room is thoughtfully designed with elegant furnishings,
        balanced colors, and functional layouts that make your living space truly your own.
      </p>

      {/* Image 1 */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-4">
        <img
          src={rooms[0].src}
          alt={rooms[0].title}
          className="w-full h-100 object-contain transform transition-transform duration-500 hover:scale-105"
        />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-2">
          <p className="text-center font-medium text-black-800 py-2">
            {rooms[0].description}
          </p>
          <ReserveButton designTitle={rooms[0].title} category="Rooms" imageSrc={rooms[0].src} />
        </div>
      </div>

      {/* Paragraph 2 - left */}
      <p className="text-black-700 max-w-3xl mx-auto text-left mb-4">
        Bedrooms are sanctuaries of comfort and style, carefully designed to reflect your personal taste.
        Every detail, from the color palette to the furnishings, is thoughtfully chosen to create a serene and inviting atmosphere. 
        These spaces blend elegance and functionality, transforming your bedroom into a perfect retreat for relaxation and rejuvenation.
      </p>

      {/* Image 2 */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-4">
        <img
          src={rooms[1].src}
          alt={rooms[1].title}
          className="w-full h-100 object-contain transform transition-transform duration-500 hover:scale-105"
        />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-2">
          <p className="text-center font-medium text-black-800 py-2">
            {rooms[1].description}
          </p>
          <ReserveButton designTitle={rooms[1].title} category="Rooms" imageSrc={rooms[1].src} />
        </div>
      </div>

      {/* Paragraph 3 - right */}
      <p className="text-black-700 max-w-3xl mx-auto text-center mb-4">
        From cozy bedrooms to luxurious living rooms, our designs blend comfort, aesthetics, and timeless elegance.
        Let your home reflect your unique taste with spaces that inspire and delight.
      </p>

      {/* Image 3 */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-4">
        <img
          src={rooms[2].src}
          alt={rooms[2].title}
          className="w-full h-100 object-contain transform transition-transform duration-500 hover:scale-105"
        />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-2">
          <p className="text-center font-medium text-black-800 py-2">
            {rooms[2].description}
          </p>
          <ReserveButton designTitle={rooms[2].title} category="Rooms" imageSrc={rooms[2].src} />
        </div>
      </div>

      {/* Paragraph 4 */}
      <p className="text-black-700 max-w-3xl mx-auto text-center mb-4">
        Our rooms are crafted to inspire and rejuvenate. With meticulous attention to detail, every corner balances beauty,
        comfort, and timeless design, creating spaces you'll never want to leave.
      </p>

      {/* Image 4 */}
      <div className="rounded-xl overflow-hidden shadow-lg">
        <img
          src={rooms[3].src}
          alt={rooms[3].title}
          className="w-full h-100 object-contain transform transition-transform duration-500 hover:scale-105"
        />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-2">
          <p className="text-center font-medium text-black-800 py-2">
            {rooms[3].description}
          </p>
          <ReserveButton designTitle={rooms[3].title} category="Rooms" imageSrc={rooms[3].src} />
        </div>
      </div>

      {/* NEW ENHANCEMENT SECTION */}
      <div className="mt-12 text-left px-4">
        <p className="text-black-700 mb-4 text-left">
          Our room designs are a perfect blend of modern aesthetics and practical functionality. Every space is carefully planned
          to maximize comfort while maintaining a visually appealing environment that reflects your lifestyle and personality.
        </p>

        <p className="text-black-700 mb-4 text-left">
          We use premium quality materials, including high-grade wood, durable laminates, and elegant finishes, ensuring that your
          interiors not only look beautiful but also stand the test of time.
        </p>

        <p className="text-black-700 mb-8 text-left">
          From minimalist styles to luxurious interiors, our designs are fully customizable. Whether you prefer modern simplicity
          or classic elegance, we create rooms that truly feel like home.
        </p>

        {/* Why Choose Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <u>Why Choose The Wooders Rooms</u>
        </h2>

        <ul className="list-disc pl-6 text-black-700 space-y-2 mb-6">
          <li>Fully customizable designs tailored to your needs and preferences</li>
          <li>High-quality materials ensuring durability and long-lasting beauty</li>
          <li>Modern, stylish, and functional layouts for every type of room</li>
          <li>Expert craftsmanship with attention to every detail</li>
          <li>Affordable pricing with premium finishing</li>
        </ul>

        {/* Pricing Note */}
        <p className="text-black-700 mb-4">
          Prices may vary based on size, material, and customization. Contact us for an exact quote based on your requirements.
        </p>

        {/* Final CTA */}
        <p className="text-black font-semibold text-lg">
          Contact us today to get started with your custom room design in Pakistan.
        </p>
      </div>
    </div>
  );
}