<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    public function index()
    {
        $categorias = Categoria::latest()->get();

        return Inertia::render('Categorias/Index', [
            'categorias' => $categorias,
        ]);
    }

    public function create()
    {
        return Inertia::render('Categorias/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        Categoria::create($validated);

        return redirect()->route('categorias.index');
    }

    public function show(Categoria $categoria)
    {
        //
    }

    public function edit(Categoria $categoria)
    {
        //
    }

    public function update(Request $request, Categoria $categoria)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        $categoria->update($validated);

        return redirect()->route('categorias.index');
    }

    public function destroy(Categoria $categoria)
    {
        $categoria->delete();

        return redirect()->route('categorias.index');
    }
}