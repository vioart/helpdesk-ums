// resources/js/Pages/user/tickets/index.tsx
import React, { useMemo, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import UserLayout from "@/layouts/user-layout";

type TicketStatus = "baru" | "proses" | "ditahan" | "ditutup";
type TicketRow = { id: string; subject: string; department: string; openedDate: string; status: TicketStatus };

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const statusBadge = (s: TicketStatus) => {
    const base = "inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ring-1";
    switch (s) {
        case "baru": return `${base} bg-green-50 text-green-700 ring-green-200`;
        case "proses": return `${base} bg-blue-50 text-blue-700 ring-blue-200`;
        case "ditahan": return `${base} bg-amber-50 text-amber-700 ring-amber-200`;
        case "ditutup": return `${base} bg-rose-50 text-rose-700 ring-rose-200`;
    }
};
const statusText = (s: TicketStatus) => (s === "baru" ? "Baru" : s === "proses" ? "Proses" : s === "ditahan" ? "Ditahan" : "Ditutup");

const TicketsIndex: React.FC = () => {
    // seed 50 data demo
    const base: TicketRow[] = [
        { id: "PL-1", subject: "Perbaikan Akun 2 Step Verification", department: "Pend. Teknik Informatika", openedDate: "21 Oktober, 2025", status: "ditahan" },
        { id: "PL-2", subject: "Reset Password SSO", department: "BAA", openedDate: "22 Oktober, 2025", status: "baru" },
        { id: "PL-3", subject: "Gangguan Jaringan Gedung C", department: "Jaringan", openedDate: "20 Oktober, 2025", status: "proses" },
        { id: "PL-4", subject: "Email Kampus Tidak Bisa Login", department: "TIK", openedDate: "18 Oktober, 2025", status: "ditutup" },
    ];
    const tickets: TicketRow[] = useMemo(() => {
        const arr = [...base];
        const pool: TicketStatus[] = ["baru", "proses", "ditahan", "ditutup"];
        for (let i = 5; i <= 50; i++) {
            arr.push({
                id: `PL-${i}`,
                subject: `Dummy Ticket #${i}`,
                department: i % 4 === 0 ? "Jaringan" : i % 3 === 0 ? "BAA" : "TIK",
                openedDate: "17 Oktober, 2025",
                status: pool[i % 4],
            });
        }
        return arr;
    }, []);

    // state
    const [query, setQuery] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<"semua" | TicketStatus>("semua");
    const [perPage, setPerPage] = useState<number | "all">(5);
    const [page, setPage] = useState(1);

    // filter + search
    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        return tickets.filter((t) => {
            const inSearch = t.id.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || t.department.toLowerCase().includes(q);
            const inStatus = statusFilter === "semua" ? true : t.status === statusFilter;
            return inSearch && inStatus;
        });
    }, [tickets, query, statusFilter]);

    // pagination
    const total = filtered.length;
    const pageSize = perPage === "all" ? total || 1 : perPage;
    const totalPages = perPage === "all" ? 1 : Math.max(1, Math.ceil(total / (pageSize as number)));
    const safePage = Math.min(page, totalPages);
    const start = perPage === "all" ? 0 : (safePage - 1) * (pageSize as number);
    const end = perPage === "all" ? total : start + (pageSize as number);
    const pageRows = filtered.slice(start, end);
    const goPage = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

    // nomor halaman
    const windowSize = 5;
    const half = Math.floor(windowSize / 2);
    const startPage = Math.max(1, safePage - half);
    const endPage = Math.min(totalPages, startPage + windowSize - 1);
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    React.useEffect(() => setPage(1), [query, statusFilter, perPage]);

    return (
        <UserLayout>
            <Head title="Semua Tiket - IT Helpdesk UMS" />

            <section className="bg-[#2558B0] text-white">
                <div className={`${shell} py-6`}>
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg sm:text-xl font-semibold">Semua Tiket</h1>
                        <div className="text-sm opacity-90">
                            <Link href="/" className="hover:underline">Home</Link>
                            <span className="mx-2">/</span>
                            <span className="font-medium">Semua Tiket</span>
                        </div>
                    </div>
                </div>
            </section>

            <main className="w-full flex-1 bg-gray-50">
                <div className={`${shell} py-8`}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                        {/* Sidebar */}
                        <aside className="md:col-span-3 space-y-6">
                            <div className="rounded-xl bg-white ring-1 ring-gray-100 p-6 shadow-sm">
                                <Link href="/user/tickets/create" className="block w-full rounded-lg bg-[#4C7CF6] px-4 py-3 text-center font-semibold text-white shadow hover:bg-[#3f6be0]">
                                    Buat Tiket
                                </Link>
                            </div>

                            <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm overflow-hidden">
                                <Link href="/user/dashboard" className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50">
                                    <i className="fas fa-th-large" />
                                    <span>Dashboard</span>
                                </Link>
                                <hr className="border-gray-100" />
                                <Link href="/user/tickets" className="flex items-center justify-between px-5 py-4 bg-gray-50">
                                    <span className="flex items-center gap-3">
                                        <i className="fas fa-ticket-alt" />
                                        <span>Semua Tiket</span>
                                    </span>
                                    <i className="fas fa-angle-right" />
                                </Link>
                                <hr className="border-gray-100" />
                                <Link href="/logout" method="post" as="button" className="w-full text-left px-5 py-4 hover:bg-gray-50">
                                    <span className="inline-flex items-center gap-3 text-red-600">
                                        <i className="fas fa-sign-out-alt" />
                                        <span>Logout</span>
                                    </span>
                                </Link>
                            </div>
                        </aside>

                        {/* Konten */}
                        <section className="md:col-span-9 space-y-6">
                            <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm">
                                <div className="px-6 pt-6 pb-2">
                                    <h2 className="text-base font-semibold text-gray-800">Data Tiket</h2>
                                </div>
                                {/* TOOLBAR — satu baris: kiri entries, kanan search + filter */}
                                <div className="flex items-center gap-3 px-6 py-4">
                                    {/* Entries (kiri) */}
                                    <div className="flex items-center gap-2 text-sm shrink-0">
                                        <span className="text-gray-600">Tampilkan</span>
                                        <select
                                            value={perPage === "all" ? "all" : String(perPage)}
                                            onChange={(e) => setPerPage(e.target.value === "all" ? "all" : Number(e.target.value))}
                                            className="rounded-md border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                                        >
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="all">Semua</option>
                                        </select>
                                        <span className="text-gray-600">entri</span>
                                    </div>

                                    {/* Right group (didorong ke kanan) */}
                                    <div className="ml-auto flex items-center gap-3 shrink-0">
                                        {/* Search dulu */}
                                        <div className="relative">
                                            <input
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                type="text"
                                                placeholder="Cari ID/Subject/Departemen…"
                                                className="w-64 md:w-72 rounded-lg border border-gray-200 px-3 py-2 pr-9 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                                            />
                                            <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        </div>

                                        {/* Filter */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setFilterOpen((v) => !v)}
                                                className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                aria-expanded={filterOpen}
                                            >
                                                <i className="fas fa-filter" />
                                                Filter
                                            </button>
                                            {filterOpen && (
                                                <div className="absolute right-0 z-10 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
                                                    {(["semua", "baru", "proses", "ditahan", "ditutup"] as const).map((opt) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() => { setStatusFilter(opt); setFilterOpen(false); }}
                                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${statusFilter === opt ? "bg-gray-50 font-semibold" : ""}`}
                                                        >
                                                            {opt === "semua" ? "Semua Status" : statusText(opt)}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Badge filter terpilih */}
                                {statusFilter !== "semua" && (
                                    <div className="px-6 -mt-2 mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-600">Filter:</span>
                                            <span className={statusBadge(statusFilter)}>{statusText(statusFilter)}</span>
                                            <button onClick={() => setStatusFilter("semua")} className="text-xs text-gray-600 underline hover:text-gray-800">
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <hr className="border-gray-100" />

                                {/* Tabel */}
                                <div className="px-6 py-4">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50 text-left text-sm text-gray-600">
                                                    <th className="border-b border-gray-100 px-4 py-3 w-20">No</th>
                                                    <th className="border-b border-gray-100 px-4 py-3">ID</th>
                                                    <th className="border-b border-gray-100 px-4 py-3">Subjek</th>
                                                    <th className="border-b border-gray-100 px-4 py-3">Departemen</th>
                                                    <th className="border-b border-gray-100 px-4 py-3 w-44">Tanggal Dibuka</th>
                                                    <th className="border-b border-gray-100 px-4 py-3 w-40">Status</th>
                                                    <th className="border-b border-gray-100 px-4 py-3 w-28">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pageRows.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">Tidak ada data.</td>
                                                    </tr>
                                                ) : (
                                                    pageRows.map((t, i) => (
                                                        <tr key={t.id} className="text-sm hover:bg-gray-50">
                                                            <td className="border-b border-gray-100 px-4 py-3">{start + i + 1}</td>
                                                            <td className="border-b border-gray-100 px-4 py-3">#{t.id}</td>
                                                            <td className="border-b border-gray-100 px-4 py-3">{t.subject}</td>
                                                            <td className="border-b border-gray-100 px-4 py-3">{t.department}</td>
                                                            <td className="border-b border-gray-100 px-4 py-3">{t.openedDate}</td>
                                                            <td className="border-b border-gray-100 px-4 py-3">
                                                                <span className={statusBadge(t.status)}>{statusText(t.status)}</span>
                                                            </td>
                                                            <td className="border-b border-gray-100 px-4 py-3">
                                                                <Link href={`/user/tickets/${t.id}`} className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                                                                    <i className="fas fa-eye" />
                                                                    <span>Lihat</span>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Footer info + pagination */}
                                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-sm text-gray-600">
                                            Menampilkan <span className="font-semibold">{total === 0 ? 0 : start + 1}</span>–<span className="font-semibold">{Math.min(end, total)}</span> dari <span className="font-semibold">{total}</span> entri
                                        </p>

                                        {totalPages > 1 && (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => goPage(safePage - 1)}
                                                    className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                                    disabled={safePage === 1}
                                                >
                                                    Sebelumnya
                                                </button>

                                                {pages.map((p) => (
                                                    <button
                                                        key={p}
                                                        onClick={() => goPage(p)}
                                                        className={`rounded-md border px-3 py-1.5 text-sm ${p === safePage
                                                                ? "border-[#4C7CF6] bg-[#4C7CF6] text-white"
                                                                : "border-gray-200 text-gray-700 hover:bg-gray-50"
                                                            }`}
                                                    >
                                                        {p}
                                                    </button>
                                                ))}

                                                <button
                                                    onClick={() => goPage(safePage + 1)}
                                                    className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                                    disabled={safePage === totalPages}
                                                >
                                                    Berikutnya
                                                </button>
                                            </div>
                                        )}
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

export default TicketsIndex;
