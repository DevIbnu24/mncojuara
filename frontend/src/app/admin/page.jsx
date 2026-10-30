import Link from "next/link";

const statistics = [
  {
    label: "Total layanan",
    value: "4",
    note: "Layanan aktif di website",
    tone: "amber",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    label: "Portofolio",
    value: "0",
    note: "Karya yang ditampilkan",
    tone: "emerald",
    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    label: "Insight artikel",
    value: "0",
    note: "Artikel yang dipublikasikan",
    tone: "sky",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  },
];

const quickActions = [
  {
    title: "Perbarui layanan",
    description: "Atur layanan yang terlihat di website publik.",
    href: "/admin/layanan",
    number: "01",
  },
  {
    title: "Tulis insight",
    description: "Bagikan wawasan pajak dan hukum terbaru.",
    href: "/admin/insight",
    number: "02",
  },
  {
    title: "Kelola tim",
    description: "Perbarui profil dan struktur organisasi.",
    href: "/admin/tim",
    number: "03",
  },
  {
    title: "Pengaturan website",
    description: "Sesuaikan informasi dan kontak MNCo.",
    href: "/admin/pengaturan",
    number: "04",
  },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl">
      <section className="relative isolate mb-8 overflow-hidden rounded-[1.75rem] border border-white/80 bg-white p-6 shadow-[0_18px_55px_rgba(31,41,55,0.06)] sm:mb-10 sm:p-9 lg:rounded-[2rem] lg:p-12">
        <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-64 w-64 rounded-full border border-amber-100 sm:-right-4 sm:-top-28 sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute -right-2 top-8 -z-10 h-36 w-36 rounded-full border border-amber-100/70 sm:right-14 sm:top-10 sm:h-44 sm:w-44" />

        <div className="relative max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-amber-200/80 bg-amber-50/80 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-amber-800 sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Ringkasan workspace
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl">
            Dashboard statistik
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
            Selamat datang di panel admin MNCo Juara Sukoharjo. Kelola informasi
            dan konten website Anda dari satu tempat.
          </p>
        </div>
      </section>

      <section aria-label="Statistik konten">
        <div className="mb-4 flex items-end justify-between gap-4 sm:mb-5">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-amber-700 sm:text-[10px]">
              Gambaran saat ini
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-slate-950 sm:text-xl">
              Konten website
            </h2>
          </div>
          <span className="hidden text-xs text-slate-400 sm:block">
            Statistik konten
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
          {statistics.map((statistic) => (
            <article
              key={statistic.label}
              className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-[0_12px_38px_rgba(31,41,55,0.045)] transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_22px_55px_rgba(31,41,55,0.09)] sm:p-6"
            >
              <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full border border-slate-100 transition-transform duration-500 group-hover:scale-125" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    {statistic.label}
                  </p>
                  <p className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">
                    {statistic.value}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {statistic.note}
                  </p>
                </div>
                <span
                  className={`grid h-11 w-11 place-items-center rounded-2xl transition duration-300 group-hover:rotate-[-4deg] ${
                    statistic.tone === "amber"
                      ? "bg-amber-50 text-amber-700"
                      : statistic.tone === "emerald"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-sky-50 text-sky-700"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={statistic.icon}
                    />
                  </svg>
                </span>
              </div>
              <div
                className={`mt-6 h-1 w-12 rounded-full transition-all duration-500 group-hover:w-20 ${
                  statistic.tone === "amber"
                    ? "bg-amber-300"
                    : statistic.tone === "emerald"
                      ? "bg-emerald-300"
                      : "bg-sky-300"
                }`}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 sm:mt-12">
        <div className="mb-4 sm:mb-5">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-amber-700 sm:text-[10px]">
            Langsung ke
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-slate-950 sm:text-xl">
            Aksi cepat
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex min-h-36 flex-col justify-between rounded-[1.35rem] border border-slate-200/80 bg-white p-5 shadow-[0_10px_32px_rgba(31,41,55,0.04)] transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_20px_48px_rgba(31,41,55,0.085)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 sm:p-6"
            >
              <span className="flex items-center justify-between">
                <span className="text-[9px] font-bold tracking-[0.16em] text-amber-700">
                  {action.number} / ADMIN
                </span>
                <svg
                  className="h-4 w-4 text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M7 7h10v10"
                  />
                </svg>
              </span>
              <span className="mt-7">
                <span className="block text-sm font-semibold text-slate-900 transition-colors group-hover:text-amber-800">
                  {action.title}
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  {action.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
