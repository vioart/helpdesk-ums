<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('index');
})->name('home');

Route::get('/documents', function () {
    return Inertia::render('home/documents');
})->name('documents');

Route::get('/faq', function () {
    return Inertia::render('home/faq');
})->name('faq');

// require __DIR__.'/settings.php';
