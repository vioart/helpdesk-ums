import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PublicLayout from "@/layouts/public-layout";

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const LoginPage: React.FC = () => {
  // form handling sederhana dengan Inertia
  const { data, setData, post, processing } = useForm({
    uniid: "",
    password: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/login");
  };

  return (
    <PublicLayout>
      <Head title="Login - UMS" />

      {/* Latar lembut + center card */}
      <section className="bg-slate-50">
        <div className={`${shell} py-16`}>
          <div className="mx-auto max-w-xl">
            {/* Card */}
            <div className="rounded-2xl bg-white p-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-1 ring-gray-100">
              {/* Judul */}
              <h1 className="mb-8 text-center text-2xl font-bold tracking-wide text-gray-900">
                UMSLogin
              </h1>

              {/* Form login */}
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    UniID/NIM
                  </label>
                  <input
                    type="text"
                    value={data.uniid}
                    onChange={(e) => setData("uniid", e.target.value)}
                    placeholder="UniID/NIM"
                    className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-gray-900 outline-none ring-0 transition focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    placeholder="Password"
                    className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-gray-900 outline-none ring-0 transition focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/20"
                  />
                </div>

                {/* Tombol Login (biru) */}
                <button
                  type="submit"
                  disabled={processing}
                  className="mt-2 w-full rounded-lg bg-[#1647A1] px-4 py-3 font-semibold text-white shadow-[0_10px_18px_rgba(22,71,161,0.25)] transition hover:bg-[#123a84] disabled:opacity-60"
                >
                  {processing ? "Memproses..." : "Login"}
                </button>

                {/* Divider OR */}
                <div className="my-4 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    OR
                  </span>
                  <span className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Login Google (kuning) */}
                <Link
                  href="/auth/google/redirect"
                  className="w-full rounded-lg bg-[#FFD17B] px-4 py-3 text-center font-semibold text-gray-800 shadow-[0_10px_18px_rgba(255,209,123,0.45)] transition hover:brightness-95"
                >
                  Masuk dengan Google
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default LoginPage;