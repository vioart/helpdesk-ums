import React, { useRef, useState } from "react";
import UserLayout from "@/layouts/user-layout";
import { Head, Link, useForm } from "@inertiajs/react";

type TicketStatus = "baru" | "proses" | "ditahan" | "ditutup";

type Ticket = {
  id: string;
  department: string;
  subject: string;
  openedDate: string;
  closedDate: string | null;
  status: TicketStatus;
  createdAgo: string;
  description: string;
};

type Message = {
  id: string;
  author: string;
  role: "user" | "staff";
  timeAgo: string;
  text: string;
};

type ReplyPayload = {
  ticket_id: string;
  message: string;
  status: TicketStatus;
  attachment: File | null;
};

const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

const statusBadgeClass = (s: TicketStatus) => {
  switch (s) {
    case "baru":
      return "bg-amber-50 text-amber-700 ring-amber-200";
    case "proses":
      return "bg-blue-50 text-blue-700 ring-blue-200";
    case "ditahan":
      return "bg-rose-50 text-rose-700 ring-rose-200";
    case "ditutup":
      return "bg-green-50 text-green-700 ring-green-200";
  }
};

const statusDotClass = (s: TicketStatus) => {
  switch (s) {
    case "baru":
      return "bg-amber-500";
    case "proses":
      return "bg-blue-500";
    case "ditahan":
      return "bg-rose-500";
    case "ditutup":
      return "bg-green-500";
  }
};

