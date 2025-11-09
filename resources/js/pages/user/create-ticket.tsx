import React, { useRef } from "react";
import UserLayout from "@/layouts/user-layout";
import { Head, Link, useForm } from "@inertiajs/react";

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

type TicketPayload = {
    department: string;
    category: string;
    description: string;
    attachment: File | null;
};

const CreateTicket: React.FC = () => {
    const fileRef = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<TicketPayload>({
        department: "",
        category: "",
        description: "",
        attachment: null,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Kirim sebagai multipart
        const formData = new FormData();
        formData.append("department", data.department);
        formData.append("category", data.category);
        formData.append("description", data.description);
        if (data.attachment) formData.append("attachment", data.attachment);

        post("/tickets", {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (fileRef.current) fileRef.current.value = "";
            },
        });
    };

    return (
        <UserLayout>
            <Head title="Buat Tiket - IT Helpdesk UMS" />

            {/* SUB HEADER (sesuai gaya sebelumnya) */}
            <section className="bg-[#2558B0] text-white">
                <div className={`${shell} py-6`}>
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg sm:text-xl font-semibold">Buat Tiket</h1>
                        <div className="text-sm opacity-90">
                            <Link href="/" className="hover:underline">Home</Link>
                            <span className="mx-2">/</span>
                            <span className="font-medium">Buat Tiket</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN */}
            <main className="w-full flex-1 bg-gray-50">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                        {/* KIRI */}
                        <aside className="md:col-span-3 space-y-6">
                            <div className="rounded-xl bg-white ring-1 ring-gray-100 p-6 shadow-sm">
                                <Link
                                    href="/user/tickets/create"
                                    className="block w-full rounded-lg bg-[#4C7CF6] px-4 py-3 text-center font-semibold text-white shadow hover:bg-[#3f6be0]"
                                >
                                    Buat Tiket
                                </Link>
                            </div>

                            <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm overflow-hidden">
                                <Link href="/user/dashboard" className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50">
                                    <i className="fas fa-th-large" />
                                    <span>Dashboard</span>
                                </Link>
                                <hr className="border-gray-100" />
                                <Link href="/user/tickets" className="flex items-center justify-between px-5 py-4 hover:bg-gray-50">
                                    <span className="flex items-center gap-3">
                                        <i className="fas fa-ticket-alt" />
                                        <span>Semua Tiket</span>
                                    </span>
                                    <i className="fas fa-angle-right" />
                                </Link>
                                <hr className="border-gray-100" />
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="w-full text-left px-5 py-4 hover:bg-gray-50"
                                >
                                    <span className="inline-flex items-center gap-3 text-red-600">
                                        <i className="fas fa-sign-out-alt" />
                                        <span>Logout</span>
                                    </span>
                                </Link>
                            </div>
                        </aside>


                        {/* KANAN (form) */}
                        <section className="md:col-span-9 space-y-6">
                            <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm">
                                <form onSubmit={onSubmit} className="p-6 sm:p-8">
                                    <h2 className="text-lg font-semibold mb-6">Tiket Baru</h2>

                                    <div className="grid grid-cols-1 gap-5">
                                        {/* Department */}
                                        <div className="flex items-start gap-6">
                                            <label className="w-48 pt-2 text-sm text-gray-700">
                                                Dapertemen/Unit<span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    value={data.department}
                                                    onChange={(e) => setData("department", e.target.value)}
                                                    placeholder="Dapertemen/Unit"
                                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                                                />
                                                {errors.department && (
                                                    <p className="mt-1 text-xs text-red-600">{errors.department}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Jenis Aduan */}
                                        <div className="flex items-start gap-6">
                                            <label className="w-48 pt-2 text-sm text-gray-700">
                                                Jenis Aduan<span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex-1">
                                                <div className="relative">
                                                    <select
                                                        value={data.category}
                                                        onChange={(e) => setData("category", e.target.value)}
                                                        className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                                                    >
                                                        <option value="">Pilih</option>
                                                        <option value="akun-ditangguhkan">Akun di Tangguhkan</option>
                                                        <option value="2-step-verification">Perbaikan Akun 2 Step Verification</option>
                                                        <option value="jaringan-wifi">Jaringan Wifi/Nirkabel</option>
                                                        <option value="jaringan-kabel">Jaringan Kabel</option>
                                                        <option value="web">Web</option>
                                                        <option value="perbaikan-data">Perbaikan Data</option>
                                                        <option value="program-aplikasi">Program/Aplikasi</option>
                                                        <option value="lain-lain">Lain-lain (peminjaman ruang, perangkat, dll)</option>
                                                    </select>
                                                    <i className="fas fa-chevron-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                </div>
                                                {errors.category && (
                                                    <p className="mt-1 text-xs text-red-600">{errors.category}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Deskripsi Masalah */}
                                        <div className="flex items-start gap-6">
                                            <label className="w-48 pt-2 text-sm text-gray-700">
                                                Deskripsi Masalah<span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    value={data.description}
                                                    onChange={(e) => setData("description", e.target.value)}
                                                    placeholder="Deskripsi Masalah"
                                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                                                />
                                                {errors.description && (
                                                    <p className="mt-1 text-xs text-red-600">{errors.description}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Upload File */}
                                        <div className="flex items-start gap-6">
                                            <label className="w-48 pt-2 text-sm text-gray-700">
                                                Upload File<span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex-1">
                                                <label
                                                    className={`flex h-24 cursor-pointer items-center justify-center rounded-lg border border-dashed ${data.attachment
                                                        ? "border-green-400 bg-green-50 text-green-700"
                                                        : "border-gray-300 bg-gray-50/40 text-gray-600 hover:bg-gray-50"
                                                        } transition-colors`}
                                                >
                                                    <input
                                                        ref={fileRef}
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(e) => setData("attachment", e.target.files?.[0] ?? null)}
                                                    />

                                                    <div className="flex items-center gap-3 text-sm">
                                                        {data.attachment ? (
                                                            <>
                                                                <i className="fas fa-check-circle text-lg text-green-600" />
                                                                <span>{data.attachment.name}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="fas fa-cloud-upload-alt text-lg" />
                                                                <span>Pilih file untuk diunggah</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </label>

                                                <p className="mt-2 text-[11px] text-gray-400">
                                                    Ukuran file tidak boleh lebih dari 3MB
                                                </p>

                                                {errors.attachment && (
                                                    <p className="mt-1 text-xs text-red-600">{errors.attachment}</p>
                                                )}
                                            </div>
                                        </div>

                                    </div>

                                    {/* Actions */}
                                    <div className="mt-8 flex items-center justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center gap-2 rounded-lg bg-[#4C7CF6] px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#3f6be0] disabled:opacity-60"
                                        >
                                            {processing ? (
                                                <>
                                                    <i className="fas fa-spinner fa-spin" />
                                                    Mengirim...
                                                </>
                                            ) : (
                                                <>
                                                    Submit
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </UserLayout>
    );
};

export default CreateTicket;
