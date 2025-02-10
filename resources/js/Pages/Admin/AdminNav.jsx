import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaFileAlt, 
  FaExclamationCircle, 
  FaCommentsDollar,
  FaEnvelope,
  FaCertificate,
  FaSignOutAlt
} from 'react-icons/fa';

export default function AdminNav() {
  const { post } = useForm();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    post(route('logout'));
  };

  const navLinks = [
    { label: 'Dashboard', route: 'admin.dashboard', icon: FaHome },
    { label: 'Applications', route: 'admin.applications', icon: FaFileAlt },
    { label: 'Complaints', route: 'admin.complaints', icon: FaExclamationCircle },
    { label: 'Quotes', route: 'admin.quotes', icon: FaCommentsDollar },
    { label: 'Contacts', route: 'admin.contacts', icon: FaEnvelope },
    { label: 'Certificates', route: 'admin.certificates.index', icon: FaCertificate },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Branding */}
          <Link
            href={route('admin.dashboard')}
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-bold text-white tracking-tight transition-colors">
              Admin Portal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={index}
                  href={route(link.route)}
                  className="flex items-center space-x-1 text-gray-100 hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span className="relative group-hover:after:scale-x-100 group-hover:after:opacity-100 after:block after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:opacity-0 after:transition-all">
                    {link.label}
                  </span>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="ml-4 flex items-center space-x-1 px-3 py-2 rounded-md text-gray-100 hover:bg-indigo-700 transition-colors"
            >
              <FaSignOutAlt className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-100 hover:bg-indigo-700 transition-colors"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-xl transition-all duration-300 ease-out">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={index}
                  href={route(link.route)}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
            <button
              onClick={(e) => {
                setMenuOpen(false);
                handleLogout(e);
              }}
              className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
