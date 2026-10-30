import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function TentangPage() {
  // 1. Tarik profil sejarah dari Database
  const setting = await prisma.webSetting.findFirst();
  const aboutText = setting?.aboutText || "Profil belum diisi oleh admin.";

  // 2. Tarik Data Tim dari Database
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { createdAt: "asc" },
  });

  // 3. Kelompokkan anggota tim berdasarkan hierarki Accordion
  const categoryOrder = [
    { id: "tier1", title: "Managing Partner" },
    { id: "tier2", title: "Jajaran Partner" },
    { id: "tier3", title: "Manajemen Inti" },
    { id: "tier4", title: "Tim Konsultan & Spesialis" },
  ];

  // Filter agar kategori yang kosong tidak ditampilkan
  const orgData = categoryOrder
    .map((cat) => ({
      ...cat,
      members: teamMembers.filter((m) => m.category === cat.title),
    }))
    .filter((cat) => cat.members.length > 0);

  return (
    <div className="overflow-hidden bg-[#f7f6f2] font-sans text-slate-800 selection:bg-amber-200 selection:text-slate-900">
      <section className="relative isolate overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-32 lg:pt-24">
        <div className="pointer-events-none absolute -right-40 -top-36 -z-10 h-[30rem] w-[30rem] rounded-full bg-amber-200/45 blur-3xl sm:-right-20" />
        <div className="pointer-events-none absolute -bottom-60 left-[-10rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-orange-100/70 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl sm:mb-16 lg:mb-20">
            <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-amber-200/80 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-800 shadow-[0_8px_28px_rgba(120,83,30,0.06)] sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-amber-500 ring-4 ring-amber-100" />
              Tentang MNCo Group
            </p>
            <h1 className="max-w-4xl text-[clamp(2.7rem,7vw,5.7rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950 [text-wrap:balance]">
              Mitra strategis
              <br className="hidden sm:block" /> finansial & hukum Anda.
            </h1>
            <div className="mt-7 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:items-center sm:gap-7">
              <span className="h-px w-12 bg-amber-500" />
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Mendampingi setiap keputusan penting dengan keahlian pajak,
                integritas, dan perlindungan hukum yang dapat diandalkan.
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6">
            <article className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(31,41,55,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(31,41,55,0.1)] sm:p-9 lg:rounded-[2rem] lg:p-11">
              <div className="absolute right-0 top-0 h-44 w-44 translate-x-1/3 -translate-y-1/3 rounded-full border border-amber-100 transition-transform duration-700 group-hover:scale-125" />
              <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-amber-100/80 transition-transform duration-700 group-hover:scale-110" />
              <div className="relative">
                <span className="mb-12 block text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 sm:mb-16">
                  01 / Kisah Kami
                </span>
                <p className="whitespace-pre-wrap text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
                  {aboutText}
                </p>
                <div className="mt-10 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span className="h-8 w-1 rounded-full bg-amber-400" />
                  <span className="text-xs font-semibold tracking-wide text-slate-500">
                    Profesional · Terpercaya · Berintegritas
                  </span>
                </div>
              </div>
            </article>

            <div className="grid gap-5 sm:grid-cols-2">
              <article className="group relative flex min-h-[16rem] flex-col overflow-hidden rounded-[1.75rem] border border-amber-200/60 bg-[#f2ead9] p-6 shadow-[0_16px_50px_rgba(120,83,30,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(120,83,30,0.13)] sm:min-h-[20rem] sm:p-8">
                <div className="mb-auto flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/80 text-amber-800 shadow-[0_8px_24px_rgba(120,83,30,0.08)] transition duration-300 group-hover:rotate-[-5deg] group-hover:scale-105">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.18em] text-amber-800/60">
                    01
                  </span>
                </div>
                <div className="mt-12">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-800/70">
                    Arah yang kami tuju
                  </p>
                  <h2 className="mb-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                    Visi Kami
                  </h2>
                  <p className="text-sm leading-7 text-slate-700">
                    Menjadi firma konsultan pajak terdepan yang menjunjung tinggi
                    integritas, profesionalisme, dan kepatuhan hukum yang
                    berkelanjutan.
                  </p>
                </div>
              </article>

              <article className="group relative flex min-h-[16rem] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(31,41,55,0.055)] transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_26px_60px_rgba(31,41,55,0.1)] sm:min-h-[20rem] sm:p-8">
                <div className="mb-auto flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-amber-300 shadow-[0_8px_24px_rgba(15,23,42,0.12)] transition duration-300 group-hover:rotate-[5deg] group-hover:scale-105">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.18em] text-slate-400">
                    02
                  </span>
                </div>
                <div className="mt-12">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">
                    Cara kami bekerja
                  </p>
                  <h2 className="mb-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                    Misi Kami
                  </h2>
                  <ul className="space-y-2.5 text-sm leading-6 text-slate-600">
                    {[
                      "Memberikan solusi perpajakan yang tepat guna.",
                      "Melindungi hak klien secara sah dalam sengketa.",
                      "Mengedukasi tata kelola keuangan yang transparan.",
                    ].map((mission) => (
                      <li key={mission} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        <span>{mission}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#111a27] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[32rem] w-[32rem] rounded-full bg-amber-400/[0.07] blur-3xl" />
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 max-w-2xl sm:mb-12">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 sm:text-xs">
              <span className="h-px w-7 bg-amber-400" />
              Struktur Organisasi
            </p>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
              Keahlian yang bekerja bersama Anda.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Kenali para ahli dan profesional yang mendampingi kebutuhan
              perpajakan serta hukum bisnis Anda.
            </p>
          </div>

          <div className="space-y-4">
            {orgData.length === 0 && (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_18px_50px_rgba(5,12,22,0.15)] sm:p-10">
                <p className="text-sm leading-6 text-slate-400">
                  Struktur organisasi sedang diperbarui oleh Admin.
                </p>
              </div>
            )}

            {orgData.map((tier, index) => (
              <details
                key={tier.id}
                className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] shadow-[0_16px_45px_rgba(5,12,22,0.12)] transition duration-300 open:border-amber-300/30 open:bg-white/[0.06] hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_22px_55px_rgba(5,12,22,0.2)] [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex min-h-[5.5rem] cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 transition-colors duration-300 hover:bg-white/[0.035] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-amber-300 sm:px-7">
                  <span className="flex min-w-0 items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-slate-950/60 text-amber-300 transition duration-300 group-open:border-amber-300/30 group-open:bg-amber-300/10 group-open:text-amber-200">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.17em] text-amber-300/65">
                        Divisi 0{index + 1}
                      </span>
                      <span className="block text-sm font-semibold text-white sm:text-base">
                        {tier.title}
                      </span>
                    </span>
                  </span>

                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-amber-200 transition duration-300 group-open:rotate-180 group-open:border-amber-300/30 group-open:bg-amber-300/10">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="grid grid-cols-1 gap-3 border-t border-white/10 bg-slate-950/20 p-4 sm:grid-cols-2 sm:p-6">
                  {tier.members.map((member) => (
                    <article
                      key={member.id}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/25 hover:bg-white/[0.07] hover:shadow-[0_16px_36px_rgba(5,12,22,0.18)]"
                    >
                      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.17em] text-amber-300">
                        {member.role}
                      </p>
                      <h3 className="text-sm font-semibold leading-6 text-white sm:text-base">
                        {member.name}
                      </h3>
                      {member.credentials && (
                        <p className="mt-1.5 text-xs leading-5 text-slate-400">
                          {member.credentials}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
