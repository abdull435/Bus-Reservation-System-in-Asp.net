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
            <img src="./Images/insta.png" className='cursor-pointer' alt="" />
            <img src="./Images/facebook.png" className='cursor-pointer' alt="" />
            <img src="./Images/whatsapp.png" className='cursor-pointer'/>
            <img src="./Images/twitter.png "className='cursor-pointer' />
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
