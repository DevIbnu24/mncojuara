"use client"; // Menandakan ini adalah komponen interaktif (berjalan di browser)
import { useState } from "react";

export default function AdminContentDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Menyimpan...");

    // Mengirim data ke API Backend yang kita buat di langkah 2
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      setStatus("Layanan berhasil ditambahkan!");
      setTitle("");
      setDescription("");
    } else {
      setStatus("Gagal menyimpan data.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-1 pb-12 font-sans sm:px-2">
      <header className="relative overflow-hidden rounded-[2rem] border border-amber-100/80 bg-gradient-to-br from-[#fffdf8] via-white to-[#f4f7f5] px-6 py-8 shadow-[0_24px_70px_rgba(40,54,48,0.06)] sm:px-9 sm:py-10 lg:px-12">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl" />
        <p className="relative mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-amber-700">
          Ruang kerja / Katalog layanan
        </p>
        <h1 className="relative text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Tambahkan layanan
        </h1>
        <p className="relative mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Susun penawaran layanan yang jelas dan informatif untuk ditampilkan di website.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="rounded-[1.75rem] border border-white bg-white/90 p-5 shadow-[0_20px_60px_rgba(40,54,48,0.07)] transition-shadow duration-300 hover:shadow-[0_24px_65px_rgba(40,54,48,0.09)] sm:p-8 lg:p-10"
      >
        <div className="mb-8 flex items-start gap-4 border-b border-slate-100 pb-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-800">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </span>
          <div>
            <h2 className="text-base font-semibold tracking-tight text-slate-900">Detail layanan</h2>
            <p className="mt-1 text-sm leading-5 text-slate-500">Lengkapi nama dan uraian singkat sebelum menyimpan.</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="mb-1">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600">Nama Layanan</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm text-slate-800 transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
            placeholder="Misal: Tinjauan Pajak Tahunan"
            required
          />
        </div>

        <div className="mb-1">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-36 w-full resize-y rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm leading-6 text-slate-800 transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
            placeholder="Jelaskan detail layanan ini..."
            required
          ></textarea>
        </div>
        </div>

        <div className="mt-7 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-xs leading-5 text-slate-500">
            Informasi ini akan muncul pada katalog layanan publik setelah berhasil disimpan.
          </p>
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(38,55,49,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_16px_30px_rgba(38,55,49,0.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300"
          >
            Simpan ke Website
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>

        {status && (
          <p
            role="status"
            aria-live="polite"
            className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-medium ${
              status.includes("Gagal")
                ? "border-rose-100 bg-rose-50 text-rose-700"
                : status.includes("Menyimpan")
                  ? "border-amber-100 bg-amber-50 text-amber-800"
                  : "border-emerald-100 bg-emerald-50 text-emerald-800"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
