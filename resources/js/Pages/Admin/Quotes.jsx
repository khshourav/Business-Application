import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminNav from './AdminNav';

export default function Quotes({ quotes }) {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const { data, links, from, to, total } = quotes;

  // Handler to update (persist) the state change via Inertia
  const handleSave = () => {
    Inertia.put(route('admin.quotes.update', selectedQuote.id), {
      state: selectedQuote.state,
    }, {
      onSuccess: () => {
        setSelectedQuote(null);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Quotes Management</h1>
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
                      Company Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Services
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Additional Info
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {quote.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {quote.company_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {Array.isArray(quote.services)
                          ? quote.services.join(', ')
                          : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-700">
                        {quote.additional_info || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-700">
                        {quote.state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedQuote(quote)}
                          className="text-accent bg-primary/80 px-2 py-1 rounded hover:text-secondary font-medium text-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
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
                  >
                    Previous
                  </Link>
                )}
                {links.next && (
                  <Link
                    href={links.next}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 text-sm font-medium"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setSelectedQuote(null)}
          />

          {/* Modal Container */}
          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full p-6 z-10 overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedQuote.company_name}
                </h2>
                <p className="text-gray-500 mt-1">Quote ID: #{selectedQuote.id}</p>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Contact Information
                  </h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-500">Contact Person</dt>
                      <dd className="font-medium text-gray-900">
                        {selectedQuote.contact_person}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Email</dt>
                      <dd className="font-medium text-gray-900 break-all">
                        {selectedQuote.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Phone</dt>
                      <dd className="font-medium text-gray-900">
                        {selectedQuote.phone || 'N/A'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Status & Timeline
                  </h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-500">Current State</dt>
                      <dd>
                        <select
                          value={selectedQuote.state}
                          onChange={(e) =>
                            setSelectedQuote({
                              ...selectedQuote,
                              state: e.target.value,
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        >
                          <option value="pending">pending</option>
                          <option value="in_progress">in_progress</option>
                          <option value="completed">completed</option>
                        </select>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Created</dt>
                      <dd className="font-medium text-gray-900">
                        {new Date(selectedQuote.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Last Updated</dt>
                      <dd className="font-medium text-gray-900">
                        {new Date(selectedQuote.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Services Requested
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedQuote.services.map((service, index) => (
                      <li key={index} className="font-medium text-gray-900">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Additional Information
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-900 whitespace-pre-wrap">
                    {selectedQuote.additional_info || 'No additional information provided'}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
