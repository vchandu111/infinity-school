import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { FiUser, FiLogOut } from "react-icons/fi";
import { MdOutlineSchool } from "react-icons/md";
import {AiOutlineProfile} from "react-icons/ai"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiAccountCircleFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>("");
    const router = useRouter()
  // Navigation links array with labels and src
  const navLinks = [
    { label: "Home", src: "/" },
    { label: "About", src: "/about" },
    { label: "Courses", src: "/courses" },
    { label: "Pages", src: "/pages" },
    { label: "Blog", src: "/blog" },
    { label: "Contacts", src: "/contacts" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("userName");
    if (token && name) {
      setIsAuthenticated(true);
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserName(null);
  };

  return (
    <nav className=" m-auto absolute top-0 left-0 right-0 flex items-center justify-between p-4 px-8 bg-gray-900 text-white z-10 shadow-xl">
          {/* Logo */}
      <div className="text-2xl font-bold">Infinity School</div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <ul className="flex space-x-6">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a href={link.src} className="hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg text-white hover:bg-gray-700">
                <FiUser size={20} />
                <span>{userName}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-700 border-0 text-white shadow-lg rounded-md p-2">
              <DropdownMenuItem
                className="hover:bg-gray-600 flex items-center space-x-2"
                onClick={() => router.push("/instructor")}
              >
                <MdOutlineSchool size={20} />
                <span>Instructor View</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-gray-600 flex items-center space-x-2"
                onClick={() => alert("Go to My Profile")}
              >
                <AiOutlineProfile size={20} />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-gray-600 flex items-center space-x-2 text-red-500"
                onClick={handleLogout}
              >
                <FiLogOut size={20} />
                <span className="font-bold">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <a
            href="/signup"
            className="ml-6 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
          >
            Register
          </a>
        )}
      </div>

      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="block md:hidden focus:outline-none"
      >
        {isMenuOpen ? (
          <IoCloseOutline size={32} />
        ) : (
          <GiHamburgerMenu size={32} />
        )}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 text-white md:hidden py-8">
          <ul className="flex flex-col space-y-4 py-4 px-6">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a href={link.src} className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-6 mt-4">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-4">
                <p>My Profile</p>
                <p>Instructor View</p>
                <button
                  onClick={handleLogout}
                  className="w-full flex justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
                >
                  <FiLogOut size={20} className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/signup"
                className="w-full block text-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
              >
                Register
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
