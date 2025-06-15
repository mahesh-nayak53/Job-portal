import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const navItems = [
    { path: "/", title: "Search Jobs" },
    { path: "/my-job", title: "My Jobs" },
    // { path: "/salary", title: "Salary Info" },
    { path: "/post-job", title: "Post Job" },
    { path: "/save-job", title: "Saved Jobs" }
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-3 bg-white">
      <nav className="flex justify-between items-center py-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-black text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 48 48" fill="none">
            <circle cx="12" cy="12" r="3" fill="#1a3b9c" />
            <circle cx="24" cy="12" r="3" fill="#1a3b9a" />
            <circle cx="36" cy="12" r="3" fill="#06b6d4" />
            <circle cx="18" cy="24" r="3" fill="#1a3b9c" />
            <circle cx="30" cy="24" r="3" fill="#0ea5e9" />
            <circle cx="24" cy="36" r="3" fill="#06b6d4" />
          </svg>
          <div className="text-4xl font-extrabold tracking-wide">
            <span className="text-[#1a3b9c]">Job</span>
            <span className="text-[#050505]">Spring</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="flex items-center">
          <ul className="hidden md:flex gap-10 lg:gap-12">
            {navItems.map(({ path, title }) => (
              <li key={path} className="text-base">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? "text-blue-700 font-semibold" : ""
                  }
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Auth Section - Tablet and Desktop */}
          <div className="text-base text-black hidden md:block font-medium ml-6">
            {user ? (
              <div className="flex items-center gap-3">
                {/* Profile with letter and username */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-semibold text-sm md:text-base">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-black text-sm md:text-base max-w-[120px] truncate">
                    {user.email.split("@")[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-2 py-1 border rounded hover:bg-red-600 bg-[#ff4c4c] text-white text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 border rounded hover:bg-blue-700 bg-[#1a3b9c] text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5" />
            ) : (
              <FaBarsStaggered className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-white py-1">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "text-blue-400 font-bold" : ""
                }
              >
                {title}
              </NavLink>
            </li>
          ))}

          <li className="text-white py-2">
            {user ? (
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-semibold text-sm md:text-base">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white text-sm md:text-base">
                    {user.email.split("@")[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1 border rounded hover:bg-blue-700 bg-[#1a3b9c] text-white"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
