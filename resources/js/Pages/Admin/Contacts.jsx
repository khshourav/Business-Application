import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AdminNav from './AdminNav';

export default function Contacts({ contacts }) {
  const [selectedContact, setSelectedContact] = useState(null);
  const { data, links, from, to, total } = contacts;

  // Define the maximum number of characters for manual truncation fallback
  // (You may also use Tailwind's 'truncate' class instead)
  const TRUNCATE_LENGTH = 10;

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Contacts Management
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Table Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((contact) => {
                    // Truncate the message using JavaScript as fallback
                    const isLong = contact.message.length > TRUNCATE_LENGTH;
                    const truncatedMessage = isLong
                      ? contact.message.substring(0, TRUNCATE_LENGTH) + '...'
                      : contact.message;

                    return (
                      <tr key={contact.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {contact.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {contact.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {contact.company || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 break-all">
                          {contact.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {contact.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="block overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {truncatedMessage}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedContact(contact)}
                            className="text-accent bg-primary/80 px-2 py-1 rounded hover:text-secondary font-medium text-sm"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {from} to {to} of {total} results
              </div>
              <div className="flex space-x-2">
                {links.prev && (
                  <Link
                    href={links.prev}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 text-sm font-medium"
                    preserveScroll
                  >
                    Previous
                  </Link>
                )}
                {links.next && (
                  <Link
                    href={links.next}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 text-sm font-medium"
                    preserveScroll
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setSelectedContact(null)}
          />
          
          {/* Modal Container */}
          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full p-6 z-10 overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedContact.name}
                </h2>
                <p className="text-gray-500 mt-1">
                  Contact ID: #{selectedContact.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 uppercase mb-1">
                      Name
                    </dt>
                    <dd className="text-xl text-gray-900">
                      {selectedContact.name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 uppercase mb-1">
                      Company
                    </dt>
                    <dd className="text-xl text-gray-900">
                      {selectedContact.company || 'N/A'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 uppercase mb-1">
                      Email
                    </dt>
                    <dd className="text-xl text-gray-900 break-all">
                      {selectedContact.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 uppercase mb-1">
                      Subject
                    </dt>
                    <dd className="text-xl text-gray-900">
                      {selectedContact.subject}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Message
                </h3>
                <div className="prose prose-sm max-w-none text-gray-900 whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
