<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Complaint;
use App\Models\Quote;
use App\Models\Contact;
use App\Models\Certificate;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('Admin/Dashboard', [
            'metrics' => [
                'applications' => Application::count(),
                'complaints' => Complaint::count(),
                'quotes' => Quote::count(),
                'contacts' => Contact::count(),
                'certificates' => Certificate::count(),
            ]
        ]);
    }
}