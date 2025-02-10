<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuoteController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'services'        => 'required|array',
            'company_name'    => 'required|string|max:255',
            'contact_person'  => 'required|string|max:255',
            'email'           => 'required|email',
            'phone'           => 'required|string|max:20',
            'additional_info' => 'nullable|string',
        ]);

        Quote::create($validated);

        return redirect()->route('quote.success');
    }

    public function index()
    {
        $quotes = Quote::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Quotes', [
            'quotes' => $quotes,
        ]);
    }

    /**
     * Update the specified quote's state.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Quote  $quote
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Quote $quote)
    {
        $validated = $request->validate([
            'state' => 'required|in:pending,in_progress,completed',
        ]);

        $quote->update($validated);

        return redirect()
            ->route('admin.quotes')
            ->with('success', 'Quote updated successfully!');
    }
}
