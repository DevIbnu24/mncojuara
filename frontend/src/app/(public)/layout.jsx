import Navbar from "./Navbar";
import Link from "next/link";

// =========================================================================
// PENGATURAN SEO & LINK PREVIEW (Whatsapp, Google, Sosmed)
// =========================================================================
export const metadata = {
  title: "MNCo Juara | Konsultan Pajak & Kuasa Hukum",
  description:
    "MNCo Juara adalah firma profesional bersertifikat Brevet C dan Kuasa Hukum terdaftar. Kami memberikan solusi konsultasi, sengketa, dan perencanaan pajak untuk amankan bisnis Anda.",
  icons: {
    icon: "/asset/images/logo-mnco.png", // Menampilkan logo kecil di Tab Browser bagian atas
  },
  openGraph: {
    title: "MNCo Juara | Konsultan Pajak & Kuasa Hukum",
    description:
      "Mitra strategis finansial Anda. Layanan konsultasi pajak korporat, sengketa pajak, dan pendampingan hukum wilayah Sukoharjo, Semarang & sekitarnya.",
    siteName: "MNCo Juara",
    images: [
      {
        url: "/asset/images/logo-mnco.png", // Logo yang akan muncul besar saat link disebar di WhatsApp
        width: 800,
        height: 600,
        alt: "Logo MNCo Juara",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-amber-200 selection:text-slate-900">
      <Navbar />

      <main className="flex-grow">{children}</main>

      <footer className="relative isolate overflow-hidden bg-[#111a27] font-sans text-slate-300">
        <div className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-amber-400/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-64 left-[-10rem] -z-10 h-[30rem] w-[30rem] rounded-full bg-sky-400/[0.05] blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 pb-6 pt-14 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24">
          <div className="mb-14 flex flex-col gap-7 rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_70px_rgba(5,12,22,0.18)] sm:mb-16 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:mb-20 lg:rounded-[2rem] lg:p-10">
            <div className="max-w-2xl">
              <p className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 sm:text-xs">
                <span className="h-px w-7 bg-amber-400" />
                Langkah berikutnya
              </p>
              <h2 className="text-2xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl">
                Hadapi urusan pajak dengan lebih tenang.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
                Diskusikan kebutuhan bisnis Anda bersama tim MNCo Juara.
              </p>
            </div>
            <Link
              href="/kontak"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-amber-400 px-5 text-sm font-bold text-slate-950 shadow-[0_12px_32px_rgba(180,120,24,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-[0_18px_40px_rgba(180,120,24,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 sm:px-6"
            >
              Hubungi tim kami
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14m-7-7l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-[1.15fr_0.8fr_1fr_1fr] lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <Link
                href="/"
                aria-label="MNCo Group - Beranda"
                className="group mb-5 inline-flex items-center gap-3 rounded-xl transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                <img
                  src="/asset/images/logo-mnco.png"
                  alt=""
                  className="h-10 w-auto brightness-0 invert opacity-90"
                />
                <span className="flex flex-col">
                  <span className="text-xl font-bold leading-none tracking-[-0.04em] text-white">
                    MNCo Group
                  </span>
                  <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-amber-300">
                    Konsultan & Hukum
                  </span>
                </span>
              </Link>
              <p className="max-w-sm text-sm leading-7 text-slate-400">
                Firma profesional pemegang lisensi resmi Konsultan Pajak Brevet
                C dan Kuasa Hukum Pajak yang siap mengamankan bisnis Anda.
              </p>
            </div>

            <div>
              <h3 className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300 sm:text-[11px]">
                <span className="h-px w-5 bg-amber-400/70" />
                Layanan Utama
              </h3>
              <ul className="space-y-3.5 text-sm text-slate-400">
                {[
                  ["Konsultasi & Kepatuhan", "/layanan/konsultasi"],
                  ["Sengketa & Kuasa Hukum", "/layanan/sengketa"],
                  ["Perencanaan Pajak", "/layanan/perencanaan"],
                  ["Corporate Training", "/layanan/training"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
                    >
                      <span className="h-px w-0 bg-amber-400 transition-all duration-300 group-hover:w-3" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300 sm:text-[11px]">
                <span className="h-px w-5 bg-amber-400/70" />
                Pusat · Sukoharjo
              </h3>
              <div className="space-y-4 text-sm leading-6 text-slate-400">
                <p className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-amber-300/80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    Gawanan, Sukoharjo,
                    <br />
                    Jawa Tengah 57512
                  </span>
                </p>
                <a
                  href="tel:+6281229894433"
                  className="group inline-flex items-center gap-3 font-medium text-slate-300 transition-colors duration-200 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-amber-300/80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  0812-2989-4433
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300 sm:text-[11px]">
                <span className="h-px w-5 bg-amber-400/70" />
                Cabang · Semarang
              </h3>
              <div className="space-y-4 text-sm leading-6 text-slate-400">
                <p className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-amber-300/80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    Jl. Pleburan VI No.18A,
                    <br />
                    Kota Semarang 50241
                  </span>
                </p>
                <a
                  href="tel:+6281229894433"
                  className="group inline-flex items-center gap-3 font-medium text-slate-300 transition-colors duration-200 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-amber-300/80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  0812-2989-4433
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:mt-16 md:flex-row md:items-center md:justify-between">
            <p className="leading-6">
              © {new Date().getFullYear()} MNCo Group. Hak Cipta Dilindungi
              Undang-Undang.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="#"
                className="transition-colors duration-200 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="#"
                className="transition-colors duration-200 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
