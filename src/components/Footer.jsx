import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* LEFT SIDE */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            The Wooders
          </h2>

          <p className="text-gray-300 mb-2">
            Crafting timeless interiors with precision, passion, and elegance.
          </p>
          <p className="text-gray-300 mb-6">
            We transform your spaces into refined environments where design meets perfection.
          </p>

          {/* Contact Info */}
          <div className="space-y-4 text-gray-300">

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-yellow-400" />
              <span>
                Lahore Medical College near Opp, Masjid Taqwa Harbanspura, Lahore, Pakistan
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-yellow-400" />
              <span>thewooders@gmail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-yellow-400" />
              <span>+92 322 4094950</span>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 flex flex-col md:items-end">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">
            Quick Links
          </h3>

          <ul className="grid grid-cols-2 gap-3 text-gray-300">
            <li><a href="/" className="hover:text-yellow-400">Home</a></li>
            <li><a href="/rooms" className="hover:text-yellow-400">Rooms</a></li>
            <li><a href="/kitchens" className="hover:text-yellow-400">Kitchens</a></li>
            <li><a href="/wardrobes" className="hover:text-yellow-400">Wardrobes</a></li>
            <li><a href="/tables" className="hover:text-yellow-400">Tables</a></li>
            <li><a href="/doors" className="hover:text-yellow-400">Doors</a></li>
            <li><a href="/vanities" className="hover:text-yellow-400">Vanities</a></li>
            <li><a href="/about" className="hover:text-yellow-400">About</a></li>
            <li><a href="/contact" className="hover:text-yellow-400">Contact</a></li>
            <li><a href="/services" className="hover:text-yellow-400">Services</a></li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a
              href="https://www.instagram.com/the.wooders?igsh=aHdvdzN5bWplN3hk&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@adeelahmad4440?_r=1&_t=ZS-95HbIPeTjOO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition text-2xl"
            >
              <FaTiktok />
            </a>
            <a
              href="https://youtube.com/@thewooders-i1p?si=hT7xlTPlT99pxAdX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition text-2xl"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} The Wooders. Crafted with passion.
      </div>
    </footer>
  );
}