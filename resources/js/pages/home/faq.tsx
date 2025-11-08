import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import PublicLayout from "@/layouts/public-layout";

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

/** Data FAQ */
const items = [
    {
        q: "Apa yang harus dilakukan jika tidak bisa login ke Star UMS.",
        a: (
            <p>
                Pastikan NIM/NIP dan kata sandi benar, lalu coba bersihkan cache/peramban.
                Jika masih gagal, reset kata sandi melalui halaman lupa password atau hubungi IT Helpdesk DSTI UMS.
            </p>
        ),
    },
    {
        q: "Apakah saya bisa mengganti password akun UMS sendiri?",
        a: (
            <p>
                Ya, bisa. Jika Anda masih mengingat password lama, ubah melalui{" "}
                <a
                    href="https://ithelp.ums.ac.id/ubah_passwordku"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#2558B0] underline underline-offset-2"
                >
                    tautan ini
                </a>. Jika lupa password, silakan datang ke IT Helpdesk DSTI UMS (Lantai 5
                Gedung Induk Siti Walidah) membawa KTM/Kartu Pegawai untuk verifikasi.
            </p>
        ),
    },
    {
        q: "Apa yang harus dilakukan jika tidak bisa login ke Spada UMS.",
        a: (
            <p>
                Pastikan akun aktif di SIA/Star dan jadwal kuliah terdaftar. Coba login ulang
                setelah 10–15 menit. Bila tetap gagal, kirim tiket ke Helpdesk disertai NIM/NIP dan
                tangkapan layar error.
            </p>
        ),
    },
    {
        q: "Apa yang harus dilakukan jika course di Spada tidak bisa diakses.",
        a: (
            <p>
                Minta dosen pengampu memastikan Anda sudah terdaftar pada kelas di Spada dan
                periode perkuliahan sudah dibuka. Jika sudah benar tapi masih terkendala,
                kirim tiket ke Helpdesk dengan info kode mata kuliah dan kelas.
            </p>
        ),
    },
];

/** Komponen 1 item accordion */
const FaqItem: React.FC<{
    q: string;
    a: React.ReactNode;
    open: boolean;
    onToggle: () => void;
}> = ({ q, a, open, onToggle }) => (
    <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm">
        <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-6"
        >
            <span className="font-semibold text-gray-800">{q}</span>
            <i className={`fas ${open ? "fa-minus" : "fa-plus"} text-gray-500`} />
        </button>

        {open && (
            <div className="px-4 pb-4 text-sm leading-relaxed text-gray-700 md:px-6">
                {a}
            </div>
        )}
    </div>
);

const FaqPage: React.FC = () => {
    const [openIdx, setOpenIdx] = useState<number | null>(1);

    return (
        <PublicLayout>
            <Head title="FAQ - UMS" />

            {/* HERO Section*/}
            <section className="relative">
                <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                    <img
                        src="/storage/assets/heading.png"
                        alt="FAQ"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className={`${shell} relative h-full`}>
                        <div className="flex h-full items-center justify-center">
                            <h1 className="text-center text-white text-3xl sm:text-4xl md:text-5xl font-semibold pt-25">
                                FAQ Portal Layanan IT Helpdesk UMS
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIST FAQ */}
            <section className={`${shell} py-16`}>
                <div className="space-y-4">
                    {items.map((it, i) => (
                        <FaqItem
                            key={i}
                            q={it.q}
                            a={it.a}
                            open={openIdx === i}
                            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                        />
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
};

export default FaqPage;
