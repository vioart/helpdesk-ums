import React from "react";
import { Head, Link } from "@inertiajs/react";
import UserLayout from "@/layouts/user-layout";

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const Dashboard: React.FC = () => {
  return (
    <UserLayout>
      <Head title="Dashboard - IT Helpdesk UMS" />

      {/* SUB HEADER (tanpa perubahan) */}
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

      {/* MAIN (tanpa perubahan) */}
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

            {/* KANAN */}
            <section className="md:col-span-9 space-y-6">
              {/* STAT CARDS (tetap inline, tidak dijadikan komponen) */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total Ticket", value: 0, icon: "fa-ticket-alt", tint: "bg-blue-50 text-blue-600" },
                  { label: "Active Ticket", value: 0, icon: "fa-bolt", tint: "bg-green-50 text-green-600" },
                  { label: "On-Hold Ticket", value: 0, icon: "fa-pause", tint: "bg-amber-50 text-amber-600" },
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

              {/* TABLE (tanpa perubahan) */}
              <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm">
                <div className="flex items-center justify-between px-6 py-4">
                  <h2 className="font-semibold text-gray-800">Ringkasan Tiket</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-56 rounded-lg border border-gray-200 px-3 py-2 pr-9 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                    />
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
        </div>
      </main>
    </UserLayout>
  );
};

export default Dashboard;
