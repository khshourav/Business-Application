<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $table = 'certificates';
    protected $fillable = [
        'certificate_id',
        'holder_name',
        'issued_date',
        'expiry_date',
        'category',
    ];

    protected $casts = [
        'issued_date' => 'date:Y-m-d',
        'expiry_date' => 'date:Y-m-d',
    ];
}
