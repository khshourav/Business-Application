import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import AdminNav from './AdminNav';
import {
  FaFileAlt,
  FaExclamationCircle,
  FaQuoteRight,
  FaAddressBook,
  FaCertificate,
  FaArrowRight
} from 'react-icons/fa';

export default function Dashboard() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  const cards = [
    {
      title: 'Applications',
      label: 'Manage Applications',
      icon: <FaFileAlt className="w-6 h-6" />,
      color: 'bg-blue-100',
      route: 'admin.applications'
    },
    {
      title: 'Complaints',
      label: 'Manage Complaints',
      icon: <FaExclamationCircle className="w-6 h-6" />,
      color: 'bg-red-100',
      route: 'admin.complaints'
    },
    {
      title: 'Quotes',
      label: 'Manage Quotes',
      icon: <FaQuoteRight className="w-6 h-6" />,
      color: 'bg-green-100',
      route: 'admin.quotes'
    },
    {
      title: 'Contacts',
      label: 'Manage Contacts',
      icon: <FaAddressBook className="w-6 h-6" />,
      color: 'bg-purple-100',
      route: 'admin.contacts'
    },
    {
      title: 'Certificates',
      label: 'Manage Certificates',
      icon: <FaCertificate className="w-6 h-6" />,
      color: 'bg-yellow-100',
      route: 'admin.certificates.index'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div
        className={`p-6 max-w-7xl mx-auto transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's your daily summary.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={route(card.route)}
              className="group bg-white p-6 rounded-xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg ${card.color} flex-shrink-0`}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {card.label}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      View and manage all {card.title.toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="p-2 group-hover:bg-gray-100 rounded-full transition-colors">
                  <FaArrowRight className="text-gray-400 group-hover:text-gray-600" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        
      </div>
    </div>
  );
}
