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

Route::get('/user/tickets', function () {
    return Inertia::render('user/data-ticket');
})->name('user.ticket');

Route::get('/user/tickets/create', function () {
    return Inertia::render('user/create-ticket');
})->name('user.ticket.create');

Route::get('/user/tickets/{id}', function () {
    return Inertia::render('user/show-ticket');
})->name('user.ticket.show');

Route::get('/user/edit-profile', function () {
    return Inertia::render('user/edit-profile');
})->name('user.edit-profile');
// require __DIR__.'/settings.php';
              