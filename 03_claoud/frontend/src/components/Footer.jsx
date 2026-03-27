import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter, FiPhoneCall, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>❄️</span>
              AC Services
            </h3>
            <p className="text-gray-400 mb-4">
              Professional AC servicing and repair services at your doorstep.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#services" className="hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>AC Installation</li>
              <li>AC Repair</li>
              <li>Gas Refill</li>
              <li>Maintenance</li>
              <li>Cleaning</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center gap-3">
                <FiPhoneCall className="text-blue-500" />
                <span>+91 123-456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-blue-500" />
                <span>info@acservices.com</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2024 AC Services. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
