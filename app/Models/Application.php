<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\ApplicationState;
use Illuminate\Support\Str;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_number',
        'state',
        'company_name',
        'tin_bin_vat_gst',
        'factory_name',
        'factory_address',
        'city',
        'postal_code',
        'country',
        'contact_person',
        'contact_number',
        'email',
        'management_representative',
        'consultant',
        'employees_male',
        'employees_female',
        'employees_total',
        'factory_function',
        'production_processes',
        'product_category',
        'smeta',
        'audit_type',
        'slcp',
        'verification_notification_method',
        'sac_higg_fem_verification',
        'iso_management_system_certification',
        'outsource_process',
        'resources',
        'brand_customer_name',
        'certifications',
        'other_certifications',
        'date',
        'authorizing_name',
        'title',
        'signature_file_path',
        'signature_name'
    ];

    protected $casts = [
        'certifications' => 'array',
        'date' => 'date',
        'state' => ApplicationState::class,
        'employees_male' => 'integer',
        'employees_female' => 'integer',
        'employees_total' => 'integer'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->application_number = self::generateApplicationNumber();
            $model->uuid = Str::uuid();
        });
    }


    protected static function generateApplicationNumber()
    {
        $datePart = now()->format('Ymd');
        $randomPart = Str::upper(Str::random(6)); // More secure than uniqid()
        return "APP-{$datePart}-{$randomPart}";
    }

    public function getRouteKeyName()
    {
        return 'uuid'; // Use UUID for route binding instead of application_number
    }
    
}