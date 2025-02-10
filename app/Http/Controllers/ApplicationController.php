<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ApplicationController extends Controller
{
    // Store new application
    public function store(Request $request)
    {
        // Validate all required fields
        $validated = $request->validate([
            'company_name'                    => 'required|string|max:255',
            'tin_bin_vat_gst'                 => 'required|string|max:255',
            'factory_name'                    => 'required|string|max:255',
            'factory_address'                 => 'required|string',
            'city'                            => 'required|string',
            'postal_code'                     => 'required|string',
            'country'                         => 'required|string',
            'contact_person'                  => 'required|string',
            'contact_number'                  => 'required|string',
            'email'                           => 'required|email',
            'management_representative'       => 'required|string',
            'employees_male'                  => 'required|integer|min:0',
            'employees_female'                => 'required|integer|min:0',
            'employees_total'                 => 'required|integer|min:0',
            'factory_function'                => 'nullable|string',
            'production_processes'            => 'nullable|string',
            'product_category'                => 'nullable|string',
            'audit_type'                      => 'required|string',
            'verification_notification_method'=> 'required|string',
            'smeta'                           => 'nullable|string',
            'slcp'                            => 'nullable|string',
            'sac_higg_fem_verification'       => 'nullable|string',
            'iso_management_system_certification' => 'nullable|string',
            'outsource_process'               => 'nullable|string',
            'resources'                       => 'nullable|string',
            'brand_customer_name'             => 'nullable|string',
            'certifications'                  => 'nullable|array',
            'other_certifications'            => 'nullable|string',
            'date'                            => 'required|date',
            'authorizing_name'                => 'required|string',
            'title'                           => 'required|string',
            'signature_file_path'             => 'nullable|file|mimes:png,jpg|max:2048',
            'signature_name'                  => 'nullable|string',
        ]);

        try {
            // Handle file upload for signature
            if ($request->hasFile('signature_file_path')) {
                $path = $request->file('signature_file_path')->store('signatures', 'public');
                $validated['signature_file_path'] = $path;
            }

            // Create the application
            $application = Application::create($validated);

            // Redirect to the show page of the newly created application
            return redirect()
                ->route('applications.show', $application->uuid)
                ->with('success', 'Application submitted successfully!');
        } catch (\Exception $e) {
            Log::error('Application submission failed: ' . $e->getMessage());

            return redirect()
                ->back()
                ->with('error', 'Application submission failed. Please try again.')
                ->withInput();
        }
    }

    // Show application details (for regular users)
    public function show(Application $application)
    {
        return Inertia::render('Forms/Applications/Show', [
            'application' => $application,
            'flash'       => [
                'success' => session('success')
            ],
        ]);
    }

    // List all applications (for admin)
    public function index()
{
    $applications = Application::orderBy('created_at', 'desc')->paginate(10);

    return Inertia::render('Admin/Applications/Applications', [
        'applications' => $applications,
    ]);
}


    // Show application details (for admin)
    public function showApp(Application $application)
    {
        return Inertia::render('Admin/Applications/ShowApplication', [
            'application' => $application,
        ]);
    }

    public function edit(Application $application)
{
    return Inertia::render('Admin/Applications/EditApplication', [
        'application' => $application,
    ]);
}

public function update(Request $request, Application $application)
{
    $validated = $request->validate([
        // Add all your validation rules from the store method
        'company_name'                    => 'required|string|max:255',
            'tin_bin_vat_gst'                 => 'required|string|max:255',
            'factory_name'                    => 'required|string|max:255',
            'factory_address'                 => 'required|string',
            'city'                            => 'required|string',
            'postal_code'                     => 'required|string',
            'country'                         => 'required|string',
            'contact_person'                  => 'required|string',
            'contact_number'                  => 'required|string',
            'email'                           => 'required|email',
            'management_representative'       => 'required|string',
            'employees_male'                  => 'required|integer|min:0',
            'employees_female'                => 'required|integer|min:0',
            'employees_total'                 => 'required|integer|min:0',
            'factory_function'                => 'nullable|string',
            'production_processes'            => 'nullable|string',
            'product_category'                => 'nullable|string',
            'audit_type'                      => 'required|string',
            'verification_notification_method'=> 'required|string',
            'smeta'                           => 'nullable|string',
            'slcp'                            => 'nullable|string',
            'sac_higg_fem_verification'       => 'nullable|string',
            'iso_management_system_certification' => 'nullable|string',
            'outsource_process'               => 'nullable|string',
            'resources'                       => 'nullable|string',
            'brand_customer_name'             => 'nullable|string',
            'certifications'                  => 'nullable|array',
            'other_certifications'            => 'nullable|string',
            'date'                            => 'required|date',
            'authorizing_name'                => 'required|string',
            'title'                           => 'required|string',
            'signature_file_path'             => 'nullable|file|mimes:png,jpg|max:2048',
            'signature_name'                  => 'nullable|string',
    ]);

    try {
        // Handle file upload if needed
        if ($request->hasFile('signature_file_path')) {
            $path = $request->file('signature_file_path')->store('signatures', 'public');
            $validated['signature_file_path'] = $path;
        }

        $application->update($validated);

        return redirect()->route('admin.applications')
            ->with('success', 'Application updated successfully!');
            
    } catch (\Exception $e) {
        Log::error('Application update failed: ' . $e->getMessage());
        return redirect()->back()
            ->with('error', 'Application update failed. Please try again.')
            ->withInput();
    }
}
}
