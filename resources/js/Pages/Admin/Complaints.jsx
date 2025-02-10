import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AdminNav from './AdminNav';

export default function Complaints({ complaints }) {
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Complaints Management
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {complaints.data.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">
                        {new Date(complaint.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">
                        {complaint.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedComplaint(complaint)}
                          className="text-accent bg-primary/80 px-2 py-1 rounded hover:text-secondary font-medium text-lg"
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
              <div className="text-lg text-gray-600">
                Showing {complaints.from} to {complaints.to} of {complaints.total}{' '}
                results
              </div>
              <div className="flex space-x-2">
                {complaints.links.prev && (
                  <Link
                    href={complaints.links.prev}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 text-lg font-medium"
                  >
                    Previous
                  </Link>
                )}
                {complaints.links.next && (
                  <Link
                    href={complaints.links.next}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 text-lg font-medium"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
    <div
      className="fixed inset-0 bg-black/30 transition-opacity"
      onClick={() => setSelectedComplaint(null)}
    ></div>
    <div className="relative bg-white rounded-xl shadow-2xl max-w-5xl w-full mx-4 z-10 overflow-hidden">
      <div className="flex justify-between items-center p-5 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">
          Complaint Details
        </h2>
        <button
          onClick={() => setSelectedComplaint(null)}
          className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="overflow-y-auto max-h-[calc(100vh-8rem)] p-5">
        <div className="space-y-5">
          {/* Subject Card */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Subject
            </label>
            <p className="mt-1 text-gray-900 font-bold text-xl">
              {selectedComplaint.subject}
            </p>
          </div>

          {/* Message Card */}
          <div className="p-4 bg-blue-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Message
            </label>
            <div className="mt-2 prose max-w-none text-gray-900 overflow-y-auto max-h-72">
              <pre className="whitespace-pre-wrap font-sans text-xl leading-relaxed">
                {selectedComplaint.complaint}
              </pre>
            </div>
          </div>

          {/* Other Details */}
          {selectedComplaint.is_anonymous ? (
            <div className="px-4 py-3 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-gray-600 italic font-medium text-lg">Anonymous Complaint</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </label>
                  <p className="text-gray-900 font-semibold text-lg">
                    {selectedComplaint.name}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Company
                  </label>
                  <p className="text-gray-900 font-semibold text-lg">
                    {selectedComplaint.company_name}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </label>
                <p className="text-gray-900 font-semibold text-lg break-all">
                  {selectedComplaint.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end p-5 border-t border-gray-100">
        <button
          onClick={() => setSelectedComplaint(null)}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors duration-200"
        >
          Close Details
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
