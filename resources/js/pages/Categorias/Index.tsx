import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface Categoria {
    id: number;
    nombre: string;
    descripcion: string | null;
}

interface Props {
    categorias: Categoria[];
}

export default function Index({ categorias }: Props) {
    const [editando, setEditando] = useState<Categoria | null>(null);
    const [agregando, setAgregando] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nombre: '',
        descripcion: '',
    });

    // =========================
    // AGREGAR CATEGORÍA
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

    const guardarCategoria = (e: FormEvent) => {
        e.preventDefault();

        post('/categorias', {
            onSuccess: () => {
                setAgregando(false);
                reset();
            },
        });
    };

    // =========================
    // EDITAR CATEGORÍA
    // =========================
    const comenzarEditar = (categoria: Categoria) => {
        setAgregando(false);
        setEditando(categoria);

        setData({
            nombre: categoria.nombre,
            descripcion: categoria.descripcion ?? '',
        });
    };

    const cancelarEditar = () => {
        setEditando(null);
        reset();
    };

    const guardarEdicion = (e: FormEvent) => {
        e.preventDefault();

        if (!editando) return;

        put(`/categorias/${editando.id}`, {
            onSuccess: () => {
                setEditando(null);
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Categorías" />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-6xl">

                    {/* ENCABEZADO */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Categorías
                            </h1>

                            <p className="mt-1 text-sm text-gray-600">
                                
                            </p>
                        </div>

                        {/* BOTÓN AGREGAR */}
                        <button
                            type="button"
                            onClick={comenzarAgregar}
                            className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                        >
                            + Agregar categoría
                        </button>
                    </div>

                    {/* =========================
                        FORMULARIO AGREGAR
                    ========================= */}
                    {agregando && (
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                            <h2 className="mb-5 text-xl font-semibold text-gray-900">
                                Agregar categoría
                            </h2>

                            <form onSubmit={guardarCategoria}>

                                {/* NOMBRE */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="nombre"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Categoría
                                    </label>

                                    <input
                                        id="nombre"
                                        type="text"
                                        value={data.nombre}
                                        onChange={(e) =>
                                            setData('nombre', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                                        placeholder="Nombre de la categoría"
                                    />

                                    {errors.nombre && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.nombre}
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
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                                        placeholder="Descripción de la categoría"
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
                                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Guardando...'
                                            : 'Guardar categoría'}
                                    </button>

                                </div>
                            </form>
                        </div>
                    )}

                    {/* =========================
                        FORMULARIO EDITAR
                    ========================= */}
                    {editando && (
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                            <h2 className="mb-5 text-xl font-semibold text-gray-900">
                                Editar categoría
                            </h2>

                            <form onSubmit={guardarEdicion}>

                                {/* NOMBRE */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="editar-nombre"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Categoría
                                    </label>

                                    <input
                                        id="editar-nombre"
                                        type="text"
                                        value={data.nombre}
                                        onChange={(e) =>
                                            setData('nombre', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                                    />

                                    {errors.nombre && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.nombre}
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
                                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Guardando...'
                                            : 'Guardar cambios'}
                                    </button>

                                </div>
                            </form>
                        </div>
                    )}

                    {/* =========================
                        TABLA
                    ========================= */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Lista de categorías
                            </h2>
                        </div>

                        {categorias.length === 0 ? (

                            <div className="p-10 text-center">

                                <p className="text-gray-500">
                                    No hay categorías registradas.
                                </p>

                                <button
                                    type="button"
                                    onClick={comenzarAgregar}
                                    className="mt-4 inline-block rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white"
                                >
                                    + Agregar primera categoría
                                </button>

                            </div>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead className="bg-gray-50">
                                        <tr>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                ID
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Categoría
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Descripción
                                            </th>

                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Acciones
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">

                                        {categorias.map((categoria, index) => (

                                            <tr
                                                key={categoria.id}
                                                className="hover:bg-gray-50"
                                            >

                                                {/* ID */}
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {index + 1}
                                                </td>

                                                {/* CATEGORÍA */}
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {categoria.nombre}
                                                </td>

                                                {/* DESCRIPCIÓN */}
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {categoria.descripcion ||
                                                        'Sin descripción'}
                                                </td>

                                                {/* ACCIONES */}
                                                <td className="px-6 py-4">

                                                    <div className="flex gap-2">

                                                        {/* EDITAR */}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                comenzarEditar(
                                                                    categoria
                                                                )
                                                            }
                                                            className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                                                        >
                                                            Editar
                                                        </button>

                                                        {/* ELIMINAR */}
                                                        <Link
                                                            href={`/categorias/${categoria.id}`}
                                                            method="delete"
                                                            as="button"
                                                            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                                                            onBefore={() =>
                                                                confirm(
                                                                    '¿Seguro que quieres eliminar esta categoría?'
                                                                )
                                                            }
                                                        >
                                                            Eliminar
                                                        </Link>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>
            </div>
        </>
    );
}
