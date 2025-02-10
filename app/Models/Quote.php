<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $fillable = [
        'services',
        'company_name',
        'contact_person',
        'email',
        'phone',
        'additional_info',
        'state'
    ];
    
    protected $casts = [
        'services' => 'array',
    ];
}
