<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ComplaintController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CertificateController;
use \App\Http\Controllers\Admin\DashboardController;

// Home page Route
Route::get('/', function () {
    return Inertia::render('Home/Home');
})->name('index');

// About page Route
Route::get('/about', function () {
    return Inertia::render('About/About');
})->name('about');

// Services and other pages
Route::inertia('/services', 'Services/Services')->name('services'); // Added ->name('services')
Route::inertia('/social', 'Services/Social/Social');
Route::inertia('/bsci', 'Services/Social/BSCI');
Route::inertia('/wrap', 'Services/Social/WRAP');
Route::inertia('/ctpat', 'Services/Social/CTPAT');
Route::inertia('/smeta', 'Services/Social/SMETA');
Route::inertia('/risk-assessment', 'Services/Social/RiskAssessment');
Route::inertia('/management', 'Services/Management/ManagementSystems');
Route::inertia('/iso-9001', 'Services/Management/ISO9001');
Route::inertia('/iso-14001', 'Services/Management/ISO14001');
Route::inertia('/iso-45001', 'Services/Management/ISO45001');
Route::inertia('/iso-50001', 'Services/Management/ISO50001');
Route::inertia('/product-certification', 'Services/Product/ProductCertification');
Route::inertia('/certificate-check', 'Application/CertificateCheck');
Route::inertia('/training', 'Services/Training/TrainingPage');
Route::inertia('/environmental-services', 'Services/Environmental/Environmental');
Route::inertia('/resources', 'Resources/Resources');

// Application form routes
Route::get('/applications/{application:uuid}', [ApplicationController::class, 'show'])
    ->name('applications.show');
Route::inertia('/application', 'Forms/Applications/ApplicationForm')->name('application');
Route::post('/post-application', [ApplicationController::class, 'store'])->name('application.store');

// Complain Form
Route::inertia('/complain', 'Forms/Complain/ComplainForm');
Route::post('/submit-complaint', [ComplaintController::class, 'store'])->name('complaint.store');
Route::inertia('/complaint-success', 'Forms/Complain/ComplaintSuccess')->name('complaint.success');

// Get Quote page Route
Route::inertia('/get-quote', 'Forms/Quote/GetQuote')->name('get-quote');
Route::post('/submit-quote-request', [QuoteController::class, 'store'])->name('quote.store');
Route::inertia('/quote-success', 'Forms/Quote/QuoteSuccess')->name('quote.success');

// Contact page Route
Route::middleware(['web'])->group(function () {
    
});

Route::inertia('/contact', 'Forms/Contact/ContactUs')->name('contact');
    Route::post('/submit-contact-form', [ContactController::class, 'store'])->name('contact.store');
    Route::inertia('/contact-success', 'Forms/Contact/ContactSuccess')->name('contact.success');

// Certificate Verification Route
Route::get('/verify-certificate', [CertificateController::class, 'verify']);
Route::post('/verify-certificate', [CertificateController::class, 'checkVerification']);


// Admin Routes
Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/admin', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    // Applications
    Route::get('/admin/applications', [ApplicationController::class, 'index'])
        ->name('admin.applications');
    Route::get('/admin/applications/{application:uuid}/show', [ApplicationController::class, 'showApp'])
        ->name('applications.showApp');
    Route::get('/admin/applications/{application:uuid}/edit', [ApplicationController::class, 'edit'])
        ->name('applications.edit');
    Route::put('/admin/applications/{application:uuid}', [ApplicationController::class, 'update'])
        ->name('applications.update');

    // Complaints
    Route::get('/admin/complaints', [ComplaintController::class, 'index'])
        ->name('admin.complaints');

    // Quotes
    Route::get('/admin/quotes', [QuoteController::class, 'index'])
        ->name('admin.quotes');
    Route::put('/admin/quotes/{quote}', [QuoteController::class, 'update'])
        ->name('admin.quotes.update');
    // (You may add additional quote routes if needed, e.g., create, edit, destroy)

    // Contacts
    Route::get('/admin/contacts', [ContactController::class, 'index'])
        ->name('admin.contacts');

    // Certificates
    Route::get('/admin/certificates', [CertificateController::class, 'index'])
        ->name('admin.certificates.index');
    Route::get('/admin/certificates/create', [CertificateController::class, 'create'])
        ->name('admin.certificates.create');
    Route::post('/admin/certificates', [CertificateController::class, 'store'])
        ->name('admin.certificates.store');
    Route::get('/admin/certificates/{certificate}/edit', [CertificateController::class, 'edit'])
        ->name('admin.certificates.edit');
    Route::put('/admin/certificates/{certificate}', [CertificateController::class, 'update'])
        ->name('admin.certificates.update');
        Route::delete('/admin/certificates/{certificate}', [CertificateController::class, 'destroy'])
        ->name('admin.certificates.destroy');
    

    Route::get('admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
});





// Dashboard Route (legacy if needed)
Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard', [
        'user' => Auth::user(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

Route::inertia('/register', 'Home/Home');

require __DIR__ . '/auth.php';
