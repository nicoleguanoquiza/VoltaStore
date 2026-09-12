<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $categorias = Categoria::count();
        $productos = Producto::count();

        $listaProductos = Producto::with('categoria')->get();

        return Inertia::render('dashboard', [
            'categorias' => $categorias,
            'productos' => $productos,
            'listaProductos' => $listaProductos,
        ]);
    }
}