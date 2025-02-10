<?php

namespace App\Enums;

enum ApplicationState: string
{
    case Submitted = 'submitted';
    case UnderReview = 'under_review';
    case AdditionalInfoRequired = 'additional_info_required';
    case Approved = 'approved';
    case Rejected = 'rejected';
}