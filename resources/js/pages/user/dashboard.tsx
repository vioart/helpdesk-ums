import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head title="Dashboard - IT Helpdesk UMS" />

      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* HEADER */}
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

        {/* SUB HEADER */}
        <section className="bg-[#2558B0] text-white">
          <div className={`${shell} py-6`}>
            <div className="flex items-center justify-between">
              <h1 className="text-lg sm:text-xl font-semibold">Dashboard</h1>
              <div className="text-sm opacity-90">
                <Link href="/" className="hover:underline">Home</Link>
                <span className="mx-2">/</span>
                <span className="font-medium">Dashboard</span>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN */}
        <main className={`${shell} py-8 flex-1`}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* KIRI */}
            <aside className="md:col-span-3 space-y-6">
              <div className="rounded-xl bg-white ring-1 ring-gray-100 p-6 shadow-sm">
                <Link
                  href="/tickets/create"
                  className="block w-full rounded-lg bg-[#4C7CF6] px-4 py-3 text-center font-semibold text-white shadow hover:bg-[#3f6be0]"
                >
                  Buat Tiket
                </Link>
              </div>

              <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm overflow-hidden">
                <Link href="/user/dashboard" className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50">
                  {/* v5: th-large */}
                  <i className="fas fa-th-large" />
                  <span>Dashboard</span>
                </Link>
                <hr className="border-gray-100" />
                <Link href="/tickets" className="flex items-center justify-between px-5 py-4 hover:bg-gray-50">
                  <span className="flex items-center gap-3">
                    {/* v5: ticket-alt */}
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
                    {/* v5: sign-out-alt */}
                    <i className="fas fa-sign-out-alt" />
                    <span>Logout</span>
                  </span>
                </Link>
              </div>
            </aside>

            {/* KANAN */}
            <section className="md:col-span-9 space-y-6">
              {/* STAT CARDS */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  // v5-safe icons:
                  { label: "Total Ticket", value: 0, icon: "fa-ticket-alt", tint: "bg-blue-50 text-blue-600" },
                  { label: "Active Ticket", value: 0, icon: "fa-bolt",       tint: "bg-green-50 text-green-600" },
                  { label: "On-Hold Ticket", value: 0, icon: "fa-pause",     tint: "bg-amber-50 text-amber-600" },
                  { label: "Closed Ticket", value: 0, icon: "fa-check-circle", tint: "bg-rose-50 text-rose-600" },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl bg-white ring-1 ring-gray-100 p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{s.label}</p>
                        <p className="mt-2 text-xl font-semibold text-gray-900">{s.value}</p>
                      </div>
                      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${s.tint}`}>
                        <i className={`fas ${s.icon}`} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* TABLE */}
              <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm">
                <div className="flex items-center justify-between px-6 py-4">
                  <h2 className="font-semibold text-gray-800">Ringkasan Tiket</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-56 rounded-lg border border-gray-200 px-3 py-2 pr-9 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                    />
                    {/* v5: search */}
                    <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="px-6 py-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-left text-sm text-gray-600">
                          <th className="border-b border-gray-100 px-4 py-3 w-16">No</th>
                          <th className="border-b border-gray-100 px-4 py-3">Detail Tiket</th>
                          <th className="border-b border-gray-100 px-4 py-3 w-40">Status</th>
                          <th className="border-b border-gray-100 px-4 py-3 w-32">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
                            No data available in table
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-2">
                    <button className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-[#FFD17B] mt-auto">
          <div className={`${shell} py-6 text-center text-sm font-semibold text-gray-700`}>
            Copyright © 2025 - 2025 DSTI | Universitas Muhammadiyah Surakarta
          </div>
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
