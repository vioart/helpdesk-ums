import React, { useState } from "react";
import { Link } from "@inertiajs/react";

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className={shell}>
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/storage/assets/logo-it.png" alt="UMS" className="h-10 w-40" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8 font-semibold text-gray-700">
              <Link href="/" className="hover:text-[#2558B0]">Home</Link>
              <Link href="/documents" className="hover:text-[#2558B0]">Dokumen &amp; Panduan</Link>
              <Link href="/faq" className="hover:text-[#2558B0]">FAQ</Link>
            </nav>
            <div className="flex items-center gap-3">
              <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-50" aria-label="Notifikasi">
                <i className="fas fa-bell" />
              </button>
              <button className="rounded-full bg-gray-100 h-9 w-9 grid place-items-center text-gray-600" aria-label="Profil">
                <i className="fas fa-user" />
              </button>
            </div>
          </div>

          <button
            className="md:hidden rounded-md p-2 text-gray-700"
            onClick={() => setOpen(!open)}
            aria-label="Buka menu"
          >
            <i className={`fas ${open ? "fa-times" : "fa-bars"} text-xl`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className={shell}>
            <nav className="flex flex-col py-2 text-gray-700">
              <Link href="/" className="px-2 py-2 hover:bg-gray-50">Home</Link>
              <Link href="/documents" className="px-2 py-2 hover:bg-gray-50">Dokumen &amp; Panduan</Link>
              <Link href="/faq" className="px-2 py-2 hover:bg-gray-50">FAQ</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
