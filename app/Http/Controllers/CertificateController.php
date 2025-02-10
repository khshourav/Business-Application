<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificateController extends Controller
{


    public function verify()
{
    // Get the certificate and flash messages from the session.
    $certificate = session('certificate');
    $success = session('success');
    $error = session('error');
    
    return Inertia::render('Forms/Certificate/VerifyCertificate', [
        'certificate' => $certificate, // certificate data
        'flash' => [
            'success' => $success,
            'error'   => $error,
        ],
    ]);
}

public function checkVerification(Request $request)
{
    $request->validate([
        'certificate_id' => 'required|string',
        'category'       => 'required|string',
    ]);

    // Check if a record exists with both certificate_id and category
    $certificate = Certificate::where('certificate_id', $request->certificate_id)
                              ->where('category', $request->category)
                              ->first();

    if ($certificate) {
        return redirect()
            ->route('Forms/Certificate/VerifyCertificate')
            ->with('certificate', $certificate->toArray()) // Pass as array
            ->with('success', 'Certificate is valid!');
    } else {
        return redirect()
            ->route('Forms/Certificate/VerifyCertificate')
            ->with('error', 'Certificate not found or category mismatch!');
    }
}


    // Display a listing of the certificates.
    public function index()
    {
        $certificates = Certificate::orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Admin/Certificates/Index', [
            'certificates' => $certificates,
        ]);
    }

    // Show form for creating a certificate.
    public function create()
    {
        return Inertia::render('Admin/Certificates/Create');
    }

    // Store a new certificate.
    public function store(Request $request)
    {
        $validated = $request->validate([
            'certificate_id' => 'required|string|unique:certificates',
            'holder_name'    => 'required|string',
            'issued_date'    => 'nullable|date',
            'expiry_date'    => 'nullable|date',
            'category'       => 'required|string',
        ]);

        Certificate::create($validated);

        return redirect()->route('admin.certificates.index')
            ->with('success', 'Certificate created successfully!');
    }

    // Show form for editing the certificate.
    public function edit(Certificate $certificate)
    {
        return Inertia::render('Admin/Certificates/Edit', [
            'certificate' => $certificate,
        ]);
    }

    // Update the certificate.
    public function update(Request $request, Certificate $certificate)
    {
        $validated = $request->validate([
            'certificate_id' => 'required|string|unique:certificates,certificate_id,' . $certificate->id,
            'holder_name'    => 'required|string',
            'issued_date'    => 'nullable|date',
            'expiry_date'    => 'nullable|date',
            // 'category'       => 'required|in:ISO 9001,ISO 14001,ISO 45001',
            'category'       => 'required|string',
        ]);

        $certificate->update($validated);

        return redirect()->route('admin.certificates.index')
            ->with('success', 'Certificate updated successfully!');
    }

    // Optionally, add a destroy method for deletion.
    public function destroy(Certificate $certificate)
    {
        $certificate->delete();

        return redirect()->route('admin.certificates.index')
            ->with('success', 'Certificate deleted successfully!');
    }
}
