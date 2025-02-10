<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ContactController extends Controller
{
    // app/Http/Controllers/ContactController.php
public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string'
        ]);
    } catch (ValidationException $e) {
        return back()
            ->withErrors($e->errors())
            ->withInput(); // Crucial for preserving form data
    }

    Contact::create($validated);
    return redirect()->route('contact.success');
}

public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Contacts', [
            'contacts' => $contacts,
        ]);
    }
}