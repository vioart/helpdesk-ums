import React, { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll saat mobile menu terbuka
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Head title="Portal Layanan IT Helpdesk UMS" />

      {/* WRAPPER: hanya iPad (md) yang pakai min-h-screen + flex-col */}
      <div className="md:min-h-screen md:flex md:flex-col lg:min-h-0 lg:block">
        {/* HEADER */}
        <header
          className={[
            "sticky top-0 z-40 text-white transition-colors duration-300",
            scrolled
              ? "bg-[#2558B0]/95 backdrop-blur shadow-sm border-b border-white/15"
              : "bg-[#2558B0]"
          ].join(" ")}
        >
          <div className={shell}>
            <div className="flex h-24 items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/storage/assets/logo.png" alt="UMS" className="h-14 w-auto md:h-16" />
              </div>

              {/* Desktop nav (tetap) */}
              <nav className="hidden items-center gap-16 font-extrabold text-[1.05rem] md:flex">
                <Link href="#" className="hover:underline underline-offset-4">
                  Home
                </Link>
                <Link href="#doc" className="hover:underline underline-offset-4">
                  Dokumen &amp; Panduan
                </Link>
                <Link href="#faq" className="hover:underline underline-offset-4">
                  FAQ
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-bold ring-1 ring-white/20 transition hover:bg-white/20"
                >
                  <i className="fas fa-sign-in-alt text-[#FFD17B]" />
                  <span>Login</span>
                </Link>
              </nav>

              {/* Mobile toggle */}
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 md:hidden"
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                <i className={`fas ${open ? "fa-times" : "fa-bars"} text-xl`} />
              </button>
            </div>
          </div>

          {/* Mobile menu overlay (fixed, tidak mempengaruhi hero) */}
          {open && (
            <div className="fixed inset-0 z-[60] bg-[#2558B0] md:hidden">
              {/* Tombol close di pojok kanan atas */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full p-2 ring-1 ring-white/20 hover:bg-white/10"
              >
                <i className="fas fa-times text-2xl text-white" />
              </button>

              <div className="mx-auto max-w-7xl px-4 pt-24 pb-6">
                <nav className="flex flex-col gap-3 font-medium text-white">
                  <Link
                    href="#"
                    className="rounded-md px-2 py-2 hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="#doc"
                    className="rounded-md px-2 py-2 hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    Dokumen &amp; Panduan
                  </Link>
                  <Link
                    href="#faq"
                    className="rounded-md px-2 py-2 hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/login"
                    className="mt-1 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 font-semibold ring-1 ring-white/20 hover:bg-white/20"
                    onClick={() => setOpen(false)}
                  >
                    <i className="fas fa-sign-in-alt text-[#FFD17B]" />
                    <span>Login</span>
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </header>

        {/* MAIN */}
        {/* Flex grow khusus md agar footer nempel bawah di iPad */}
        <main className="md:flex-1 lg:flex-none">
          {/* HERO */}
          <section className="relative overflow-hidden bg-[#2558B0] text-white">
            <div className={`${shell}`}>
              <div className="grid grid-cols-1 items-center gap-8 py-20 md:grid-cols-2 md:py-32">
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

            {/* Gambar team (hidden di mobile, tampil mulai md). iPad digeser kanan */}
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
        </main>

        {/* FOOTER */}
        <footer className="bg-[#FFD17B]">
          <div className={`${shell} py-6 text-center text-sm font-semibold text-gray-700`}>
            Copyright © 2025 - 2025 DSTI | Universitas Muhammadiyah Surakarta
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
