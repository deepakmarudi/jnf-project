<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('app:about-portal', function () {
    $this->comment('JNF Portal backend API shell is configured.');
})->purpose('Display a short summary of the backend application.');
