"use client";

import { useState, useEffect } from "react";
import {
  getServices,
  addService,
  updateService,
  deleteService,
} from "./actions";

export default function KelolaLayanan() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk form
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fungsi memuat data dari database
  const loadData = async () => {
    setIsLoading(true);
    const data = await getServices();
    setServices(data);
    setIsLoading(false);
  };

  // Jalankan loadData saat halaman pertama kali dibuka
  useEffect(() => {
    loadData();
  }, []);

  // Fungsi saat tombol Simpan ditekan
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (editId) {
      await updateService(editId, formData); // Proses Edit
      setEditId(null);
    } else {
      await addService(formData); // Proses Tambah Baru
    }

    // Kosongkan form dan muat ulang data
    setTitle("");
    setDescription("");
    loadData();
  };

  // Fungsi saat tombol Edit ditekan
  const handleEdit = (service) => {
    setEditId(service.id);
    setTitle(service.title);
    setDescription(service.description);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Gulir ke atas otomatis
  };

  // Fungsi saat tombol Hapus ditekan
  const handleDelete = async (id) => {
    if (
      confirm(
        "Apakah Anda yakin ingin menghapus layanan ini? Data yang terhapus tidak bisa dikembalikan.",
      )
    ) {
      await deleteService(id);
      loadData();
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] space-y-8 pb-12 font-sans">
      <div className="relative overflow-hidden rounded-[2rem] border border-amber-100/80 bg-gradient-to-br from-[#fffdf8] via-white to-[#f4f7f5] px-6 py-8 shadow-[0_24px_70px_rgba(40,54,48,0.06)] sm:px-9 sm:py-10 lg:px-12">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl" />
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-amber-700">Ruang kerja / Katalog</p>
        <h1 className="relative text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Kelola Layanan
        </h1>
        <p className="relative mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
          Tambah, ubah, atau hapus daftar layanan yang tampil di website publik.
        </p>
      </div>

      <div className="grid items-start gap-6 md:gap-8 lg:grid-cols-12">
        {/* PANEL KIRI: FORM INPUT */}
        <div className="rounded-[1.75rem] border border-white bg-white/90 p-5 shadow-[0_20px_60px_rgba(40,54,48,0.07)] backdrop-blur transition-all duration-300 sm:p-7 lg:sticky lg:top-6 lg:col-span-4">
          <h2 className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-5 text-base font-semibold tracking-tight text-slate-800">
            {editId ? (
              <>
                <svg
                  className="w-5 h-5 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                Edit Layanan
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Tambah Layanan Baru
              </>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Nama Layanan
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm text-slate-800 transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
                placeholder="Contoh: Konsultasi Pajak"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Deskripsi Layanan
              </label>
              <textarea
                required
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm text-slate-800 transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
                placeholder="Jelaskan detail layanan ini..."
              ></textarea>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className={`flex-1 rounded-2xl py-3 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(38,55,49,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(38,55,49,0.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200 ${
                  editId
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-slate-900 hover:bg-slate-800"
                }`}
              >
                {editId ? "Simpan Perubahan" : "Simpan Layanan"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setTitle("");
                    setDescription("");
                  }}
                  className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* PANEL KANAN: DAFTAR LAYANAN */}
        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-[1.75rem] border border-white bg-white/90 shadow-[0_20px_60px_rgba(40,54,48,0.07)]">
            <div className="flex flex-col items-start justify-between gap-3 border-b border-slate-100/80 bg-[#fbfaf7] px-5 py-5 sm:flex-row sm:items-center sm:px-7">
              <h2 className="text-base font-semibold tracking-tight text-slate-800">
                Daftar Layanan Tersimpan
              </h2>
              <span className="rounded-full bg-amber-100/70 px-3 py-1.5 text-[11px] font-bold tracking-wide text-amber-800">
                {services.length} Total
              </span>
            </div>

            <div className="p-4 sm:p-7">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-slate-500 text-[13px]">
                    Memuat data dari database...
                  </p>
                </div>
              ) : services.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-[#fbfaf7] py-14 text-center">
                  <svg
                    className="w-12 h-12 text-slate-300 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    ></path>
                  </svg>
                  <p className="text-slate-500 text-[13px]">
                    Belum ada data layanan.
                  </p>
                  <p className="text-slate-400 text-[12px] mt-1">
                    Silakan tambah melalui form di sebelah kiri.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-slate-200/70 bg-gradient-to-br from-white to-[#fbfaf7] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_22px_45px_rgba(40,54,48,0.09)] sm:p-6"
                    >
                      <div className="mb-6">
                        <h3 className="text-base font-semibold leading-snug text-slate-900">
                          {service.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-auto flex justify-start gap-2 border-t border-slate-100 pt-4">
                        <button
                          onClick={() => handleEdit(service)}
                          className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-800 transition-all hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-100"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            ></path>
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="flex items-center gap-1.5 rounded-xl bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 transition-all hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
