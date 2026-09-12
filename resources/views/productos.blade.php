<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Productos</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f9;
            margin: 0;
            padding: 30px;
        }

        .contenedor {
            max-width: 1100px;
            margin: auto;
        }

        h1 {
            color: #333;
            margin-bottom: 25px;
        }

        .productos {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
        }

        .producto {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }

        .producto h2 {
            margin-top: 0;
            color: #222;
        }

        .descripcion {
            color: #666;
        }

        .precio {
            color: #198754;
            font-size: 20px;
            font-weight: bold;
        }

        .categoria {
            color: #555;
            font-size: 14px;
        }

        .sin-productos {
            background: white;
            padding: 25px;
            border-radius: 10px;
            text-align: center;
        }
    </style>
</head>

<body>

<div class="contenedor">

    <h1>Lista de Productos</h1>
    
    
    

    @if(session('success'))
        <div style="background: #d1e7dd; padding: 15px; margin-bottom: 20px; border-radius: 8px;">
            {{ session('success') }}
        </div>
    @endif

    @if($productos->count() > 0)

        <div class="productos">

            @foreach($productos as $producto)

                <div class="producto">

                    <h2>
                        {{ $producto->nombre }}
                    </h2>

                    @if($producto->descripcion)
                        <p class="descripcion">
                            {{ $producto->descripcion }}
                        </p>
                    @endif

                    <p class="precio">
                        ${{ number_format($producto->precio, 2) }}
                    </p>

                    @if($producto->categoria)
                        <p class="categoria">
                            Categoría:
                            {{ $producto->categoria->nombre }}
                        </p>
                    @endif

                </div>

            @endforeach

        </div>

    @else

        <div class="sin-productos">
            <h2>No hay productos</h2>
            <p>Aún no se han registrado productos.</p>
        </div>

    @endif

</div>

</body>
</html>
