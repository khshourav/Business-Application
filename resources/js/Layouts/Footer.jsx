import React from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer className="bg-black text-accent relative overflow-hidden">
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/images/footer2.webp')" }}
      ></div>
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-secondary">Contact Us</h3>
            <div className="flex items-center gap-3">
              <PhoneIcon className="h-6 w-6 text-secondary" />
              <a
                href="tel:+8801558105100"
                className="text-lg text-gray-300 hover:text-secondary transition-colors"
              >
                +8801558105100
              </a>
            </div>
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="h-6 w-6 text-secondary" />
              <a
                href="mailto:info@aqiservices.com"
                className="text-lg text-gray-300 hover:text-secondary transition-colors"
              >
                info@aqiservices.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPinIcon className="h-6 w-6 text-secondary" />
              <p className="text-lg text-gray-300">Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/verify-certificate"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Certificate Check
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-6">Our Services</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/social"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Social Compliance Audits
                </Link>
              </li>
              <li>
                <Link
                  href="/management"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Management Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/product-certification"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Product Certification
                </Link>
              </li>
              <li>
                <Link
                  href="/training"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Training
                </Link>
              </li>
              <li>
                <Link
                  href="/environmental-services"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  Environmental Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-6">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-secondary/30 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-secondary text-primary rounded-lg font-semibold hover:bg-accent hover:text-primary transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                Subscribe
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-center">
              Copyright © 2025 AQI Services Ltd. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/terms-of-service"
                className="text-gray-300 hover:text-secondary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy-policy"
                className="text-gray-300 hover:text-secondary transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}