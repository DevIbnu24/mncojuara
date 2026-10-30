import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // 1. Tarik Data Beranda dari Database Admin
  const setting = await prisma.webSetting.findFirst();

  const heroTitle =
    setting?.heroTitle || "Amankan Bisnis Anda Bersama Ahlinya.";
  const heroSubtitle =
    setting?.heroSubtitle ||
    "Solusi perpajakan terintegrasi, akurat, dan rahasia untuk Wajib Pajak Pribadi dan Badan Usaha di Sukoharjo, Semarang, & Sekitarnya.";
  const waConsultant =
    setting?.waConsultant || setting?.waNumber || "6281229894433";

  // Data Statis Fitur dengan Icon SVG Garis Tegas
  const features = [
    {
      id: "01",
      title: "Integritas & Kerahasiaan",
      desc: "Menjamin kerahasiaan seluruh data finansial Anda dengan kode etik profesional yang ketat dan tersertifikasi.",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
      id: "02",
      title: "Akurasi Regulasi",
      desc: "Selalu up-to-date dengan pembaruan peraturan perpajakan di Indonesia untuk menghindari sanksi administratif dan denda material.",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    },
    {
      id: "03",
      title: "Perlindungan Hukum",
      desc: "Otoritas penuh untuk bertindak secara sah mewakili dan membela hak Anda di hadapan Direktorat Jenderal Pajak RI.",
      icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
    },
  ];

  const gallery = [
    {
      id: 0,
      src: "/foto-depan.jpg",
      title: "MNCo Juara Sukoharjo",
      label: "Kantor Pusat",
    },
    {
      id: 1,
      src: "/foto-meeting.jpg",
      title: "Private Meeting Room",
      label: "Fasilitas Eksekutif",
    },
    {
      id: 2,
      src: "/foto-kerja.jpg",
      title: "Ruang Operasional Tim",
      label: "Area Profesional",
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-[#f7f6f2] font-sans text-slate-800 selection:bg-amber-200 selection:text-slate-900">
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section className="relative isolate overflow-hidden px-5 pb-16 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
        <div className="absolute -right-28 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-200/40 blur-3xl sm:-right-16" />
        <div className="absolute -bottom-48 left-0 -z-10 h-96 w-96 rounded-full bg-orange-100/70 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-amber-200/80 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-800 shadow-[0_8px_30px_rgba(120,83,30,0.06)] sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-amber-500 ring-4 ring-amber-100" />
              Konsultan & Kuasa Hukum Pajak Brevet C
            </div>

            <h1 className="mb-6 max-w-3xl whitespace-pre-wrap text-[clamp(2.8rem,7vw,5.6rem)] font-semibold leading-[0.99] tracking-[-0.055em] text-slate-950 [text-wrap:balance]">
              {heroTitle}
            </h1>

            <p className="mb-9 max-w-xl whitespace-pre-wrap text-base leading-8 text-slate-600 sm:text-lg">
              {heroSubtitle}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`https://wa.me/${waConsultant}?text=${encodeURIComponent("Halo Tim MNCo Juara, saya mengunjungi website Anda dan ingin berkonsultasi mengenai bisnis saya.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-slate-950 px-7 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-[0_18px_40px_rgba(180,83,9,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 sm:px-8"
              >
                Konsultasi Sekarang
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <Link
                href="/layanan"
                className="group inline-flex min-h-14 items-center justify-center rounded-full border border-slate-300/80 bg-white/60 px-7 text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 sm:px-8"
              >
                Eksplorasi Layanan
              </Link>
            </div>

            <div className="mt-9 flex items-center gap-3 text-sm text-slate-500">
              <div className="flex -space-x-2">
                <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#f7f6f2] bg-amber-100 text-[10px] font-bold text-amber-800">C</span>
                <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#f7f6f2] bg-slate-200 text-[10px] font-bold text-slate-700">JP</span>
                <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#f7f6f2] bg-orange-200 text-[10px] font-bold text-orange-800">MN</span>
              </div>
              <span>Didampingi tenaga profesional berlisensi</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-amber-200/60 via-white/20 to-orange-100/70 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-slate-900 via-slate-900 to-[#202b3a] p-6 text-white shadow-[0_32px_90px_rgba(35,44,55,0.2)] sm:p-9">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />
              <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium tracking-wide text-slate-400">MNCo Group</p>
                  <p className="mt-1 text-sm font-semibold text-white">Strategi pajak, lebih terarah</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-amber-300">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 3l8 4v5c0 4.4-3.1 7.8-8 9-4.9-1.2-8-4.6-8-9V7l8-4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 12l2 2 4-4" />
                  </svg>
                </span>
              </div>

              <div className="relative my-10 flex h-48 items-end justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 pb-5 pt-8 sm:h-56 sm:px-7">
                <div className="absolute left-5 right-5 top-8 space-y-8 sm:left-7 sm:right-7">
                  <span className="block border-t border-dashed border-white/10" />
                  <span className="block border-t border-dashed border-white/10" />
                  <span className="block border-t border-dashed border-white/10" />
                </div>
                {[32, 48, 40, 64, 54, 76, 68, 92].map((height, index) => (
                  <div key={index} className="relative z-10 flex h-full flex-1 items-end">
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 hover:brightness-125 ${index === 7 ? "bg-amber-400" : "bg-gradient-to-t from-amber-600/40 to-amber-300/80"}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
                <div className="absolute right-5 top-4 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-200 sm:right-7">
                  TERENCANA
                </div>
              </div>

              <div className="relative grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Konsultasi</p>
                  <p className="mt-2 text-sm font-semibold text-white sm:text-base">Personal & Korporat</p>
                </div>
                <div className="rounded-2xl border border-amber-200/20 bg-amber-300/[0.08] p-4 sm:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-200/70">Pendampingan</p>
                  <p className="mt-2 text-sm font-semibold text-amber-50 sm:text-base">Sampai tuntas</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-3 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-[0_18px_50px_rgba(31,41,55,0.12)] sm:-left-8 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Keahlian</p>
              <p className="mt-1 text-sm font-bold text-slate-900 sm:text-base">Brevet C & Kuasa Hukum</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-200/80 overflow-hidden rounded-3xl border border-white bg-white/90 px-6 shadow-[0_24px_70px_rgba(31,41,55,0.07)] sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-4 lg:px-8">
          <div className="flex gap-4 py-5 sm:px-5 sm:py-7 lg:px-7">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M9 12l2 2 4-4m5.6-4A12 12 0 0112 3a12 12 0 01-8.6 3A12 12 0 003 9c0 5.6 3.8 10.3 9 11.6 5.2-1.3 9-6 9-11.6 0-1-.1-2-.4-3z" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-amber-700">Lisensi Resmi</p>
              <p className="mt-1 text-sm font-medium leading-6 text-slate-700">Terdaftar di Pengadilan Pajak RI</p>
            </div>
          </div>
          <div className="flex gap-4 py-5 sm:px-5 sm:py-7 lg:px-7">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.2l5-.7L12 3z" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-amber-700">Sertifikasi Tertinggi</p>
              <p className="mt-1 text-sm font-medium leading-6 text-slate-700">Konsultan Pajak Brevet C</p>
            </div>
          </div>
          <div className="flex gap-4 py-5 sm:px-5 sm:py-7 lg:px-7">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M12 3l8 4v5c0 4.4-3.1 7.8-8 9-4.9-1.2-8-4.6-8-9V7l8-4z" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-amber-700">Kerahasiaan Klien</p>
              <p className="mt-1 text-sm font-medium leading-6 text-slate-700">100% Data Finansial Terlindungi</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div className="lg:sticky lg:top-32">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
              <span className="h-px w-8 bg-amber-500" />
              Mengenal MNCo Group
            </p>
            <h2 className="mb-6 max-w-xl text-3xl font-semibold leading-[1.12] tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[3.25rem]">
              Jaringan profesional pajak berlisensi resmi.
            </h2>
            <div className="max-w-xl space-y-4 text-[15px] leading-7 text-slate-600">
              <p>
                <strong className="font-semibold text-slate-900">MNCo Group</strong> bukanlah sekadar biro administrasi
                biasa. Kami adalah firma profesional yang memegang lisensi
                resmi sebagai{" "}
                <strong className="font-semibold text-slate-900">Konsultan Pajak Bersertifikat Brevet C</strong> dan{" "}
                <strong className="font-semibold text-slate-900">Kuasa Hukum Pajak</strong> yang terdaftar sah di
                Pengadilan Pajak.
              </p>
              <p>
                Kami memastikan setiap langkah bisnis Anda tetap berada di
                jalur hukum yang tepat, meminimalisir risiko sanksi, dan
                mengoptimalkan perencanaan pajak perusahaan Anda untuk jangka
                panjang.
              </p>
            </div>
            <Link
              href="/tentang"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
            >
              Kenali tim kami
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {features.map((feature, index) => (
              <article
                key={feature.id}
                className={`group rounded-[1.75rem] border border-slate-200/70 bg-white p-6 shadow-[0_12px_40px_rgba(31,41,55,0.045)] transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_24px_55px_rgba(31,41,55,0.09)] sm:p-8 ${index === 2 ? "sm:col-span-2 sm:flex sm:items-start sm:gap-7" : ""}`}
              >
                <div className="mb-6 grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-700 transition duration-300 group-hover:bg-slate-950 group-hover:text-amber-300 sm:h-14 sm:w-14">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d={feature.icon}></path>
                  </svg>
                </div>
                <div>
                  <span className="mb-2 block text-[10px] font-bold tracking-[0.16em] text-amber-700/70">{feature.id} / VALUE</span>
                  <h3 className="mb-3 text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-600">{feature.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
                <span className="h-px w-8 bg-amber-400" />
                Fasilitas Kami
              </p>
              <h2 className="text-3xl font-semibold leading-[1.12] tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.25rem]">
                Ruang konsultasi privat & profesional.
              </h2>
            </div>
            <Link
              href="/kontak"
              className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition duration-300 hover:border-amber-300/50 hover:bg-white/5 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400 group"
            >
              Lihat Peta Lokasi
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="hide-scroll -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:-mx-8 sm:gap-5 sm:px-8 lg:-mx-12 lg:px-12">
            {gallery.map((img) => (
              <article
                key={img.id}
                className="group relative h-[340px] w-[86%] shrink-0 snap-start overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-800 shadow-[0_24px_60px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-1 sm:h-[420px] sm:w-[65%] lg:h-[470px] lg:w-auto lg:flex-1"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px w-6 bg-amber-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-amber-300 sm:text-xs">
                      {img.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {img.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
