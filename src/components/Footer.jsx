import React from 'react';
import { Link } from 'react-router-dom';
import { RiTwitterXFill } from 'react-icons/ri';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10 border-t border-base-300">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand / About Section */}
        <div>
          <h2 className=" font-bold text-primary mb-2">
            Freelance<span className="text-neutral">MarketPlace</span>
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Your one-stop platform to find, post, and manage freelance jobs
            across the globe. Empowering talent and businesses to connect and
            platform collaborate.
          </p>

          <div className="flex gap-3 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition"
            >
              <RiTwitterXFill />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/allJobs" className="hover:text-primary transition">
                Browse Jobs
              </Link>
            </li>
            <li>
              <Link to="/addJob" className="hover:text-primary transition">
                Post a Job
              </Link>
            </li>
            <li>
              <Link
                to="/my-accepted-tasks"
                className="hover:text-primary transition"
              >
                My Tasks
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-primary transition">
                Join Now
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.mongodb.com/atlas"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition"
              >
                MongoDB Atlas
              </a>
            </li>
            <li>
              <a
                href="https://firebase.google.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition"
              >
                Firebase Auth
              </a>
            </li>
            <li>
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition"
              >
                React Docs
              </a>
            </li>
            <li>
              <a
                href="https://expressjs.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition"
              >
                Express.js Guide
              </a>
            </li>
            <li>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition"
              >
                TailwindCSS
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-primary" />
              support@freelancemarket.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary" /> +880 1234 567 890
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-base-300 text-center py-4 text-sm text-gray-600 border-t border-base-200">
        © {new Date().getFullYear()} Freelance MarketPlace — All Rights
        Reserved.
        <br />
        <span className="text-xs text-gray-500">
          Built with ❤️ using MERN Stack | Firebase | TailwindCSS
        </span>
      </div>
    </footer>
  );
};

export default Footer;
