"use client";
import { useState, useEffect } from "react";
import { getWebSetting, updateSingleSetting } from "./actions";

export default function PengaturanWebPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [savingField, setSavingField] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    aboutText: "",
    addressPusat: "",
    addressCabang: "",
    waNumber: "",
    waConsultant: "",
  });

  useEffect(() => {
    async function loadData() {
      const data = await getWebSetting();
      if (data) setFormData({ ...data });
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async (field, label) => {
    setSavingField(field);
    setSuccessMsg("");
    await updateSingleSetting(field, formData[field]);
    setSavingField(null);
    setSuccessMsg(`${label} berhasil diperbarui!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-slate-500 font-sans">
        Memuat data pengaturan...
      </div>
    );

  return (
    <div className="mx-auto max-w-[1280px] space-y-8 pb-12 font-sans">
    <div className="relative overflow-hidden rounded-[2rem] border border-amber-100/80 bg-gradient-to-br from-[#fffdf8] via-white to-[#f4f7f5] px-6 py-8 shadow-[0_24px_70px_rgba(40,54,48,0.06)] sm:px-9 sm:py-10 lg:px-12">
      <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl" />
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-amber-700">Ruang kerja / Identitas digital</p>
      <h1 className="relative text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        Pengaturan Website
      </h1>
      <p className="relative mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
        Kelola konten Beranda, Tentang Kami, dan Kontak Publik.
      </p>
    </div>

      {successMsg && (
        <div role="status" className="fixed right-4 top-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-5 py-4 text-sm font-semibold text-emerald-800 shadow-[0_18px_50px_rgba(25,92,65,0.14)] sm:right-8 sm:top-8">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        {/* KOTAK 1: KONTEN BERANDA */}
        <div className="rounded-[1.75rem] border border-white bg-white/90 p-5 shadow-[0_20px_60px_rgba(40,54,48,0.07)] transition-all duration-300 hover:shadow-[0_24px_65px_rgba(40,54,48,0.09)] sm:p-7 lg:col-span-2">
          <h2 className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-5 text-base font-semibold tracking-tight text-slate-800">
            Teks Utama Beranda (Hero Section)
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 uppercase mb-2">
                Judul Utama (Maksimal 6-8 kata)
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  name="heroTitle"
                  value={formData.heroTitle}
                  onChange={handleChange}
                  className="min-w-0 flex-1 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
                  placeholder="Contoh: Solusi Pajak Terbaik untuk Bisnis Anda"
                />
                <button
                  onClick={() => handleSave("heroTitle", "Judul Beranda")}
                  disabled={savingField === "heroTitle"}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(38,55,49,0.12)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 sm:py-2.5"
                >
                  Simpan
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-700 uppercase mb-2">
                Sub-judul / Deskripsi Pendek
              </label>
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-start">
                <textarea
                  name="heroSubtitle"
                  rows="3"
                  value={formData.heroSubtitle}
                  onChange={handleChange}
                  className="min-w-0 flex-1 resize-none rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
                  placeholder="Contoh: Kami membantu mengelola pajak perusahaan Anda..."
                ></textarea>
                <button
                  onClick={() =>
                    handleSave("heroSubtitle", "Sub-judul Beranda")
                  }
                  disabled={savingField === "heroSubtitle"}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(38,55,49,0.12)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 sm:py-2.5"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* KOTAK 2: PROFIL PERUSAHAAN */}
        <div className="rounded-[1.75rem] border border-white bg-white/90 p-5 shadow-[0_20px_60px_rgba(40,54,48,0.07)] transition-all duration-300 hover:shadow-[0_24px_65px_rgba(40,54,48,0.09)] sm:p-7 lg:col-span-2">
          <h2 className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-5 text-base font-semibold tracking-tight text-slate-800">
            Profil & Sejarah (Tentang Kami)
          </h2>
          <textarea
            name="aboutText"
            rows="5"
            value={formData.aboutText}
            onChange={handleChange}
            className="w-full resize-none rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 text-sm leading-6 text-slate-800 transition-all hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
          ></textarea>
          <div className="flex justify-end mt-3">
            <button
              onClick={() => handleSave("aboutText", "Profil Perusahaan")}
              disabled={savingField === "aboutText"}
              className="rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(38,55,49,0.12)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
            >
              {savingField === "aboutText" ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </div>
        </div>

        {/* KOTAK 3: ALAMAT & KONTAK */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2 lg:gap-6">
          <div className="rounded-[1.6rem] border border-white bg-white/90 p-5 shadow-[0_18px_50px_rgba(40,54,48,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(40,54,48,0.09)] sm:p-6">
            <label className="block text-[12px] font-bold text-slate-700 uppercase mb-3">
              Alamat Pusat
            </label>
            <textarea
              name="addressPusat"
              rows="3"
              value={formData.addressPusat}
              onChange={handleChange}
              className="w-full resize-none rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm transition-all hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
            ></textarea>
            <div className="flex justify-end mt-3">
              <button
                onClick={() => handleSave("addressPusat", "Alamat Pusat")}
                disabled={savingField === "addressPusat"}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
              >
                Simpan
              </button>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-white bg-white/90 p-5 shadow-[0_18px_50px_rgba(40,54,48,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(40,54,48,0.09)] sm:p-6">
            <label className="block text-[12px] font-bold text-slate-700 uppercase mb-3">
              Alamat Cabang
            </label>
            <textarea
              name="addressCabang"
              rows="3"
              value={formData.addressCabang}
              onChange={handleChange}
              className="w-full resize-none rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm transition-all hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
            ></textarea>
            <div className="flex justify-end mt-3">
              <button
                onClick={() => handleSave("addressCabang", "Alamat Cabang")}
                disabled={savingField === "addressCabang"}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
              >
                Simpan
              </button>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-white bg-white/90 p-5 shadow-[0_18px_50px_rgba(40,54,48,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(40,54,48,0.09)] sm:p-6">
            <label className="block text-[12px] font-bold text-slate-700 uppercase mb-3">
              Nomor WA Admin / Maps
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                name="waNumber"
                value={formData.waNumber}
                onChange={handleChange}
                className="min-w-0 flex-1 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm transition-all hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
              />
              <button
                onClick={() => handleSave("waNumber", "WA Admin")}
                disabled={savingField === "waNumber"}
                className="rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 sm:py-2.5"
              >
                Simpan
              </button>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-amber-100 bg-gradient-to-br from-white to-amber-50/40 p-5 shadow-[0_18px_50px_rgba(40,54,48,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(40,54,48,0.09)] sm:p-6">
            <label className="block text-[12px] font-bold text-blue-700 uppercase mb-3">
              Nomor WA Konsultan
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                name="waConsultant"
                value={formData.waConsultant}
                onChange={handleChange}
                className="min-w-0 flex-1 rounded-2xl border border-amber-200/80 bg-white/80 p-3.5 text-sm transition-all hover:border-amber-300 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-100/70"
              />
              <button
                onClick={() => handleSave("waConsultant", "WA Konsultan")}
                disabled={savingField === "waConsultant"}
                className="rounded-xl bg-amber-700 px-5 py-3 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-amber-800 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200 sm:py-2.5"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
