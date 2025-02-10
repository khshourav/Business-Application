<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    protected $fillable = [
        'name',
        'company_name',
        'email',
        'subject',
        'complaint',
        'is_anonymous'
    ];
}
