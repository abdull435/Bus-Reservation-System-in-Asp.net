import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">

          <div className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Bus Reservation System. All rights reserved.
          </div>

          <div className="flex space-x-6 text-sm">
            <a href="/about" className="hover:text-gray-300">About</a>
            <a href="/contact" className="hover:text-gray-300">Contact</a>
            <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
