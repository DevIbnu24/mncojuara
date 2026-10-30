import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function DetailInsightPage({ params }) {
  const resolvedParams = await params;
  const postId = resolvedParams.id;

  const post = await prisma.insight.findUnique({
    where: { id: postId },
  });

  if (!post) return notFound();

  return (
    // overflow-x-hidden mencegah layar HP bisa digeser ke kanan/kiri secara tidak sengaja
    <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800 pb-20 md:pb-32 pt-20 md:pt-28 overflow-x-hidden w-full">
      <article className="max-w-3xl mx-auto px-4 sm:px-5 w-full">
        <Link
          href="/insight"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-[12px] md:text-[13px] mb-6 md:mb-8 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Kembali ke Daftar Insight
        </Link>

        <header className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-100 text-blue-700 font-extrabold text-[10px] md:text-[11px] px-3 py-1 rounded-full uppercase tracking-widest">
              {post.category}
            </span>
            <span className="text-slate-500 text-[12px] md:text-[13px] font-medium">
              {new Date(post.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* break-words memastikan judul panjang tanpa spasi tidak merusak layout */}
          <h1 className="text-2xl sm:text-3xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.3] mb-4 break-words">
            {post.title}
          </h1>

          <p className="text-slate-500 text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed break-words">
            {post.excerpt}
          </p>
        </header>

        {/* 
          GAMBAR SAMPUL KITA HAPUS DARI SINI. 
          Website akan murni menampilkan apa yang Anda tulis dan masukkan ke dalam Editor saja (seperti Blogspot/Wordpress).
        */}

        <div className="bg-white p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 w-full overflow-hidden">
          {/* CSS SUPER KETAT UNTUK MOBILE & DESKTOP */}
          <style>{`
            .quill-content { 
              font-size: 1rem; 
              line-height: 1.8; 
              color: #334155; 
              text-align: left; 
              word-break: break-word; /* Mencegah teks panjang merusak layar */
              overflow-wrap: break-word;
            }
            @media (min-width: 768px) {
              .quill-content { font-size: 1.125rem; }
            }
            .quill-content p { 
              margin-bottom: 1.25rem; 
            }
            .quill-content h1, .quill-content h2 { 
              font-size: 1.5rem; 
              font-weight: 800; 
              color: #0f172a; 
              margin-top: 2rem; 
              margin-bottom: 1rem; 
              line-height: 1.3; 
            }
            .quill-content h3 { 
              font-size: 1.25rem; 
              font-weight: 700; 
              color: #1e293b; 
              margin-top: 1.5rem; 
              margin-bottom: 1rem; 
            }
            /* Memaksa gambar selalu responsif mengikuti lebar layar HP */
            .quill-content img { 
              border-radius: 0.5rem; 
              margin: 1.5rem auto; 
              display: block; 
              max-width: 100% !important; 
              height: auto !important; 
              box-shadow: 0 4px 15px rgb(0 0 0 / 0.05); 
            }
            .quill-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
            .quill-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
            .quill-content li { margin-bottom: 0.5rem; }
            .quill-content blockquote { 
              border-left: 4px solid #3b82f6; 
              background: #f8fafc; 
              padding: 1rem 1.25rem; 
              margin: 1.5rem 0; 
              border-radius: 0 0.5rem 0.5rem 0; 
              font-style: italic; 
              color: #475569; 
            }
            .quill-content a { color: #2563eb; text-decoration: underline; font-weight: 500; }
            .quill-content strong { color: #0f172a; font-weight: 700; }
          `}</style>

          <div
            className="quill-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
}
