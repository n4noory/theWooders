import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.jpg";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/rooms", label: "ROOMS" },
    { to: "/kitchens", label: "KITCHENS" },
    { to: "/wardrobes", label: "WARDROBES" },
    { to: "/tables", label: "TABLES" },
    { to: "/doors", label: "DOORS" },
    { to: "/vanities", label: "VANITIES" },
    { to: "/about", label: "ABOUT" },
    { to: "/contact", label: "CONTACT" },
    { to: "/services", label: "SERVICES" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#f7c302] shadow-md w-full fixed top-0 left-0 z-50 transition-all duration-300 hover:shadow-xl hover:border-b-4 hover:border-black">
      <div className="flex items-center justify-between px-4 xl:px-8 py-4 relative">

        {/* LEFT - LOGO */}
        <div className="flex items-center ml-10 xl:ml-18">
          <img
            src={logo}
            alt="The Wooders"
            className="h-16 scale-155 origin-left object-contain"
          />
        </div>

        {/* CENTER - NAV LINKS (Desktop only ≥1280px) */}
        <div className="hidden xl:flex absolute left-1/2 transform -translate-x-1/2 gap-6 font-medium text-black">
          {navLinks.map((nav) => (
            <NavLink
              key={nav.to}
              to={nav.to}
              className={({ isActive }) =>
                `relative font-bold hover:text-blue-100 transition
                after:absolute after:left-0 after:-bottom-1 after:h-0.5 
                after:bg-black after:w-0 after:transition-all after:duration-300
                ${isActive ? "after:w-full" : ""}`
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </div>

        {/* RIGHT - AUTH BUTTONS (Desktop only ≥1280px) */}
        <div className="hidden xl:flex items-center gap-3">
          {user ? (
            <>
              {/* Dashboard Button */}
              <NavLink
                to="/dashboard"
                className="relative overflow-hidden bg-black text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
              >
                {/* <span className="text-yellow-400"></span> */}
                Dashboard
                {/* <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl"></span> */}
              </NavLink>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="relative overflow-hidden bg-white text-black px-5 py-2 rounded-xl font-bold border-2 border-black hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2"
              >
                Logout
              </button>
            </>
          ) : (
            /* Login Button */
            <NavLink
              to="/login"
              className="relative overflow-hidden bg-black text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
            >
              {/* <span className="text-yellow-400">👤</span> */}
              Login
              {/* <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl"></span> */}
            </NavLink>
          )}
        </div>

        {/* MOBILE / TABLET MENU BUTTON */}
        <div className="xl:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className="h-6 w-6 text-black" />
            ) : (
              <HiMenu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE / TABLET MENU */}
      {menuOpen && (
        <div className="xl:hidden bg-[#f7c302] px-4 pb-4">
          <div className="flex flex-col gap-4 text-black font-medium">
            {navLinks.map((nav) => (
              <NavLink
                key={nav.to}
                to={nav.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `relative font-bold hover:text-yellow-600 transition
                  after:absolute after:left-0 after:-bottom-1 after:h-0.5 
                  after:bg-black after:w-0 after:transition-all after:duration-300
                  ${isActive ? "after:w-full" : ""}`
                }
              >
                {nav.label}
              </NavLink>
            ))}

            {/* Mobile Auth Buttons */}
            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="bg-black text-white px-4 py-2 rounded-xl font-bold text-center shadow-md flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300"
                >
                  <span className="text-yellow-400">⚡</span>
                  Dashboard
                </NavLink>
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="bg-white text-black px-4 py-2 rounded-xl font-bold border-2 border-black text-left flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-300 shadow-md"
                >
                  <span>🚪</span>
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-black text-white px-4 py-2 rounded-xl font-bold text-center shadow-md flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300"
              >
                <span className="text-yellow-400">👤</span>
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}