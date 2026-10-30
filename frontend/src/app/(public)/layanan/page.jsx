import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

// Memastikan Next.js selalu menarik data terbaru dari database
export const dynamic = "force-dynamic";

export default async function LayananPublicPage() {
  // 1. Tarik data layanan dari database
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Tarik data pengaturan web (Khusus Nomor Konsultan)
  const setting = await prisma.webSetting.findFirst();
  const waNumber =
    setting?.waConsultant || setting?.waNumber || "6281229894433";

  return (
    <div className="min-h-screen bg-[#f7f6f2] font-sans text-slate-800 selection:bg-amber-200 selection:text-slate-900">
      <section className="relative isolate overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="pointer-events-none absolute -right-40 -top-36 -z-10 h-[30rem] w-[30rem] rounded-full bg-amber-200/45 blur-3xl sm:-right-20" />
        <div className="pointer-events-none absolute -bottom-44 left-[-9rem] -z-10 h-[24rem] w-[24rem] rounded-full bg-orange-100/75 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <div className="max-w-3xl">
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-amber-200/80 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-800 shadow-[0_8px_28px_rgba(120,83,30,0.06)] sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-amber-500 ring-4 ring-amber-100" />
              Layanan MNCo Juara
            </p>
            <h1 className="max-w-3xl text-[clamp(2.7rem,7vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950 [text-wrap:balance]">
              Pajak dan hukum,
              <br className="hidden sm:block" /> dalam satu arah.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:mt-8 sm:text-lg">
              Pendekatan strategis, rahasia, dan terukur. Kami hadir untuk
              memastikan kepatuhan pajak perusahaan Anda sekaligus meminimalkan
              risiko hukum di masa depan.
            </p>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Halo Tim MNCo Juara, saya mengunjungi website Anda dan ingin menjadwalkan konsultasi gratis untuk bisnis saya. Apakah ada konsultan yang tersedia?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-13 items-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(15,23,42,0.15)] transition duration-300 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-[0_18px_42px_rgba(180,83,9,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 sm:mt-9"
            >
              Diskusikan kebutuhan Anda
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m-7-7l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:ml-auto">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-amber-200/60 via-white/20 to-orange-100/70 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-[#111a27] p-7 text-white shadow-[0_30px_85px_rgba(31,41,55,0.2)] sm:p-9">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
              <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full border border-white/10" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-amber-400/[0.08] blur-3xl" />

              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                  Pendampingan menyeluruh
                </p>
                <h2 className="mt-5 max-w-xs text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                  Kejelasan di setiap keputusan.
                </h2>
                <div className="my-9 h-px bg-white/10" />
                <div className="space-y-5">
                  {[
                    ["01", "Konsultasi & kepatuhan pajak"],
                    ["02", "Perencanaan dan mitigasi risiko"],
                    ["03", "Pendampingan sengketa hukum"],
                  ].map(([number, label]) => (
                    <div key={number} className="flex items-center gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-[10px] font-bold text-amber-300">
                        {number}
                      </span>
                      <span className="text-sm font-medium text-slate-200">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-9 flex items-center justify-between rounded-2xl border border-amber-200/15 bg-amber-300/[0.07] px-4 py-3">
                  <span className="text-xs font-medium text-slate-300">
                    Konsultan bersertifikat
                  </span>
                  <span className="rounded-full bg-amber-300 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                    Brevet C
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-2 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_18px_45px_rgba(31,41,55,0.12)] sm:-left-7 sm:px-5 sm:py-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-slate-400">
                Prinsip kami
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Integritas, tanpa kompromi
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-8 sm:px-8 sm:pb-24 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 sm:text-xs">
                <span className="h-px w-7 bg-amber-500" />
                Fokus Layanan
              </p>
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-slate-950 sm:text-4xl">
                Dukungan profesional, dari strategi hingga penyelesaian.
              </h2>
            </div>
            <span className="text-sm text-slate-500">Sesuai kebutuhan Anda</span>
          </div>

          {services.length === 0 ? (
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center shadow-[0_18px_55px_rgba(31,41,55,0.06)] sm:p-12">
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
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                Layanan sedang diperbarui
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Daftar layanan sedang diperbarui. Silakan kelola melalui panel
                Admin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {services.map((service, index) => (
                <article
                  key={service.id}
                  className={`group relative flex min-h-[21rem] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_14px_42px_rgba(31,41,55,0.05)] transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_24px_60px_rgba(31,41,55,0.1)] sm:p-8 ${index === 0 ? "lg:col-span-2 lg:min-h-[23rem] lg:bg-[#f2ead9]" : ""}`}
                >
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-amber-100 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
                  <div className="relative mb-auto flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-amber-800 transition duration-300 group-hover:rotate-[-4deg] group-hover:bg-slate-950 group-hover:text-amber-300">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.18em] text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative mt-10">
                    <h3 className="mb-3 text-xl font-semibold leading-snug tracking-[-0.03em] text-slate-950 transition-colors duration-300 group-hover:text-amber-800 sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-600">
                      {service.description}
                    </p>
                  </div>

                  <div className="relative mt-7 border-t border-slate-200/80 pt-5">
                    <a
                      href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo Tim MNCo Juara, saya mengunjungi website Anda dan tertarik berdiskusi lebih lanjut mengenai layanan *${service.title}*. Apakah ada konsultan yang tersedia untuk mengatur jadwal pertemuan?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
                    >
                      Konsultasikan via WhatsApp
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
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
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {services.length > 0 && (
        <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12 lg:pb-32">
          <div className="group relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111a27] px-6 py-10 text-white shadow-[0_28px_80px_rgba(31,41,55,0.16)] sm:px-10 sm:py-14 lg:rounded-[2rem] lg:px-16 lg:py-16">
            <div className="pointer-events-none absolute -right-28 -top-40 h-96 w-96 rounded-full bg-amber-400/[0.08] blur-3xl transition-transform duration-700 group-hover:scale-110" />
            <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-sky-300/[0.05] blur-3xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-2xl">
                <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 sm:text-xs">
                  <span className="h-px w-7 bg-amber-400" />
                  Bicarakan kebutuhan Anda
                </p>
                <h2 className="text-2xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl">
                  Butuh solusi spesifik untuk bisnis Anda?
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                  Tim konsultan bersertifikat Brevet C kami siap menganalisis
                  dan memberikan skema perpajakan paling efisien untuk Anda.
                </p>
              </div>

              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Halo Tim MNCo Juara, saya mengunjungi website Anda dan ingin menjadwalkan konsultasi gratis untuk bisnis saya. Apakah ada konsultan yang tersedia?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/button inline-flex min-h-13 shrink-0 items-center justify-center gap-3 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_12px_32px_rgba(180,120,24,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-[0_18px_40px_rgba(180,120,24,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 sm:px-7"
              >
                Jadwalkan konsultasi
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-7-7l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
