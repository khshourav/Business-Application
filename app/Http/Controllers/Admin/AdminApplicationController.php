<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Application;

class AdminApplicationController extends Controller
{
    public function index()
    {
        return inertia('Admin/Applications/Index', [
            'applications' => Application::latest()->paginate(10),
        ]);
    }

    public function show(Application $application)
    {
        return inertia('Admin/Applications/Show', [
            'application' => $application,
        ]);
    }
}
