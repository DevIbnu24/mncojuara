import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function InsightPublicPage() {
  const insights = await prisma.insight.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f6f2] font-sans text-slate-800 selection:bg-amber-200 selection:text-slate-900">
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
        <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-amber-200/45 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-44 left-[-8rem] -z-10 h-[24rem] w-[24rem] rounded-full bg-orange-100/70 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-end gap-8 lg:grid-cols-[1fr_0.6fr] lg:gap-16">
          <div>
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-amber-200/80 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-800 shadow-[0_8px_28px_rgba(120,83,30,0.06)] sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-amber-500 ring-4 ring-amber-100" />
              Ruang Wawasan MNCo
            </p>
            <h1 className="max-w-4xl text-[clamp(2.7rem,7vw,5.7rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950 [text-wrap:balance]">
              Insight yang
              <br className="hidden sm:block" /> membawa Anda lebih jauh.
            </h1>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Pembaruan regulasi, strategi perpajakan, dan perspektif hukum
              bisnis dari para profesional MNCo.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-slate-500">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-amber-700 shadow-[0_8px_24px_rgba(31,41,55,0.06)]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              Pengetahuan praktis untuk keputusan yang lebih baik
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          {insights.length === 0 ? (
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white px-6 py-14 text-center shadow-[0_18px_55px_rgba(31,41,55,0.06)] sm:px-12 sm:py-20">
              <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-amber-50 text-amber-700">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </span>
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                Wawasan baru sedang disiapkan
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Kumpulan insight dan berita sedang disiapkan oleh tim ahli
                kami.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-7 flex items-center justify-between gap-4 sm:mb-9">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700 sm:text-xs">
                    Arsip Artikel
                  </p>
                  <h2 className="mt-1 text-xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-2xl">
                    Ide untuk langkah berikutnya
                  </h2>
                </div>
                <span className="shrink-0 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[10px] font-semibold text-slate-500 sm:px-4 sm:text-xs">
                  {insights.length} artikel
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {insights.map((post, index) => (
                  <article
                    key={post.id}
                    className={`group flex min-h-[28rem] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_14px_42px_rgba(31,41,55,0.05)] transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_26px_65px_rgba(31,41,55,0.11)] ${
                      index === 0
                        ? "sm:col-span-2 sm:min-h-[31rem] lg:col-span-2 lg:grid lg:grid-cols-[1.1fr_0.9fr]"
                        : ""
                    }`}
                  >
                    <div
                      className={`relative h-56 shrink-0 overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-amber-900/70 ${
                        index === 0
                          ? "sm:h-72 lg:h-full lg:min-h-[31rem]"
                          : "sm:h-60"
                      }`}
                    >
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(45deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:26px_26px]" />
                          <div className="absolute -right-12 -top-14 h-64 w-64 rounded-full border border-white/15 transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute -right-1 top-0 h-44 w-44 rounded-full border border-white/10" />
                          <div className="absolute inset-0 flex items-end p-6 sm:p-8">
                            <span className="text-5xl font-semibold tracking-[-0.07em] text-white/80 sm:text-6xl">
                              MNCo
                            </span>
                          </div>
                        </>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/10" />
                      <span className="absolute left-5 top-5 max-w-[calc(100%-2.5rem)] truncate rounded-full border border-white/20 bg-slate-950/45 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-amber-200 shadow-[0_8px_25px_rgba(15,23,42,0.12)] backdrop-blur-md sm:left-6 sm:top-6">
                        {post.category}
                      </span>
                      {index === 0 && (
                        <span className="absolute bottom-5 right-5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md sm:bottom-6 sm:right-6">
                          Artikel terbaru
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
                      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700 sm:text-xs">
                        {new Date(post.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <h3
                        className={`mb-3 line-clamp-2 font-semibold leading-tight tracking-[-0.035em] text-slate-950 transition-colors duration-300 group-hover:text-amber-800 ${
                          index === 0
                            ? "text-2xl sm:text-3xl"
                            : "text-xl sm:text-[1.35rem]"
                        }`}
                      >
                        {post.title}
                      </h3>
                      <p className="mb-7 line-clamp-4 flex-1 text-sm leading-7 text-slate-600">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto border-t border-slate-100 pt-5">
                        <Link
                          href={`/insight/${post.id}`}
                          className="group/read inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-slate-800 transition-colors duration-200 hover:text-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
                        >
                          Baca selengkapnya
                          <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover/read:translate-x-1"
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
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
