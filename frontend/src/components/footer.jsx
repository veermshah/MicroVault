import React from 'react';
import MicroVaultLogo from '../assets/MicroVault.png'; 

const Footer = () => {
  return (
    <footer className="bg-white"> {/* Changed background to white */}
      {/* 
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <img src={MicroVaultLogo} alt="MicroVault Logo" className="h-24 w-auto mb-4" />
          </div>
          <div>
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Services</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">contact@microvault.com</li>
              <li className="text-gray-600">(123) 456-7890</li>
            </ul>
          </div>
        </div>
      </div> 
      */}

      {/* Copyright Section */}
      {/* <div className="bg-white py-4"> 
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2024 MicroVault. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;