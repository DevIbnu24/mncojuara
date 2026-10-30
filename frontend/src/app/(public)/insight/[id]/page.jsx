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
    <div className="relative isolate min-h-screen w-full overflow-x-hidden bg-[#f7f6f2] pb-20 pt-10 font-sans text-slate-800 selection:bg-amber-200 selection:text-slate-900 sm:pb-24 sm:pt-14 md:pb-32 md:pt-16">
      <div className="pointer-events-none absolute -right-40 top-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-amber-200/35 blur-3xl" />
      <article className="mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-12">
        <Link
          href="/insight"
          className="group mb-9 inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200/80 bg-white/75 px-4 text-xs font-semibold text-slate-600 shadow-[0_8px_24px_rgba(31,41,55,0.05)] transition duration-300 hover:-translate-x-0.5 hover:border-amber-200 hover:text-amber-800 hover:shadow-[0_12px_30px_rgba(31,41,55,0.08)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 sm:mb-12 sm:text-sm"
        >
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 12H5m7 7l-7-7 7-7"
            />
          </svg>
          Kembali ke Insight
        </Link>

        <header className="relative mb-8 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_65px_rgba(31,41,55,0.06)] sm:mb-10 sm:rounded-[2rem] sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full border border-amber-100 sm:-right-4 sm:-top-24 sm:h-72 sm:w-72" />
          <div className="pointer-events-none absolute -right-2 top-8 h-32 w-32 rounded-full border border-amber-100/70 sm:right-12 sm:top-10 sm:h-40 sm:w-40" />
          <div className="relative">
            <div className="mb-6 flex flex-wrap items-center gap-3 sm:mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-amber-300 sm:text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                {post.category}
              </span>
              <span className="text-xs font-medium text-slate-500 sm:text-sm">
                {new Date(post.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="max-w-4xl break-words text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.05em] text-slate-950 [text-wrap:balance]">
              {post.title}
            </h1>

            <p className="mt-6 max-w-3xl break-words text-base leading-7 text-slate-600 sm:mt-7 sm:text-lg sm:leading-8">
              {post.excerpt}
            </p>

            <div className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-5 sm:mt-10">
              <span className="h-8 w-1 rounded-full bg-amber-400" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs">
                Wawasan profesional · MNCo Juara
              </span>
            </div>
          </div>
        </header>

        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_65px_rgba(31,41,55,0.055)] sm:rounded-[2rem] sm:p-10 md:p-14">
          {/* CSS STYLING QUILL EDITOR */}
          <style>{`
            .quill-content { 
              font-size: 1rem;
              line-height: 1.9;
              color: #334155; 
              text-align: left; 
              word-break: break-word;
              overflow-wrap: break-word;
            }
            @media (min-width: 768px) {
              .quill-content { font-size: 1.125rem; }
            }
            .quill-content p { 
              margin-bottom: 1.75rem;
            }
            .quill-content h1, .quill-content h2 { 
              font-size: clamp(1.4rem, 3vw, 1.9rem);
              font-weight: 700;
              color: #0f172a; 
              margin-top: 2.5rem;
              margin-bottom: 1.1rem;
              line-height: 1.25;
            }
            .quill-content h3 { 
              font-size: clamp(1.15rem, 2.5vw, 1.4rem);
              font-weight: 700; 
              color: #1e293b; 
              margin-top: 2rem;
              margin-bottom: 1rem;
            }
            .quill-content img { 
              border-radius: 1rem;
              margin: 2.25rem auto;
              display: block; 
              max-width: 100% !important; 
              height: auto !important; 
              box-shadow: 0 18px 45px rgb(31 41 55 / 0.1);
            }
            .quill-content ul { list-style-type: disc; padding-left: 1.4rem; margin-bottom: 1.75rem; }
            .quill-content ol { list-style-type: decimal; padding-left: 1.4rem; margin-bottom: 1.75rem; }
            .quill-content li { margin-bottom: 0.65rem; padding-left: 0.25rem; }
            .quill-content blockquote { 
              border-left: 3px solid #f59e0b;
              background: #f8f7f4;
              padding: 1.25rem 1.5rem;
              margin: 2rem 0;
              border-radius: 0 1rem 1rem 0;
              font-style: italic; 
              color: #475569; 
            }
            .quill-content a { color: #b45309; text-decoration: underline; text-underline-offset: 3px; font-weight: 600; }
            .quill-content strong { color: #0f172a; font-weight: 700; }
          `}</style>

          <div
            className="quill-content mx-auto max-w-[44rem]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-amber-200/70 bg-amber-50/70 p-5 sm:flex-row sm:items-center sm:px-7 sm:py-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-800">
              Terus ikuti insight kami
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Temukan perspektif lain untuk mendukung keputusan bisnis Anda.
            </p>
          </div>
          <Link
            href="/insight"
            className="group inline-flex min-h-10 shrink-0 items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
          >
            Lihat artikel lainnya
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-7-7l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </article>
    </div>
  );
}
