import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import AdminNav from '../AdminNav';
export default function Index({ certificates }) {
  const { data, links, from, to, total } = certificates;
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Certificates
        </h1>
        <Link
          href={route('admin.certificates.create')}
          className="mb-4 inline-block bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary-dark transition-colors"
        >
          Create Certificate
        </Link>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Certificate ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Holder Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Issued Date
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                    {cert.id}
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                    {cert.certificate_id}
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                    {cert.holder_name}
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                    {cert.category}
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                    {cert.issued_date
                      ? new Date(cert.issued_date).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                    {cert.expiry_date
                      ? new Date(cert.expiry_date).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                    <Link
                      href={route('admin.certificates.edit', cert.id)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-xs sm:text-sm"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-sm text-gray-600 mb-2 sm:mb-0">
            Showing {from} to {to} of {total} results
          </div>
          <div className="flex space-x-2">
            {links.prev && (
              <Link
                href={links.prev}
                preserveScroll
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 text-xs sm:text-sm font-medium"
              >
                Previous
              </Link>
            )}
            {links.next && (
              <Link
                href={links.next}
                preserveScroll
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 text-xs sm:text-sm font-medium"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
