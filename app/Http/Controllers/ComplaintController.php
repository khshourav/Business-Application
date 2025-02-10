<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Complaint;

class ComplaintController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'nullable|string|max:255',
        'company_name' => 'nullable|string|max:255',
        'email' => 'nullable|email|max:255',
        'subject' => 'required|string|max:255',
        'complaint' => 'required|string',
        'is_anonymous' => 'boolean'
    ]);

    Complaint::create($validated);

    return redirect()->route('complaint.success');
}

public function index()
{
    $complaints = Complaint::orderBy('created_at', 'desc')
        ->paginate(10)
        ->through(function ($complaint) {
            return [
                'id' => $complaint->id,
                'created_at' => $complaint->created_at,
                'subject' => $complaint->subject,
                'name' => $complaint->name,
                'company_name' => $complaint->company_name,
                'email' => $complaint->email,
                'complaint' => $complaint->complaint,
                'is_anonymous' => $complaint->is_anonymous
            ];
        });

    return Inertia::render('Admin/Complaints', [
        'complaints' => $complaints
    ]);
}

}
