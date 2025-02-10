import React, { useRef } from 'react';
import { usePage } from '@inertiajs/react';
import html2pdf from 'html2pdf.js';

export default function ShowApplication() {
  const { application } = usePage().props;
  const componentRef = useRef(); // Ref for the content to print

  // Format the date to ISO standard (YYYY-MM-DD)
  const formattedDate = new Date(application.date)
    .toISOString()
    .split('T')[0];

  // Parse certifications JSON field if available
  let certifications = [];
  if (application.certifications) {
    try {
      certifications = JSON.parse(application.certifications);
    } catch (error) {
      console.error('Error parsing certifications:', error);
    }
  }

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    const element = componentRef.current;
    const downloadButton = element.querySelector('#download-button');

    // Hide the download button before generating the PDF
    if (downloadButton) {
      downloadButton.style.display = 'none';
    }

    const options = {
      margin: 10,
      filename: `Application_${application.application_number}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Generate and download the PDF
    html2pdf()
      .from(element)
      .set(options)
      .save()
      .then(() => {
        // Re-show the download button after PDF generation
        if (downloadButton) {
          downloadButton.style.display = 'block';
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        ref={componentRef}
      >
        {/* Header */}
        <div className="bg-primary px-4 py-4">
          <h1 className="text-xl font-bold text-white text-center">
            Application Details - {application.application_number}
          </h1>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Panel 1: Company, Factory & Employee Information */}
          <div className="bg-gray-50 p-6 rounded border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Company, Factory & Employee Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Company and Factory Information */}
              <div className="space-y-2">
                {/* Company Basic Information */}
                <p className="text-gray-700">
                  <strong>Company Name:</strong> {application.company_name}
                </p>
                <p className="text-gray-700">
                  <strong>TIN/BIN/VAT/GST:</strong> {application.tin_bin_vat_gst}
                </p>
                {/* Factory Information */}
                <p className="text-gray-700">
                  <strong>Factory Name:</strong> {application.factory_name}
                </p>
                <p className="text-gray-700">
                  <strong>Factory Address:</strong> {application.factory_address}
                </p>
                <p className="text-gray-700">
                  <strong>City:</strong> {application.city}
                </p>
                <p className="text-gray-700">
                  <strong>Postal Code:</strong> {application.postal_code}
                </p>
                <p className="text-gray-700">
                  <strong>Country:</strong> {application.country}
                </p>
                
              </div>
              {/* Right Column: Employee Information */}
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Male Employees:</strong> {application.employees_male}
                </p>
                <p className="text-gray-700">
                  <strong>Female Employees:</strong> {application.employees_female}
                </p>
                <p className="text-gray-700">
                  <strong>Total Employees:</strong> {application.employees_total}
                </p>
                <p className="text-gray-700">
                  <strong>Factory Function:</strong>{' '}
                  {application.factory_function || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Production Processes:</strong>{' '}
                  {application.production_processes || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Product Category:</strong>{' '}
                  {application.product_category || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Panel 2: Audit, Verification & Certifications */}
          <div className="bg-gray-50 p-6 rounded border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Audit, Verification & Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Audit & Verification */}
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Audit Type:</strong> {application.audit_type}
                </p>
                <p className="text-gray-700">
                  <strong>Verification Method:</strong>{' '}
                  {application.verification_notification_method}
                </p>
                <p className="text-gray-700">
                  <strong>SMETA:</strong> {application.smeta || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>SLCP:</strong> {application.slcp || 'N/A'}
                </p>
              </div>
              {/* Right Column: Additional Verification & Certifications */}
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>SAC Higg FEM Verification:</strong>{' '}
                  {application.sac_higg_fem_verification || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>ISO Management System Certification:</strong>{' '}
                  {application.iso_management_system_certification || 'N/A'}
                </p>
                
                {application.certifications && application.certifications.length > 0 ? (
    application.certifications.map((cert, index) => (
      <p key={index} className="text-gray-700">
        <strong>Certification {index + 1}:</strong> {cert}
      </p>
    ))
  ) : (
    <p className="text-gray-700">
      <strong>Certifications:</strong> N/A
    </p>
  )}

                <p className="text-gray-700">
                  <strong>Other Certifications:</strong>{' '}
                  {application.other_certifications || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Panel 3: Additional Information, Contact & Signature */}
          <div className="bg-gray-50 p-6 rounded border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Additional Information, Contact & Signature
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Additional Information */}
              <div className="space-y-2">
               
                
                <p className="text-gray-700">
                  <strong>Contact Person:</strong> {application.contact_person}
                </p>
                <p className="text-gray-700">
                  <strong>Contact Number:</strong> {application.contact_number}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {application.email}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {formattedDate}
                </p>
              </div>
              {/* Right Column: Contact Information & Signature */}
              <div className="space-y-2">
              
                <p className="text-gray-700">
                  <strong>Authorizing Name:</strong> {application.authorizing_name}
                </p>
                <p className="text-gray-700">
                  <strong>Title:</strong> {application.title}
                </p>
                <div className="mt-4 space-y-2">
                  {application.signature_file_path ? (
                    <img
                      src={`/storage/${application.signature_file_path}`}
                      alt="Signature"
                      className="w-40"
                    />
                  ) : (
                    <p className="text-gray-700">No signature file provided.</p>
                  )}
                  <p className="text-gray-700">
                    <strong>Signature Name:</strong> {application.signature_name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="mt-8 flex justify-center">
            <button
              id="download-button"
              onClick={handleDownloadPDF}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition shadow"
            >
              Download as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

