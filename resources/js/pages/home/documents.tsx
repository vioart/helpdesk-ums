import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/layouts/public-layout";

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

/** Item dokumen dengan ikon download */
const DocItem: React.FC<{ href: string; label: string }> = ({ href, label }) => (
    <Link
        href={href}
        className="group flex items-center gap-3 rounded-md px-2 py-2 hover:bg-blue-50"
    >
        <i className="fas fa-download text-[#2A6FE7]" />
        <span className="text-gray-800 group-hover:underline">{label}</span>
    </Link>
);

const DocumentsPage: React.FC = () => {
    return (
        <PublicLayout>
            <Head title="Dokumen & Panduan - UMS" />

            {/* HERO Section*/}
            <section className="relative">
                <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                    <img
                        src="/storage/assets/heading.png"
                        alt="Dokumen & Panduan"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0" />

                    <div className={`${shell} relative h-full`}>
                        <div className="flex h-full items-center justify-center">
                            <h1 className="text-center text-white text-3xl sm:text-4xl md:text-5xl font-semibold pt-25">
                                Dokumen &amp; Panduan
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* DAFTAR DOKUMEN */}
            <section className={`${shell} py-12`}>
                {/* Unduh Panduan */}
                <div className="space-y-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Unduh Panduan</h2>
                    <div className="space-y-3">
                        <DocItem
                            href="/storage/docs/panduan-mendaftar.pdf"
                            label="Panduan mendaftar/membuat tiket di Sistem"
                        />
                    </div>
                </div>

                {/* Format Formulir Ajuan */}
                <div className="mt-10 space-y-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Format Formulir Ajuan</h2>
                    <div className="space-y-3">
                        <DocItem
                            href="/storage/docs/formulir-ajuan-website.docx"
                            label="Formulir ajuan website"
                        />
                    </div>
                </div>

                {/* Format Surat Aduan */}
                <div className="mt-10 space-y-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Format Surat Aduan</h2>
                    <div className="space-y-3">
                        <DocItem
                            href="/storage/docs/template-surat-aduan.docx"
                            label="Template surat aduan"
                        />
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
};

export default DocumentsPage;