const ShowTicket: React.FC = () => {
  const ticket: Ticket = {
    id: "PL-1",
    department: "Pend. Teknik Informatika",
    subject: "Perbaikan Akun 2 Step Verification",
    openedDate: "21 Oktober, 2025",
    closedDate: null, // contoh belum ditutup
    status: "proses",
    createdAgo: "2 detik yang lalu",
    description:
      "Tidak dapat mengaktifkan atau menggunakan verifikasi dua langkah (2-Step Verification) pada akun SSO UMS. Login gagal karena kode verifikasi tidak muncul atau tidak dikenali.",
  };

  const [messages] = useState<Message[]>([
    { id: "m1", author: "Pelayanan", role: "staff", timeAgo: "10 menit yang lalu", text: "Silakan ikuti panduan di IG & YouTube IT Helpdesk UMS." },
    { id: "m2", author: "Rike Nursafitri", role: "user", timeAgo: "2 menit yang lalu", text: "Mohon segera diatasi ya, min." },
  ]);

  const steps = [
    { key: "made",        label: "Tiket Dibuat",                   time: "02/11/2025 09:23", state: "done",    icon: "fa-check-circle" },
    { key: "verified",    label: "Diverifikasi oleh Helpdesk",     time: "02/11/2025 10:10", state: "done",    icon: "fa-check-circle" },
    { key: "assigned",    label: "Ditugaskan ke Staf Jaringan",    time: "02/11/2025 10:30", state: "done",    icon: "fa-check-circle" },
    { key: "working",     label: "Dalam Proses",                   time: "02/11/2025 11:15", state: "done",    icon: "fa-check-circle" },
    { key: "finished",    label: "Selesai",                        time: "02/11/2025 13:45", state: "done",    icon: "fa-check-circle" },
    { key: "confirmation",label: "Menunggu Konfirmasi Pengguna",   note: "Diterima/Ditolak", state: "current", icon: "fa-clock" },
  ] as Array<{
    key: string; label: string; note?: string; time?: string;
    state: "done" | "current" | "todo"; icon: string;
  }>;

  const [showReply, setShowReply] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const { data, setData, post, processing, errors, reset } = useForm<ReplyPayload>({
    ticket_id: ticket.id,
    message: "",
    status: ticket.status,
    attachment: null,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ticket_id", data.ticket_id);
    formData.append("message", data.message);
    formData.append("status", data.status);
    if (data.attachment) formData.append("attachment", data.attachment);

    post("/tickets/reply", {
      data: formData,
      forceFormData: true,
      onSuccess: () => {
        reset("message", "attachment");
        if (fileRef.current) fileRef.current.value = "";
        setShowReply(false);
      },
    });
  };

  const shouldShowFullReplyForm = messages.length === 0;

  return (
    <UserLayout>
      <Head title={`Tampilan Tiket #${ticket.id} - IT Helpdesk UMS`} />

      <section className="bg-[#2558B0] text-white">
        <div className={`${container} py-6`}>
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-semibold">Tampilan Tiket</h1>
            <div className="text-sm opacity-90">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">/</span>
              <span className="font-medium">Tampilan Tiket</span>
            </div>
          </div>
        </div>
      </section>

      <main className="w-full flex-1 bg-gray-50">
        <div className={`${container} py-8`}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* Kiri */}
            <aside className="md:col-span-4 space-y-6">
              {/* Informasi Tiket */}
              <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold">Informasi Tiket</h2>
                  <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
                    <i className="fas fa-paper-plane text-gray-500" />
                    <span>Buat Tiket</span>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex"><div className="w-36 text-gray-500">ID Tiket</div><div className="flex-1">: #{ticket.id}</div></div>
                  <div className="flex"><div className="w-36 text-gray-500">Departemen</div><div className="flex-1">: {ticket.department}</div></div>
                  <div className="flex"><div className="w-36 text-gray-500">Subjek</div><div className="flex-1">: {ticket.subject}</div></div>
                  <div className="flex"><div className="w-36 text-gray-500">Tanggal Dibuka</div><div className="flex-1">: {ticket.openedDate}</div></div>
                  <div className="flex"><div className="w-36 text-gray-500">Tanggal Ditutup</div><div className="flex-1">: {ticket.closedDate ?? "—"}</div></div>
                  <div className="flex items-center">
                    <div className="w-36 text-gray-500">Status</div>
                    <div className="flex-1">
                      :{" "}
                      <span className={`ml-1 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusBadgeClass(ticket.status)}`}>
                        <span className={`h-2 w-2 rounded-full ${statusDotClass(ticket.status)}`} />
                        {ticket.status === "baru" ? "Baru" : ticket.status === "proses" ? "Proses" : ticket.status === "ditahan" ? "Ditahan" : "Ditutup"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Tiket */}
              <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-800">Progress Tiket</h3>
                <ol className="mt-3 space-y-3">
                  {steps.map((s) => (
                    <li key={s.key} className="flex gap-3">
                      <span className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1 text-xs
                        ${s.state === "done" ? "bg-green-50 text-green-700 ring-green-200"
                        : s.state === "current" ? "bg-amber-50 text-amber-700 ring-amber-200"
                        : "bg-gray-50 text-gray-500 ring-gray-200"}`}>
                        <i className={`fas ${s.icon}`} />
                      </span>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className={s.state === "todo" ? "text-gray-500" : "text-gray-800 font-medium"}>{s.label}</span>
                          {s.note && <span className="ml-2 text-xs text-gray-500">({s.note})</span>}
                        </div>
                        {s.time ? <div className="text-xs text-gray-500 mt-0.5">{s.time}</div> : <div className="text-xs text-gray-400 mt-0.5 italic">Menunggu…</div>}
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-4">
                  <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-[#4C7CF6] transition-all"
                      style={{ width: `${Math.round((steps.filter(s => s.state !== "todo").length / steps.length) * 100)}%` }}
                    />
                  </div>
                  <div className="mt-1 text-[11px] text-gray-500">
                    {steps.filter(s => s.state === "done" || s.state === "current").length}/{steps.length} tahap selesai
                  </div>
                </div>
              </div>
            </aside>

            {/* Kanan */}
            <section className="md:col-span-8 space-y-6">
              <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-semibold">{ticket.subject}</h2>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <i className="far fa-clock text-gray-500" />
                  <span>Dibuat {ticket.createdAgo}</span>
                </div>
                <p className="mt-4 text-sm text-gray-700 leading-relaxed">{ticket.description}</p>
              </div>

              {shouldShowFullReplyForm ? (
                <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-6">
                  <form onSubmit={onSubmit}>
                    <h3 className="text-base font-semibold">Balas Tiket</h3>

                    <div className="mt-4">
                      <textarea
                        value={data.message}
                        onChange={(e) => setData("message", e.target.value)}
                        rows={4}
                        placeholder="Tulis balasan Anda…"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                      />
                      {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                    </div>

                    <div className="mt-6">
                      <p className="text-sm font-medium text-gray-800">Unggah Berkas</p>
                      <label className={`mt-2 flex h-24 cursor-pointer items-center justify-center rounded-lg border border-dashed ${
                        data.attachment ? "border-green-400 bg-green-50 text-green-700" : "border-gray-300 bg-gray-50/40 text-gray-600 hover:bg-gray-50"
                      } transition-colors`}>
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
                              <span className="truncate max-w-[16rem] sm:max-w-[24rem]">{data.attachment.name}</span>
                            </>
                          ) : (
                            <>
                              <i className="fas fa-cloud-upload-alt text-lg" />
                              <span>Pilih berkas untuk diunggah</span>
                            </>
                          )}
                        </div>
                      </label>
                      <p className="mt-2 text-[11px] text-gray-400">Ukuran berkas maksimal 3MB</p>
                      {errors.attachment && <p className="mt-1 text-xs text-red-600">{errors.attachment}</p>}
                    </div>

                    <div className="mt-6">
                      <p className="text-sm font-medium text-gray-800">Status</p>
                      <div className="mt-2 grid grid-cols-2 gap-3 text-sm sm:flex sm:items-center sm:gap-6">
                        <label className="inline-flex items-center gap-2">
                          <input type="radio" name="status" value="baru" checked={data.status === "baru"} onChange={() => setData("status", "baru")} className="h-4 w-4 accent-[#2558B0]" />
                          <span>Baru</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                          <input type="radio" name="status" value="ditutup" checked={data.status === "ditutup"} onChange={() => setData("status", "ditutup")} className="h-4 w-4 accent-[#2558B0]" />
                          <span>Ditutup</span>
                        </label>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button type="submit" disabled={processing} className="inline-flex items-center gap-2 rounded-lg bg-[#4C7CF6] px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#3f6be0] disabled:opacity-60">
                        {processing ? (<><i className="fas fa-spinner fa-spin" /> Mengirim…</>) : (<>Kirim Balasan</>)}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="rounded-xl ring-1 ring-gray-100 shadow-sm overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowReply((v) => !v)}
                      className="flex w-full items-center justify-between bg-[#4C7CF6] px-4 py-2 text-white"
                      aria-expanded={showReply}
                      aria-controls="reply-form"
                    >
                      <span className="font-semibold">Balas Tiket</span>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-white/20">
                        <i className={`fas ${showReply ? "fa-minus" : "fa-plus"}`} />
                      </span>
                    </button>
                  </div>

                  {showReply && (
                    <div id="reply-form" className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-6">
                      <form onSubmit={onSubmit}>
                        <div>
                          <textarea
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            rows={4}
                            placeholder="Tulis balasan Anda…"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                          />
                          {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-800">Unggah Berkas</p>
                          <label className={`mt-2 flex h-24 cursor-pointer items-center justify-center rounded-lg border border-dashed ${
                            data.attachment ? "border-green-400 bg-green-50 text-green-700" : "border-gray-300 bg-gray-50/40 text-gray-600 hover:bg-gray-50"
                          } transition-colors`}>
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
                                  <span className="truncate max-w-[16rem] sm:max-w-[24rem]">{data.attachment.name}</span>
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-cloud-upload-alt text-lg" />
                                  <span>Pilih berkas untuk diunggah</span>
                                </>
                              )}
                            </div>
                          </label>
                          <p className="mt-2 text-[11px] text-gray-400">Ukuran berkas maksimal 3MB</p>
                          {errors.attachment && <p className="mt-1 text-xs text-red-600">{errors.attachment}</p>}
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-800">Status</p>
                          <div className="mt-2 grid grid-cols-2 gap-3 text-sm sm:flex sm:items-center sm:gap-6">
                            <label className="inline-flex items-center gap-2">
                              <input type="radio" name="status" value="baru" checked={data.status === "baru"} onChange={() => setData("status", "baru")} className="h-4 w-4 accent-[#2558B0]" />
                              <span>Baru</span>
                            </label>
                            <label className="inline-flex items-center gap-2">
                              <input type="radio" name="status" value="ditutup" checked={data.status === "ditutup"} onChange={() => setData("status", "ditutup")} className="h-4 w-4 accent-[#2558B0]" />
                              <span>Ditutup</span>
                            </label>
                          </div>
                        </div>

                        <div className="mt-4">
                          <button type="submit" disabled={processing} className="inline-flex items-center gap-2 rounded-lg bg-[#4C7CF6] px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#3f6be0] disabled:opacity-60">
                            {processing ? (<><i className="fas fa-spinner fa-spin" /> Mengirim…</>) : (<>Kirim Balasan</>)}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm">
                    <div className="px-6 py-4">
                      <h3 className="text-base font-semibold">Percakapan</h3>
                    </div>
                    <hr className="border-gray-100" />
                    <ul className="px-6 py-4 space-y-4">
                      {messages.map((m) => (
                        <li key={m.id} className="flex gap-4">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 grid place-items-center text-gray-500">
                            <i className="fas fa-user" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{m.author}</p>
                            <p className="mt-0.5 text-xs text-gray-500">
                              <i className="far fa-clock mr-1" />
                              {m.timeAgo}
                            </p>
                            <p className="mt-2 text-sm text-gray-700">{m.text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </main>
    </UserLayout>
  );
};

export default ShowTicket;
