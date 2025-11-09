// resources/js/Pages/user/profile/edit.tsx
import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import UserLayout from "@/layouts/user-layout";

type ProfilePayload = {
  nama: string;
  nim: string;
  username: string; // email/SSO
  departemen: string;
  phone: string;
  foto: File | null;
};

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const EditProfil: React.FC = () => {
  const initial = {
    nama: "Rike Nursafitri",
    nim: "A710210048",
    username: "a710210048@student.ums.ac.id",
    departemen: "Pendidikan Teknik Informatika",
    phone: "083175761016",
  };

  const { data, setData, post, processing, errors, reset } = useForm<ProfilePayload>({
    nama: initial.nama,
    nim: initial.nim,
    username: initial.username,
    departemen: initial.departemen,
    phone: initial.phone,
    foto: null,
  });

  const [preview, setPreview] = React.useState<string | null>(null);
  const fileRef = React.useRef<HTMLInputElement | null>(null);

  const onFotoChange = (f: File | null) => {
    setData("foto", f);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("nama", data.nama);
    fd.append("nim", data.nim);
    fd.append("username", data.username);
    fd.append("departemen", data.departemen);
    fd.append("phone", data.phone);
    if (data.foto) fd.append("foto", data.foto);

    post("/user/profile/update", {
      data: fd,
      forceFormData: true,
      onSuccess: () => {
        reset("foto");
        if (fileRef.current) fileRef.current.value = "";
      },
    });
  };

  return (
    <UserLayout>
      <Head title="Edit Profil - IT Helpdesk UMS" />

      {/* SUB HEADER */}
      <section className="bg-[#2558B0] text-white">
        <div className={`${shell} py-6`}>
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-semibold">Edit Profil</h1>
            <div className="text-sm opacity-90">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">/</span>
              <span className="font-medium">Edit Profil</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="w-full flex-1 bg-gray-50">
        <div className={`${shell} py-8`}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* SIDEBAR */}
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
                    <span>Semua tiket</span>
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

            {/* FORM */}
            <section className="md:col-span-9">
              <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-6">
                <h2 className="text-base font-semibold text-gray-800">Detail Profil</h2>

                <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Avatar + Upload berada di kolom kanan atas pada md */}
                  <div className="md:order-1 space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Nama Lengkap<span className="text-red-500">*</span>
                    </label>
                    <input
                      value={data.nama}
                      onChange={(e) => setData("nama", e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                      placeholder="Nama lengkap"
                    />
                    {errors.nama && <p className="text-xs text-red-600">{errors.nama}</p>}

                    <label className="block text-sm font-medium text-gray-700">
                      Username<span className="text-red-500">*</span>
                    </label>
                    <input
                      value={data.username}
                      onChange={(e) => setData("username", e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                      placeholder="email/SSO"
                    />
                    {errors.username && <p className="text-xs text-red-600">{errors.username}</p>}

                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      value={data.phone}
                      onChange={(e) => setData("phone", e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                      placeholder="08xxxxxxxxxx"
                    />
                    {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                  </div>

                  <div className="md:order-2 space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      NIM/UniID<span className="text-red-500">*</span>
                    </label>
                    <input
                      value={data.nim}
                      onChange={(e) => setData("nim", e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                      placeholder="NIM/UniID"
                    />
                    {errors.nim && <p className="text-xs text-red-600">{errors.nim}</p>}

                    <label className="block text-sm font-medium text-gray-700">Departemen</label>
                    <input
                      value={data.departemen}
                      onChange={(e) => setData("departemen", e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/15"
                      placeholder="Departemen"
                    />
                    {errors.departemen && <p className="text-xs text-red-600">{errors.departemen}</p>}

                    <div>
                      <p className="text-sm font-medium text-gray-700">Upload Foto</p>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-gray-100 ring-1 ring-gray-200 overflow-hidden">
                          {preview ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full grid place-items-center text-gray-400">
                              <i className="fas fa-user" />
                            </div>
                          )}
                        </div>
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <i className="fas fa-upload" />
                          <span>Pilih File</span>
                          <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => onFotoChange(e.target.files?.[0] ?? null)}
                          />
                        </label>
                      </div>
                      <p className="mt-1 text-[11px] text-gray-400">Ukuran file tidak boleh lebih dari 5MB.</p>
                      {errors.foto && <p className="text-xs text-red-600">{errors.foto}</p>}
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={processing}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#4C7CF6] px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#3f6be0] disabled:opacity-60"
                    >
                      {processing ? (<><i className="fas fa-spinner fa-spin" /> Menyimpan…</>) : (<>Save Changes</>)}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>
    </UserLayout>
  );
};

export default EditProfil;
