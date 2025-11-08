import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/layouts/public-layout";

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const Home: React.FC = () => {
    return (
        <PublicLayout>
            <Head title="Portal Layanan IT Helpdesk UMS" />

            {/* HERO */}
            <section className="relative overflow-hidden bg-[#2558B0] text-white">
                <div className={shell}>
                    <div className="grid grid-cols-1 items-center gap-8 py-28 md:grid-cols-2 md:py-40">
                        <div className="max-w-2xl">
                            <h1 className="text-2xl font-semibold leading-snug sm:text-3xl md:text-[1.85rem]">
                                Portal Layanan IT Helpdesk UMS
                            </h1>

                            <p className="mt-4 font-bold text-[#FFD17B] leading-relaxed max-w-lg md:max-w-md">
                                Layanan Terpadu Untuk Melaporkan dan Memantau Aduan Terkait Teknologi
                                Informasi di Lingkungan UMS secara Mudah, Cepat, dan Terkoordinasi.
                            </p>
                        </div>

                        <div className="hidden md:block" />
                    </div>
                </div>

                <img
                    src="/storage/assets/team.png"
                    alt="Tim Helpdesk UMS"
                    className="
                        hidden md:block
                        pointer-events-none select-none
                        absolute right-4 md:right-8 lg:right-8
                        bottom-[-10px] md:bottom-[-14px] lg:bottom-[-100px]
                        w-[260px] h-[212px] object-contain
                        md:w-[560px] md:h-[456px]
                        lg:w-[680px] lg:h-[550px]
                        max-w-[90vw]
                    "
                />
            </section>

            {/* CARDS */}
            <section id="cards" className={`${shell} -mt-4 md:-mt-6 relative z-10 mb-20`}>
                <div className="mx-auto w-full max-w-4xl px-2 sm:px-4">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Card 1 */}
                        <article className="group h-full min-h-[340px] rounded-md bg-white p-8 shadow-xl ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-2xl flex flex-col">
                            <div className="mb-4 flex justify-center">
                                <span className="flex h-[79px] w-[89px] items-center justify-center">
                                    <i className="fas fa-graduation-cap text-[#2A6FE7] text-[64px]" />
                                </span>
                            </div>
                            <h3 className="text-center text-lg font-semibold">Login</h3>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Pendaftaran atau masuk ke sistem Layanan IT Helpdesk untuk
                                membuat dan memantau tiket.
                            </p>
                            <div className="mt-auto pt-6 text-center">
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center gap-2 font-semibold text-[#2558B0] hover:underline underline-offset-4"
                                >
                                    Daftar/Masuk <i className="fas fa-arrow-right" />
                                </Link>
                            </div>
                        </article>

                        {/* Card 2 */}
                        <article className="group h-full min-h-[340px] rounded-md bg-white p-8 shadow-xl ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-2xl flex flex-col">
                            <div className="mb-4 flex justify-center">
                                <span className="flex h-[79px] w-[89px] items-center justify-center">
                                    <i className="fas fa-question-circle text-[#2A6FE7] text-[64px]" />
                                </span>
                            </div>
                            <h3 className="text-center text-lg font-semibold">FAQ</h3>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Pertanyaan seputar Layanan IT Helpdesk.
                            </p>
                            <div className="mt-auto pt-6 text-center">
                                <Link
                                    href="#faq"
                                    className="inline-flex items-center justify-center gap-2 font-semibold text-[#2558B0] hover:underline underline-offset-4"
                                >
                                    FAQ <i className="fas fa-arrow-right" />
                                </Link>
                            </div>
                        </article>

                        {/* Card 3 */}
                        <article className="group h-full min-h-[340px] rounded-md bg-white p-8 shadow-xl ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-2xl flex flex-col">
                            <div className="mb-4 flex justify-center">
                                <span className="flex h-[79px] w-[89px] items-center justify-center">
                                    <i className="fas fa-file-alt text-[#2A6FE7] text-[64px]" />
                                </span>
                            </div>
                            <h3 className="text-center text-lg font-semibold">Dokumen &amp; Panduan</h3>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Panduan pendaftaran Layanan IT Helpdesk.
                            </p>
                            <div className="mt-auto pt-6 text-center">
                                <Link
                                    href="#doc"
                                    className="inline-flex items-center justify-center gap-2 font-semibold text-[#2558B0] hover:underline underline-offset-4"
                                >
                                    Panduan <i className="fas fa-arrow-right" />
                                </Link>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
};

export default Home;
