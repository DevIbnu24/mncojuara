"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { prosesLogin } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const res = await prosesLogin(formData);

    if (res.success) {
      // Jika login berhasil, arahkan langsung ke Dashboard Admin
      router.push("/admin");
    } else {
      // Jika gagal, tampilkan pesan error merah
      setError(res.message);
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f6f2] px-4 py-8 font-sans selection:bg-amber-200 sm:px-8 sm:py-12">
      <div className="pointer-events-none absolute -left-32 top-[-7rem] h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-[0_32px_100px_rgba(45,57,48,0.12)] backdrop-blur sm:rounded-[2.5rem] lg:min-h-[680px] lg:grid-cols-[1.04fr_0.96fr]">
        <section className="relative isolate flex min-h-56 flex-col justify-between overflow-hidden bg-[#1e3029] p-6 text-white sm:min-h-72 sm:p-9 lg:min-h-full lg:p-12 xl:p-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_90%_10%,rgba(210,166,91,0.28),transparent_38%),linear-gradient(145deg,#263b32_0%,#172720_72%)]" />
          <div className="absolute -right-20 top-24 -z-10 h-64 w-64 rounded-full border border-white/10 sm:h-80 sm:w-80" />
          <div className="absolute -right-10 top-36 -z-10 h-44 w-44 rounded-full border border-amber-200/20 sm:h-60 sm:w-60" />

          <a href="/" className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 backdrop-blur transition-colors hover:bg-white/10">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-300 text-sm font-bold text-[#1e3029]">M</span>
            <span className="pr-2 text-sm font-semibold tracking-wide">MNCo <span className="font-normal text-white/60">Juara</span></span>
          </a>

          <div className="my-9 max-w-lg sm:my-12 lg:my-auto lg:py-16">
            <p className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-amber-200 sm:text-xs">
              <span className="h-px w-7 bg-amber-300/80" />
              Portal administrator
            </p>
            <h2 className="max-w-xl text-3xl font-medium leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl xl:text-[3.5rem]">
              Kelola dengan <span className="font-serif italic text-amber-200">jelas.</span>
              <br className="hidden sm:block" /> Bergerak dengan yakin.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
              Satu ruang kerja untuk menjaga informasi dan insight MNCo Juara tetap relevan.
            </p>
          </div>

          <div className="hidden items-center justify-between border-t border-white/10 pt-5 text-[11px] text-white/45 sm:flex">
            <span>AKSES INTERNAL</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Ruang kerja terlindungi
            </span>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8 sm:mb-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-800 ring-1 ring-amber-100">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-700">Selamat datang kembali</p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-[2.15rem]">
                Masuk ke ruang kerja
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Gunakan akun administrator untuk mengelola konten website.
              </p>
            </div>

            {error && (
              <div role="alert" className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3.5 text-sm font-medium leading-5 text-rose-700">
                <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 4h.01M10.3 3.86 1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="username" className="mb-2 block text-xs font-semibold tracking-wide text-slate-700">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  autoComplete="username"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-[#fbfaf7] px-4 py-3.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/80"
                  placeholder="Masukkan username"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-xs font-semibold tracking-wide text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-[#fbfaf7] px-4 py-3.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/80"
                  placeholder="Masukkan password"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="group mt-2 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl bg-[#1e3029] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(30,48,41,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#294238] hover:shadow-[0_18px_35px_rgba(30,48,41,0.22)] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200 motion-reduce:transform-none motion-reduce:transition-none"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Memverifikasi...
                  </>
                ) : (
                  <>
                    Masuk ke Dashboard
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <a
                href="/"
                className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-amber-800 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-100"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">←</span>
                Kembali ke Website Publik
              </a>
              <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:hidden">
                Akses internal · MNCo Juara
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
