"use client";
import { useState, useEffect } from "react";
import {
  getTeam,
  addTeamMember,
  editTeamMember,
  deleteTeamMember,
  seedDefaultTeam,
} from "./actions";

export default function KelolaTimPage() {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    credentials: "",
    role: "",
    category: "",
  });

  const loadData = async () => {
    setIsLoading(true);
    const data = await getTeam();
    setTeam(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEditClick = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      credentials: member.credentials || "",
      role: member.role,
      category: member.category,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", credentials: "", role: "", category: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("credentials", formData.credentials);
    data.append("role", formData.role);
    data.append("category", formData.category);

    if (editingId) {
      await editTeamMember(editingId, data);
    } else {
      await addTeamMember(data);
    }
    cancelEdit();
    loadData();
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus anggota tim ini?")) {
      await deleteTeamMember(id);
      if (editingId === id) cancelEdit();
      loadData();
    }
  };

  // Fungsi Tombol Import
  const handleImport = async () => {
    setIsLoading(true);
    await seedDefaultTeam();
    loadData();
  };

  return (
    <div className="mx-auto max-w-[1440px] space-y-8 pb-12 font-sans">
      <div className="relative overflow-hidden rounded-[2rem] border border-amber-100/80 bg-gradient-to-br from-[#fffdf8] via-white to-[#f4f7f5] px-6 py-8 shadow-[0_24px_70px_rgba(40,54,48,0.06)] sm:px-9 sm:py-10 lg:px-12">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl" />
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-amber-700">Ruang kerja / Organisasi</p>
        <h1 className="relative text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Kelola Tim & Organisasi
        </h1>
        <p className="relative mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
          Tambahkan, ubah, atau hapus anggota tim yang tampil di halaman Tentang
          Kami.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
        {/* KIRI: FORM TAMBAH / EDIT */}
        <div
          className={`rounded-[1.75rem] border p-5 shadow-[0_20px_60px_rgba(40,54,48,0.07)] transition-all duration-300 sm:p-7 lg:sticky lg:top-6 lg:col-span-4 ${editingId ? "border-amber-200 bg-amber-50/60" : "border-white bg-white/90"}`}
        >
          <h2
            className={`mb-6 flex items-center gap-2 border-b pb-5 text-base font-semibold tracking-tight ${editingId ? "border-amber-200 text-amber-900" : "border-slate-100 text-slate-800"}`}
          >
            {editingId ? "Ubah Data Anggota" : "Tambah Anggota Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
                placeholder="Contoh: Jafar Shodiq"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                Gelar (Opsional)
              </label>
              <input
                type="text"
                name="credentials"
                value={formData.credentials}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
                placeholder="Contoh: S.Akt., M.Ak., BKP"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                Jabatan
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
                placeholder="Contoh: Managing Partner"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                Kelompok Struktur
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm transition-all hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
              >
                <option value="">-- Pilih Kelompok --</option>
                <option value="Managing Partner">Managing Partner</option>
                <option value="Jajaran Partner">Jajaran Partner</option>
                <option value="Manajemen Inti">Manajemen Inti</option>
                <option value="Tim Konsultan & Spesialis">
                  Tim Konsultan & Spesialis
                </option>
              </select>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className={`w-full rounded-2xl px-4 py-3.5 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(38,55,49,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(38,55,49,0.18)] focus-visible:outline-none focus-visible:ring-4 ${editingId ? "bg-amber-600 hover:bg-amber-700 focus-visible:ring-amber-200" : "bg-slate-900 hover:bg-slate-800 focus-visible:ring-slate-300"}`}
              >
                {editingId ? "Simpan Perubahan" : "Simpan ke Website"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
                >
                  Batal Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* KANAN: DAFTAR TIM */}
        <div className="overflow-hidden rounded-[1.75rem] border border-white bg-white/90 shadow-[0_20px_60px_rgba(40,54,48,0.07)] lg:col-span-8">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-100/80 bg-[#fbfaf7] p-5 sm:flex-row sm:items-center sm:px-7 sm:py-6">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold tracking-tight text-slate-800">
                Daftar Anggota
              </h2>
              <span className="rounded-full bg-amber-100/70 px-3 py-1.5 text-[11px] font-bold text-amber-800">
                {team.length} Anggota
              </span>
            </div>

            {/* Tombol Ajaib Import Data */}
            {team.length === 0 && !isLoading && (
              <button
                onClick={handleImport}
                className="flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(16,100,73,0.16)] transition-all hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  ></path>
                </svg>
                Import Data Tim Bawaan
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 xl:p-7">
            {isLoading ? (
              <p className="text-slate-500 text-sm">Memuat data...</p>
            ) : team.length === 0 ? (
              <p className="text-slate-500 text-sm">
                Belum ada anggota tim. Klik tombol hijau di atas untuk
                memasukkan data awal.
              </p>
            ) : (
              team.map((member) => (
                <div
                  key={member.id}
                  className={`group relative rounded-[1.5rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(40,54,48,0.08)] ${editingId === member.id ? "border-amber-300 bg-amber-50/60" : "border-slate-200/70 bg-gradient-to-br from-white to-[#fbfaf7] hover:border-amber-200"}`}
                >
                  <span className="mb-3 inline-block rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    {member.category}
                  </span>
                  <h3 className="pr-16 text-base font-semibold text-slate-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {member.role}{" "}
                    {member.credentials && `• ${member.credentials}`}
                  </p>

                  <div className="absolute right-4 top-4 flex gap-1.5 opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditClick(member)}
                      aria-label={`Ubah ${member.name}`}
                      className="rounded-xl border border-slate-200/80 bg-white p-2 text-amber-700 shadow-[0_5px_15px_rgba(40,54,48,0.08)] transition-colors hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-100"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      aria-label={`Hapus ${member.name}`}
                      className="rounded-xl border border-slate-200/80 bg-white p-2 text-rose-600 shadow-[0_5px_15px_rgba(40,54,48,0.08)] transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100"
                    >
                      <svg
                        className="w-4 h-4"
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
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
