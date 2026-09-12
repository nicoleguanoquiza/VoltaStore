<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ProductoController extends Controller
{
    /**
     * Mostrar productos.
     */
    public function index()
    {
        $productos = Producto::with('categoria')->get();
        $categorias = Categoria::all();

        return Inertia::render('Productos/Index', [
            'productos' => $productos,
            'categorias' => $categorias,
        ]);
    }

    /**
     * Generar PDF de productos.
     */
    public function pdf()
    {
        $productos = Producto::with('categoria')->get();

        $pdf = Pdf::loadView('productos.pdf', [
            'productos' => $productos,
        ]);

        return $pdf->download('productos.pdf');
    }

    /**
     * Guardar producto.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
            'descripcion' => 'nullable|string',
            'categoria_id' => 'nullable|exists:categorias,id',
        ]);

        Producto::create([
            'nombre' => $validated['nombre'],
            'precio' => $validated['precio'],
            'descripcion' => $validated['descripcion'] ?? null,
            'categoria_id' => $validated['categoria_id'] ?? null,
        ]);

        return redirect()
            ->route('productos.index')
            ->with('success', 'Producto creado correctamente.');
    }

    /**
     * Actualizar producto.
     */
    public function update(Request $request, Producto $producto)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
            'descripcion' => 'nullable|string',
            'categoria_id' => 'nullable|exists:categorias,id',
        ]);

        $producto->update([
            'nombre' => $validated['nombre'],
            'precio' => $validated['precio'],
            'descripcion' => $validated['descripcion'] ?? null,
            'categoria_id' => $validated['categoria_id'] ?? null,
        ]);

        return redirect()
            ->route('productos.index')
            ->with('success', 'Producto actualizado correctamente.');
    }

    /**
     * Eliminar producto.
     */
    public function destroy(Producto $producto)
    {
        $producto->delete();

        return redirect()
            ->route('productos.index')
            ->with('success', 'Producto eliminado correctamente.');
    }
}
