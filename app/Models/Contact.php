<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    // app/Models/Contact.php
protected $fillable = [
    'name',
    'company',
    'email',
    'subject',
    'message'
];
}
