<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\Teams\TeamInvitationController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // =========================
    // DASHBOARD
    // =========================

    Route::get('/dashboard', DashboardController::class)
        ->name('dashboard');


    // =========================
    // CATEGORÍAS
    // =========================

    Route::resource('/categorias', CategoriaController::class)
        ->only([
            'index',
            'create',
            'store',
            'edit',
            'update',
            'destroy',
        ]);


    // =========================
    // PRODUCTOS
    // =========================

    // Generar PDF de productos
    Route::get('/productos/pdf', [ProductoController::class, 'pdf'])
        ->name('productos.pdf');

    // CRUD de productos
    Route::resource('/productos', ProductoController::class)
        ->only([
            'index',
            'store',
            'update',
            'destroy',
        ]);
});


Route::middleware(['auth'])->group(function () {

    // =========================
    // INVITACIONES
    // =========================

    // Aceptar invitación
    Route::post(
        'invitations/{invitation}/accept',
        [TeamInvitationController::class, 'accept']
    )->name('invitations.accept');

    // Rechazar invitación
    Route::delete(
        'invitations/{invitation}',
        [TeamInvitationController::class, 'decline']
    )->name('invitations.decline');
});


require __DIR__ . '/settings.php';
