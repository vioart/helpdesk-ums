import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ubah warna header setelah scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // kunci scroll body saat mobile menu dibuka
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed top-0 left-0 w-full z-40 text-white transition-all duration-300 ease-in-out",
        scrolled
          ? "bg-[#2558B0]/95 backdrop-blur shadow-sm border-b border-white/15"
          : "bg-transparent"
      ].join(" ")}
    >
      <div className={shell}>
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/storage/assets/logo.png"
              alt="UMS"
              className="h-14 w-auto md:h-16 transition-transform duration-300"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-16 font-extrabold text-[1.05rem] md:flex">
            <Link href="/" className="hover:underline underline-offset-4">
              Home
            </Link>
            <Link
              href="/documents"
              className="hover:underline underline-offset-4"
            >
              Dokumen &amp; Panduan
            </Link>
            <Link href="/faq" className="hover:underline underline-offset-4">
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

      {/* Mobile overlay menu (fixed, menumpuk di atas hero) */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-[#2558B0] md:hidden">
          {/* Tombol close */}
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
                href="/"
                className="rounded-md px-2 py-2 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/documents"
                className="rounded-md px-2 py-2 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                Dokumen &amp; Panduan
              </Link>
              <Link
                href="/faq"
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
  );
};

export default Header;
