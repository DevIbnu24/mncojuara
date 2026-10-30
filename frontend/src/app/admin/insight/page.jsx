"use client";
import { useState, useEffect } from "react";
import { getInsights, saveInsight, deleteInsight } from "./actions";
import dynamic from "next/dynamic";

// Memanggil CSS bawaan Quill agar tampilannya rapi
import "react-quill-new/dist/quill.snow.css";

// WAJIB di Next.js: Dynamic import agar tidak error SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// Konfigurasi Toolbar ala Blogspot/WordPress
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Heading 1-6
    [{ font: [] }], // Jenis Font
    ["bold", "italic", "underline", "strike", "blockquote"], // Format teks
    [{ list: "ordered" }, { list: "bullet" }], // List angka & titik
    [{ script: "sub" }, { script: "super" }], // Subscript / Superscript
    [{ indent: "-1" }, { indent: "+1" }], // Indentasi
    [{ align: [] }], // Rata kiri, tengah, kanan
    [{ color: [] }, { background: [] }], // Warna teks & highlight
    ["link", "image", "video"], // Insert Link, Gambar, Video
    ["clean"], // Tombol hapus format
  ],
};

export default function AdminInsightPage() {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Pajak Korporat",
    excerpt: "",
    content: "",
    imageUrl: "",
  });

  const loadData = async () => {
    setIsLoading(true);
    const data = await getInsights();
    setInsights(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNewPost = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "Pajak Korporat",
      excerpt: "",
      content: "",
      imageUrl: "",
    });
    setIsFormOpen(true);
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl || "",
    });
    setIsFormOpen(true);
  };

  const closeEditor = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handler KHUSUS untuk React Quill
  const handleContentChange = (content) =>
    setFormData({ ...formData, content });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content || formData.content === "<p><br></p>") {
      alert("Isi konten artikel tidak boleh kosong!");
      return;
    }
    setIsSaving(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("excerpt", formData.excerpt);
    data.append("content", formData.content);
    data.append("imageUrl", formData.imageUrl);

    await saveInsight(editingId, data);
    setIsSaving(false);
    closeEditor();
    loadData();
  };

  const handleDelete = async (id) => {
    if (
      confirm("Apakah Anda yakin ingin menghapus artikel ini secara permanen?")
    ) {
      await deleteInsight(id);
      loadData();
    }
  };

  if (isFormOpen) {
    return (
      <div className="max-w-6xl mx-auto font-sans pb-20">
        {/* CSS Tambahan agar Quill Editor memenuhi tinggi layar */}
        <style>{`
          .quill-editor-container .ql-container {
            min-height: 360px;
            height: clamp(360px, 58vh, 640px);
            font-size: 15px;
            font-family: inherit;
            border: 0;
            border-bottom-left-radius: 1.25rem;
            border-bottom-right-radius: 1.25rem;
            background-color: white;
          }
          .quill-editor-container .ql-toolbar {
            border: 0;
            border-bottom: 1px solid #eef0eb;
            border-top-left-radius: 1.25rem;
            border-top-right-radius: 1.25rem;
            background-color: #fbfaf7;
          }
          .quill-editor-container .ql-editor {
            padding: 1.5rem;
            line-height: 1.8;
          }
          @media (max-width: 640px) {
            .quill-editor-container .ql-container {
              height: 52vh;
              min-height: 320px;
            }
            .quill-editor-container .ql-editor {
              padding: 1rem;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .insight-motion {
              transition: none !important;
              animation: none !important;
            }
          }
        `}</style>

        <div className="mb-7 flex flex-col gap-4 rounded-[1.75rem] border border-white bg-white/90 p-4 shadow-[0_18px_50px_rgba(40,54,48,0.06)] sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <button
              onClick={closeEditor}
              aria-label="Kembali ke daftar artikel"
              className="shrink-0 rounded-full border border-slate-200 bg-white p-2.5 text-slate-500 shadow-[0_6px_18px_rgba(40,54,48,0.07)] transition-all hover:-translate-x-0.5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
            </button>
            <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">Ruang editorial</p>
            <h1 className="truncate text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              {editingId ? "Edit Artikel" : "Tulis Artikel Baru"}
            </h1>
            </div>
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            disabled={isSaving}
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(38,55,49,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_16px_30px_rgba(38,55,49,0.18)] disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300 sm:w-auto"
          >
            {isSaving ? "Menyimpan..." : "Publikasikan Artikel"}
            {!isSaving && (
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-7">
          <div className="space-y-5 rounded-[1.75rem] border border-white bg-white/80 p-5 shadow-[0_18px_50px_rgba(40,54,48,0.06)] sm:p-7 lg:col-span-8 lg:p-9">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border-0 bg-transparent px-0 text-2xl font-semibold tracking-tight text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-0 sm:text-4xl"
              placeholder="Ketik Judul Artikel di Sini..."
            />

            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows="2"
              className="w-full resize-none border-0 bg-transparent px-0 text-base leading-7 text-slate-600 placeholder:text-slate-300 focus:outline-none focus:ring-0 sm:text-lg"
              placeholder="Tuliskan ringkasan singkat (excerpt) untuk memancing pembaca..."
            ></textarea>

            {/* EDITOR SAKTI REACT-QUILL */}
            <div className="quill-editor-container overflow-hidden rounded-[1.25rem] border border-slate-200/80 shadow-[0_12px_35px_rgba(40,54,48,0.06)]">
              <ReactQuill
                theme="snow"
                modules={quillModules}
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Mulai menulis cerita Anda di sini... (Blok teks untuk menebalkan atau mengubah gaya)"
              />
            </div>
          </div>

          <div className="space-y-5 lg:sticky lg:top-6 lg:col-span-4">
            <div className="rounded-[1.75rem] border border-white bg-white/90 p-5 shadow-[0_20px_60px_rgba(40,54,48,0.07)] sm:p-6">
              <h3 className="mb-5 border-b border-slate-100 pb-4 text-sm font-semibold tracking-tight text-slate-800">
                Pengaturan Publikasi
              </h3>

              <div className="mb-5">
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Kategori Artikel
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm transition-all hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
                >
                  <option value="Pajak Korporat">Pajak Korporat</option>
                  <option value="Hukum Pajak">Hukum Pajak</option>
                  <option value="Berita Regulasi">Berita Regulasi</option>
                  <option value="Perencanaan Keuangan">
                    Perencanaan Keuangan
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  URL Gambar Utama / Sampul
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="mb-3 w-full rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100/70"
                  placeholder="https://contoh.com/gambar.jpg"
                />

                {formData.imageUrl ? (
                  <div className="group relative h-40 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=URL+Gambar+Gagal+Dimuat";
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex h-28 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-[#fbfaf7] text-slate-400">
                    <svg
                      className="w-6 h-6 mb-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span className="text-[10px]">Belum ada gambar</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] space-y-8 pb-12 font-sans">
      <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[2rem] border border-amber-100/80 bg-gradient-to-br from-[#fffdf8] via-white to-[#f4f7f5] px-6 py-8 shadow-[0_24px_70px_rgba(40,54,48,0.06)] sm:flex-row sm:items-center sm:px-9 sm:py-10 lg:px-12">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="relative">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-amber-700">Ruang kerja / Editorial</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Manajemen Insight
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Kelola publikasi artikel, berita, dan edukasi perpajakan Anda.
          </p>
        </div>
        <button
          onClick={handleNewPost}
          className="relative inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(38,55,49,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_16px_30px_rgba(38,55,49,0.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300 sm:w-auto"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Tulis Artikel Baru
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-slate-500">
          Memuat artikel...
        </div>
      ) : insights.length === 0 ? (
        <div className="rounded-[2rem] border border-white bg-white/90 px-6 py-14 text-center shadow-[0_20px_60px_rgba(40,54,48,0.07)] sm:px-12 sm:py-20">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-amber-50 text-amber-700">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              ></path>
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-slate-900">
            Belum Ada Artikel
          </h3>
          <p className="mx-auto mb-7 max-w-sm text-sm leading-6 text-slate-500">
            Anda belum memublikasikan insight apapun. Mulai tulis artikel
            pertama Anda untuk klien!
          </p>
          <button
            onClick={handleNewPost}
            className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(38,55,49,0.12)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300"
          >
            Tulis Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-7">
          {insights.map((post) => (
            <div
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-white bg-white/90 shadow-[0_18px_50px_rgba(40,54,48,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(40,54,48,0.11)]"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-50 to-slate-100 sm:h-52">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-amber-200">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                )}
                <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 shadow-[0_5px_18px_rgba(40,54,48,0.08)] backdrop-blur">
                  {post.category}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="mb-3 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  {new Date(post.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-slate-900">
                  {post.title}
                </h3>
                <p className="mb-6 line-clamp-3 flex-1 text-sm leading-6 text-slate-500">
                  {post.excerpt}
                </p>

                <div className="flex gap-2 border-t border-slate-100 pt-4">
                  <button
                    onClick={() => handleEdit(post)}
                    className="min-h-10 flex-1 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition-all hover:border-amber-200 hover:bg-amber-50 hover:text-amber-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-100"
                  >
                    Edit Artikel
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    aria-label={`Hapus artikel ${post.title}`}
                    className="flex min-h-10 min-w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50 px-3 text-slate-500 transition-all hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100"
                    title="Hapus"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
