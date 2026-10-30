import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

const locationIcon = (
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
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const phoneIcon = (
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
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const clockIcon = (
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
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default async function KontakPage() {
  const setting = await prisma.webSetting.findFirst();

  const addressPusat =
    setting?.addressPusat || "Gawanan, Sukoharjo, Jawa Tengah";
  const addressCabang =
    setting?.addressCabang || "Jl. Pleburan VI, Kota Semarang, Jawa Tengah";
  const rawWa = setting?.waNumber || "6281229894433";
  const displayWa = rawWa.startsWith("62")
    ? "0" + rawWa.slice(2).replace(/(\d{3,4})(\d{4})(\d+)/, "$1-$2-$3")
    : rawWa;

  const offices = [
    {
      id: "sukoharjo",
      type: "Kantor Pusat",
      name: "MNCo Juara Sukoharjo",
      description:
        "Pusat layanan konsultasi pajak korporat, sengketa pajak, dan pendampingan hukum wilayah Soloraya.",
      address: addressPusat,
      mapUrl:
        "https://maps.google.com/maps?q=MNCo%20Juara,%20Gawanan,%20Sukoharjo,%20Kabupaten%20Sukoharjo,%20Jawa%20Tengah%2057512&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
    {
      id: "semarang",
      type: "Kantor Cabang",
      name: "MNCo Semarang",
      description:
        "Melayani kebutuhan perpajakan, pelaporan SPT, dan audit perusahaan strategis di wilayah Kota Semarang.",
      address: addressCabang,
      mapUrl:
        "https://maps.google.com/maps?q=Jl.%20Pleburan%20VI%20No.18A,%20Pleburan,%20Kec.%20Semarang%20Sel.,%20Kota%20Semarang,%20Jawa%20Tengah%2050241&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f6f2] font-sans text-slate-800 selection:bg-amber-200 selection:text-slate-900">
      <section className="relative isolate overflow-hidden px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
        <div className="pointer-events-none absolute -right-36 -top-36 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-200/45 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-[-9rem] -z-10 h-[24rem] w-[24rem] rounded-full bg-orange-100/80 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[1fr_0.65fr] lg:gap-16">
          <div>
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-amber-200/80 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-800 shadow-[0_8px_28px_rgba(120,83,30,0.06)] sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-amber-500 ring-4 ring-amber-100" />
              Hubungi MNCo Juara
            </p>
            <h1 className="max-w-4xl text-[clamp(2.7rem,7vw,5.7rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950 [text-wrap:balance]">
              Mari bertemu.
              <br className="hidden sm:block" /> Kami siap mendengar.
            </h1>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Pilih kantor yang paling dekat dengan Anda untuk berdiskusi
              langsung dengan tim profesional kami.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Senin–Jumat
              </span>
              <span>08:00–17:00 WIB</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12 lg:pb-32">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2 lg:gap-7">
          {offices.map((office, index) => (
            <article
              key={office.id}
              className="group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_16px_50px_rgba(31,41,55,0.06)] transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_28px_70px_rgba(31,41,55,0.11)] lg:rounded-[2rem]"
            >
              <div className="relative p-6 sm:p-8 lg:p-9">
                <div className="absolute right-0 top-0 h-44 w-44 translate-x-1/3 -translate-y-1/3 rounded-full border border-amber-100/80 transition-transform duration-700 group-hover:scale-125" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-amber-800 sm:text-[10px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      {office.type}
                    </span>
                    <h2 className="mt-4 text-xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-2xl">
                      {office.name}
                    </h2>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                      {office.description}
                    </p>
                  </div>
                  <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-[#f7f6f2] text-amber-800 transition duration-300 group-hover:rotate-[-5deg] group-hover:border-amber-200 group-hover:bg-amber-50 sm:grid">
                    {locationIcon}
                  </span>
                </div>

                <div className="relative mt-7 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-2xl bg-[#f8f7f4] p-3.5">
                    <span className="mt-0.5 shrink-0 text-amber-700">
                      {locationIcon}
                    </span>
                    <p className="whitespace-pre-wrap text-xs leading-5 text-slate-600 sm:text-[13px]">
                      {office.address}
                    </p>
                  </div>
                  <a
                    href={`tel:+${rawWa}`}
                    className="flex items-center gap-3 rounded-2xl bg-[#f8f7f4] p-3.5 text-slate-700 transition-colors duration-200 hover:bg-amber-50 hover:text-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-amber-700 shadow-[0_4px_14px_rgba(31,41,55,0.06)]">
                      {phoneIcon}
                    </span>
                    <span className="text-xs font-semibold sm:text-[13px]">
                      {displayWa}
                    </span>
                  </a>
                </div>

                <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700">
                    {clockIcon}
                  </span>
                  Senin - Jumat | 08:00 - 17:00 WIB
                </div>
              </div>

              <div className="relative h-64 overflow-hidden border-t border-slate-200/80 bg-slate-100 sm:h-72 lg:h-80">
                <iframe
                  title={`Peta lokasi ${office.name}`}
                  src={office.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[0.25] transition duration-700 group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/20 to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600 shadow-[0_8px_24px_rgba(31,41,55,0.08)] backdrop-blur-sm">
                  Lokasi 0{index + 1}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
