import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";

const LoginPage: React.FC = () => {
  // handle form state (Inertia)
  const { data, setData, post, processing } = useForm({
    uniid: "",
    password: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/login");
  };

  return (
    <>
      <Head title="Login - UMS" />

      {/* Background lembut + posisi tengah */}
      <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-lg">
          <div className="rounded-2xl bg-white p-12 shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-1 ring-gray-100">
            <h1 className="mb-8 text-center text-3xl font-bold tracking-wide text-gray-900">
              UMSLogin
            </h1>

            {/* Form login */}
            <form onSubmit={submit} className="space-y-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  UniID/NIM
                </label>
                <input
                  type="text"
                  value={data.uniid}
                  onChange={(e) => setData("uniid", e.target.value)}
                  placeholder="UniID/NIM"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/20"
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
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-[#2558B0] focus:ring-2 focus:ring-[#2558B0]/20"
                />
              </div>

              {/* Tombol Login */}
              <button
                type="submit"
                disabled={processing}
                className="mt-3 w-full rounded-lg bg-[#2558B0] px-4 py-3.5 font-semibold text-white shadow-[0_10px_18px_rgba(37,88,176,0.25)] transition hover:bg-[#1e4a95] disabled:opacity-60"
              >
                {processing ? "Memproses..." : "Login"}
              </button>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-gray-200" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  OR
                </span>
                <span className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Tombol Login dengan Google */}
              <Link
                href="/auth/google/redirect"
                className="w-full inline-flex items-center justify-center gap-3 rounded-lg bg-[#FFD17B] px-4 py-3.5 font-semibold text-gray-800 shadow-[0_10px_18px_rgba(255,209,123,0.45)] transition hover:brightness-95"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-5 w-5"
                />
                Masuk dengan Google
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
