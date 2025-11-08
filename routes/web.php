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

Route::get('/user/dashboard', function () {
    return Inertia::render('user/dashboard');
})->name('user.dashboard');

// require __DIR__.'/settings.php';
              