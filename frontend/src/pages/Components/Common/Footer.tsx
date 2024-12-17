import React from 'react';
import { FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="lg:w-1/3 mb-6 md:mb-0">
            <h1 className="text-3xl font-bold text-orange-500 mb-2">Infinity School</h1>
            <p className="text-gray-300 text-sm leading-6">
              Empowering continuous growth and development through tailored learning experiences.
            </p>
            <div className="flex mt-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-gray-100 mr-4 transition duration-300">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-gray-100 mr-4 transition duration-300">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-gray-100 transition duration-300">
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="lg:w-1/3 lg:text-center mb-6 md:mb-0 leading-10">
            <h2 className="text-xl text-gray-300 mb-3">Quick Links</h2>
            <ul className="list-none">
              <li>
                <a href="/about" className="text-gray-300 hover:text-gray-100 transition duration-300">About Us</a>
              </li>
             
              <li>
                <a href="/contact" className="text-gray-300 hover:text-gray-100 transition duration-300">Contact</a>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/3 leading-10">
            <h2 className="text-xl text-gray-300 mb-3">Contact Us</h2>
            <ul className="list-none">
              <li className="flex items-center text-gray-300 hover:text-gray-100 transition duration-300">
                <FaPhone className="mr-2" /> +1 234 567 890
              </li>
              <li className="flex items-center text-gray-300 hover:text-gray-100 transition duration-300">
                <FaEnvelope className="mr-2" /> info@progressionschool.com
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-400 text-sm">
          © 2024 Progression School. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
