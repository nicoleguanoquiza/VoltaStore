import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface Categoria {
    id: number;
    nombre: string;
}

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string | null;
    categoria_id: number | null;
    categoria?: Categoria | null;
}

interface Props {
    productos: Producto[];
    categorias: Categoria[];
}

export default function Index({ productos, categorias }: Props) {
    const [agregando, setAgregando] = useState(false);
    const [editando, setEditando] = useState<Producto | null>(null);

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        nombre: '',
        precio: '',
        descripcion: '',
        categoria_id: '',
    });

    // =========================
    // AGREGAR
    // =========================

    const comenzarAgregar = () => {
        setEditando(null);
        reset();
        setAgregando(true);
    };

    const cancelarAgregar = () => {
        setAgregando(false);
        reset();
    };

    const guardarProducto = (e: FormEvent) => {
        e.preventDefault();

        post('/productos', {
            onSuccess: () => {
                setAgregando(false);
                reset();
            },
        });
    };

    // =========================
    // EDITAR
    // =========================

    const comenzarEditar = (producto: Producto) => {
        setAgregando(false);

        setEditando(producto);

        setData({
            nombre: producto.nombre,
            precio: String(producto.precio),
            descripcion: producto.descripcion ?? '',
            categoria_id: producto.categoria_id
                ? String(producto.categoria_id)
                : '',
        });
    };

    const cancelarEditar = () => {
        setEditando(null);
        reset();
    };

    const guardarEdicion = (e: FormEvent) => {
        e.preventDefault();

        if (!editando) {
            return;
        }

        put(`/productos/${editando.id}`, {
            onSuccess: () => {
                setEditando(null);
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Productos" />

            <div className="min-h-screen bg-gray-100 p-8">
                <div className="mx-auto max-w-7xl">

                    {/* ENCABEZADO */}
                    <div className="mb-6 flex items-center justify-between">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Productos
                            </h1>

                            <p className="mt-1 text-sm text-gray-600">
                            </p>
                        </div>

                        <div className="flex gap-3">

                            <button
                                type="button"
                                onClick={comenzarAgregar}
                                className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                            >
                                + Agregar producto
                            </button>

                            {/* BOTÓN PDF */}
                            <a
                                href="/productos/pdf"
                                className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
                            >
                                Convertir productos a PDF
                            </a>

                        </div>
                    </div>

                    {/* FORMULARIO AGREGAR */}
                    {agregando && (
                        <div className="mb-6 rounded-xl bg-white p-6 shadow">

                            <h2 className="mb-5 text-xl font-bold text-gray-900">
                                Agregar producto
                            </h2>

                            <form onSubmit={guardarProducto}>

                                {/* NOMBRE */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="nombre"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Nombre
                                    </label>

                                    <input
                                        id="nombre"
                                        type="text"
                                        value={data.nombre}
                                        onChange={(e) =>
                                            setData(
                                                'nombre',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nombre del producto"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                                    />

                                    {errors.nombre && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.nombre}
                                        </p>
                                    )}
                                </div>

                                {/* PRECIO */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="precio"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Precio
                                    </label>

                                    <input
                                        id="precio"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.precio}
                                        onChange={(e) =>
                                            setData(
                                                'precio',
                                                e.target.value
                                            )
                                        }
                                        placeholder="0.00"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                                    />

                                    {errors.precio && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.precio}
                                        </p>
                                    )}
                                </div>

                                {/* CATEGORÍA */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="categoria_id"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Categoría
                                    </label>

                                    <select
                                        id="categoria_id"
                                        value={data.categoria_id}
                                        onChange={(e) =>
                                            setData(
                                                'categoria_id',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
                                    >
                                        <option value="">
                                            Seleccionar categoría
                                        </option>

                                        {categorias.map((categoria) => (
                                            <option
                                                key={categoria.id}
                                                value={categoria.id}
                                            >
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.categoria_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.categoria_id}
                                        </p>
                                    )}
                                </div>

                                {/* DESCRIPCIÓN */}
                                <div className="mb-5">
                                    <label
                                        htmlFor="descripcion"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Descripción
                                    </label>

                                    <textarea
                                        id="descripcion"
                                        rows={4}
                                        value={data.descripcion}
                                        onChange={(e) =>
                                            setData(
                                                'descripcion',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Descripción del producto"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                                    />

                                    {errors.descripcion && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.descripcion}
                                        </p>
                                    )}
                                </div>

                                {/* BOTONES */}
                                <div className="flex gap-2">

                                    <button
                                        type="button"
                                        onClick={cancelarAgregar}
                                        className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Guardando...'
                                            : 'Guardar producto'}
                                    </button>

                                </div>

                            </form>
                        </div>
                    )}

                    {/* FORMULARIO EDITAR */}
                    {editando && (
                        <div className="mb-6 rounded-xl bg-white p-6 shadow">

                            <h2 className="mb-5 text-xl font-bold text-gray-900">
                                Editar producto
                            </h2>

                            <form onSubmit={guardarEdicion}>

                                {/* NOMBRE */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="editar-nombre"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Nombre
                                    </label>

                                    <input
                                        id="editar-nombre"
                                        type="text"
                                        value={data.nombre}
                                        onChange={(e) =>
                                            setData(
                                                'nombre',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                                    />

                                    {errors.nombre && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.nombre}
                                        </p>
                                    )}
                                </div>

                                {/* PRECIO */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="editar-precio"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Precio
                                    </label>

                                    <input
                                        id="editar-precio"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.precio}
                                        onChange={(e) =>
                                            setData(
                                                'precio',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                                    />

                                    {errors.precio && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.precio}
                                        </p>
                                    )}
                                </div>

                                {/* CATEGORÍA */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="editar-categoria"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Categoría
                                    </label>

                                    <select
                                        id="editar-categoria"
                                        value={data.categoria_id}
                                        onChange={(e) =>
                                            setData(
                                                'categoria_id',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
                                    >
                                        <option value="">
                                            Sin categoría
                                        </option>

                                        {categorias.map((categoria) => (
                                            <option
                                                key={categoria.id}
                                                value={categoria.id}
                                            >
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.categoria_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.categoria_id}
                                        </p>
                                    )}
                                </div>

                                {/* DESCRIPCIÓN */}
                                <div className="mb-5">
                                    <label
                                        htmlFor="editar-descripcion"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Descripción
                                    </label>

                                    <textarea
                                        id="editar-descripcion"
                                        rows={4}
                                        value={data.descripcion}
                                        onChange={(e) =>
                                            setData(
                                                'descripcion',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                                    />

                                    {errors.descripcion && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.descripcion}
                                        </p>
                                    )}
                                </div>

                                {/* BOTONES */}
                                <div className="flex gap-2">

                                    <button
                                        type="button"
                                        onClick={cancelarEditar}
                                        className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Guardando...'
                                            : 'Guardar cambios'}
                                    </button>

                                </div>

                            </form>
                        </div>
                    )}

                    {/* TABLA */}
                    <div className="overflow-x-auto rounded-lg bg-white shadow">

                        <table className="w-full border-collapse">

                            <thead>
                                <tr className="bg-gray-200">

                                    <th className="border border-gray-300 p-3">
                                        ID
                                    </th>

                                    <th className="border border-gray-300 p-3">
                                        Nombre
                                    </th>

                                    <th className="border border-gray-300 p-3">
                                        Precio
                                    </th>

                                    <th className="border border-gray-300 p-3">
                                        Categoría
                                    </th>

                                    <th className="border border-gray-300 p-3">
                                        Descripción
                                    </th>

                                    <th className="border border-gray-300 p-3">
                                        Acciones
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {productos.map((producto) => (
                                    <tr
                                        key={producto.id}
                                        className="hover:bg-gray-50"
                                    >

                                        <td className="border border-gray-300 p-3 text-center">
                                            {producto.id}
                                        </td>

                                        <td className="border border-gray-300 p-3">
                                            {producto.nombre}
                                        </td>

                                        <td className="border border-gray-300 p-3 text-center">
                                            ${Number(producto.precio).toFixed(2)}
                                        </td>

                                        <td className="border border-gray-300 p-3 text-center">
                                            {producto.categoria?.nombre ??
                                                'Sin categoría'}
                                        </td>

                                        <td className="border border-gray-300 p-3">
                                            {producto.descripcion ??
                                                'Sin descripción'}
                                        </td>

                                        <td className="border border-gray-300 p-3">

                                            <div className="flex justify-center gap-2">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        comenzarEditar(
                                                            producto
                                                        )
                                                    }
                                                    className="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                                >
                                                    Editar
                                                </button>

                                                <Link
                                                    href={`/productos/${producto.id}`}
                                                    method="delete"
                                                    as="button"
                                                    className="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                                                    onBefore={() =>
                                                        confirm(
                                                            '¿Seguro que deseas eliminar este producto?'
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </Link>

                                            </div>

                                        </td>

                                    </tr>
                                ))}

                                {productos.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="border border-gray-300 p-6 text-center text-gray-500"
                                        >
                                            No hay productos registrados.
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>
            </div>
        </>
    );
}
