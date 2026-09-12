<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">

    <title>Lista de Productos</title>

    <style>
        @page {
            margin: 40px 30px;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #333333;
        }

        .header {
            text-align: center;
            margin-bottom: 25px;
        }

        .header h1 {
            margin: 0;
            color: #1f2937;
            font-size: 24px;
        }

        .header p {
            margin-top: 5px;
            color: #6b7280;
        }

        .info {
            width: 100%;
            margin-bottom: 20px;
        }

        .info td {
            border: none;
            padding: 4px;
        }

        .info-left {
            text-align: left;
        }

        .info-right {
            text-align: right;
        }

        table.productos {
            width: 100%;
            border-collapse: collapse;
        }

        table.productos th {
            background-color: #2563eb;
            color: white;
            border: 1px solid #1d4ed8;
            padding: 9px;
            text-align: left;
        }

        table.productos td {
            border: 1px solid #d1d5db;
            padding: 8px;
        }

        table.productos tr:nth-child(even) {
            background-color: #f3f4f6;
        }

        .center {
            text-align: center;
        }

        .right {
            text-align: right;
        }

        .footer {
            position: fixed;
            bottom: -20px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
        }
    </style>
</head>

<body>

    <div class="header">
        <h1>Catálogo General de Productos</h1>

        <p>
            Reporte de productos registrados
        </p>
    </div>

    <table class="info">
        <tr>
            <td class="info-left">
                <strong>Total de productos:</strong>
                {{ $productos->count() }}
            </td>

            <td class="info-right">
                <strong>Fecha:</strong>
                {{ date('d/m/Y') }}
            </td>
        </tr>
    </table>

    <table class="productos">

        <thead>
            <tr>
                <th style="width: 8%;">
                    ID
                </th>

                <th style="width: 20%;">
                    Producto
                </th>

                <th style="width: 22%;">
                    Descripción
                </th>

                <th style="width: 20%;">
                    Categoría
                </th>

                <th style="width: 15%;">
                    Precio
                </th>
            </tr>
        </thead>

        <tbody>

            @forelse ($productos as $producto)

                <tr>

                    {{-- NUMERACIÓN DEL REPORTE: 1, 2, 3, 4... --}}
                    <td class="center">
                        {{ $loop->iteration }}
                    </td>

                    <td>
                        {{ $producto->nombre }}
                    </td>

                    <td>
                        {{ $producto->descripcion ?? 'Sin descripción' }}
                    </td>

                    <td>
                        {{ $producto->categoria->nombre ?? 'Sin categoría' }}
                    </td>

                    <td class="right">
                        ${{ number_format($producto->precio, 2) }}
                    </td>

                </tr>

            @empty

                <tr>
                    <td
                        colspan="5"
                        class="center"
                    >
                        No hay productos registrados.
                    </td>
                </tr>

            @endforelse

        </tbody>

    </table>

    <div class="footer">
        Reporte de productos
    </div>

</body>

</html>
