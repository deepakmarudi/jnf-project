<?php

namespace App\Enums;

enum RecruiterStatus: string
{
    case Pending = 'pending';
    case Active = 'active';
    case Blocked = 'blocked';
}
