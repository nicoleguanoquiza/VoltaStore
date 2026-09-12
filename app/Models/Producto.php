<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Producto extends Model
{
    protected $fillable = [
        'categoria_id',
        'nombre',
        'descripcion',
        'precio',
    ];

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }
}
