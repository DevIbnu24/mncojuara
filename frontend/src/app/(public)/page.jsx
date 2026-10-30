import { PrismaClient } from "@prisma/client";
import Link from "next/link";

// Reuse the client when Next.js reloads server modules during development.
const prisma = globalThis.mncoHomePrisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.mncoHomePrisma = prisma;
export const dynamic = "force-dynamic";

function Arrow({ diagonal = false, className = "" }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

const priorities = [
  {
    title: "Konsultasi & kepatuhan",
    description: "Pelaporan dan kewajiban pajak pribadi maupun badan usaha.",
    topic: "konsultasi dan kepatuhan pajak",
  },
  {
    title: "Perencanaan pajak",
    description: "Tinjau pilihan, kewajiban, dan risiko perpajakan bisnis.",
    topic: "perencanaan pajak",
  },
  {
    title: "Sengketa & kuasa hukum",
    description: "Pendampingan pemeriksaan dan penyelesaian sengketa pajak.",
    topic: "pendampingan sengketa pajak",
  },
];
const principles = [
  [
    "Integritas & kerahasiaan",
    "Data finansial Anda ditangani dengan mengutamakan kerahasiaan dan kode etik profesional.",
  ],
  [
    "Ketelitian dalam regulasi",
    "Kami meninjau kewajiban perpajakan sesuai ketentuan yang berlaku untuk membantu Anda memahami dan mengelola risiko.",
  ],
  [
    "Pendampingan hukum",
    "Diskusikan kebutuhan perwakilan dan perlindungan hak Anda dalam proses perpajakan bersama tim kuasa hukum.",
  ],
];
const questions = [
  [
    "Apakah melayani pajak pribadi dan perusahaan?",
    "Ya. Anda dapat mendiskusikan kebutuhan Wajib Pajak Pribadi maupun Badan Usaha, mulai dari kepatuhan hingga perencanaan pajak.",
  ],
  [
    "Apa yang perlu disiapkan sebelum konsultasi?",
    "Mulai dengan ringkasan kebutuhan dan pertanyaan Anda. Tim kami akan menginformasikan dokumen yang relevan sesuai topik konsultasi; hindari mengirim dokumen sensitif sebelum mendapat arahan.",
  ],
  [
    "Bagaimana cara menjadwalkan pertemuan?",
    "Hubungi tim melalui tombol konsultasi, sampaikan topik yang ingin dibahas, lalu sepakati jadwal dan lokasi pertemuan bersama konsultan.",
  ],
];

export default async function HomePage() {
  const setting = await prisma.webSetting.findFirst();
  const heroTitle =
    setting?.heroTitle?.trim() || "Amankan bisnis Anda bersama ahlinya.";
  const heroSubtitle =
    setting?.heroSubtitle?.trim() ||
    "Pendampingan pajak dan hukum yang jelas untuk pribadi dan badan usaha. Dari kewajiban sehari-hari hingga keputusan penting bisnis Anda.";
  const rawNumber = String(
    setting?.waConsultant || setting?.waNumber || "6281229894433",
  );
  const waNumber =
    rawNumber.replace(/\D/g, "").replace(/^0/, "62") || "6281229894433";
  const consultation = (topic = "kebutuhan pajak dan hukum bisnis saya") =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo Tim MNCo Juara, saya ingin menjadwalkan konsultasi mengenai ${topic}.`)}`;

  return (
    <div className="mnco-home">
      <style>{styles}</style>
      <section className="mh-hero mh-container" aria-labelledby="mh-title">
        <div className="mh-hero-copy">
          <p className="mh-kicker">
            MNCo Juara · Konsultan pajak & kuasa hukum
          </p>
          <h1 id="mh-title">{heroTitle}</h1>
          <p className="mh-lead">{heroSubtitle}</p>
          <div className="mh-actions">
            <a
              href={consultation()}
              className="mh-button mh-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jadwalkan konsultasi <Arrow diagonal />
            </a>
            <Link href="/layanan" className="mh-button mh-secondary">
              Lihat layanan <Arrow />
            </Link>
          </div>
          <p className="mh-hero-caption">
            Melayani Sukoharjo, Semarang, dan sekitarnya.
          </p>
        </div>
        <aside
          className="mh-consultation"
          aria-labelledby="mh-consultation-title"
        >
          <div className="mh-consultation-header">
            <span className="mh-kicker">Mulai dari kebutuhan Anda</span>
            <span className="mh-mark" aria-hidden="true">
              MNCo.
            </span>
          </div>
          <h2 id="mh-consultation-title">
            Apa yang ingin
            <br />
            Anda diskusikan?
          </h2>
          <p className="mh-panel-intro">
            Pilih topik untuk memulai percakapan dengan tim kami.
          </p>
          <div className="mh-topics">
            {priorities.map((p) => (
              <a
                key={p.title}
                href={consultation(p.topic)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <strong>{p.title}</strong>
                  <span>{p.description}</span>
                </span>
                <Arrow diagonal />
              </a>
            ))}
          </div>
          <p className="mh-panel-note">
            Percakapan dilanjutkan melalui WhatsApp.
          </p>
        </aside>
      </section>

      <div className="mh-credentials">
        <div className="mh-container mh-credential-grid">
          <p>
            <span>Keahlian</span>
            <strong>Konsultan Pajak Brevet C</strong>
          </p>
          <p>
            <span>Pendampingan</span>
            <strong>Kuasa Hukum Pajak</strong>
          </p>
          <p>
            <span>Fokus layanan</span>
            <strong>Pribadi & badan usaha</strong>
          </p>
        </div>
      </div>

      <section
        className="mh-container mh-about mh-section"
        aria-labelledby="mh-about-title"
      >
        <div className="mh-about-copy">
          <p className="mh-kicker">Mengenal MNCo Group</p>
          <h2 id="mh-about-title">
            Kejelasan untuk setiap
            <br className="mh-desktop-break" /> keputusan penting.
          </h2>
          <p>
            MNCo Group adalah firma profesional dengan keahlian Konsultan Pajak
            Brevet C dan Kuasa Hukum Pajak yang terdaftar di Pengadilan Pajak.
          </p>
          <p>
            Kami membantu Anda memahami kewajiban, meninjau risiko, dan menyusun
            langkah perpajakan yang sesuai dengan kebutuhan bisnis. Anda tahu
            apa yang sedang dikerjakan dan apa langkah berikutnya.
          </p>
          <Link href="/tentang" className="mh-text-link">
            Kenali tim dan pendekatan kami <Arrow />
          </Link>
        </div>
        <div className="mh-principles">
          {principles.map(([title, description], i) => (
            <article key={title}>
              <span className="mh-principle-number" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mh-process-band" aria-labelledby="mh-process-title">
        <div className="mh-container mh-section">
          <div className="mh-section-heading">
            <div>
              <p className="mh-kicker">Proses konsultasi</p>
              <h2 id="mh-process-title">
                Langkah yang jelas,
                <br />
                sejak percakapan pertama.
              </h2>
            </div>
            <p>
              Tidak perlu mengetahui semua jawabannya sebelum menghubungi kami.
              Mulai dari situasi yang sedang Anda hadapi.
            </p>
          </div>
          <ol className="mh-process">
            <li>
              <span>01</span>
              <h3>Ceritakan kebutuhan</h3>
              <p>Sampaikan konteks bisnis dan topik yang ingin Anda bahas.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Petakan pilihan</h3>
              <p>
                Bersama konsultan, pahami dokumen, kewajiban, dan langkah yang
                relevan.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Sepakati langkah</h3>
              <p>
                Tentukan ruang lingkup pendampingan dan tindak lanjut yang
                sesuai.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section
        className="mh-container mh-section mh-offices"
        aria-labelledby="mh-offices-title"
      >
        <div className="mh-section-heading">
          <div>
            <p className="mh-kicker">Kunjungi kantor kami</p>
            <h2 id="mh-offices-title">
              Dekat untuk berdiskusi.
              <br />
              Siap untuk mendampingi.
            </h2>
          </div>
          <Link href="/kontak" className="mh-text-link">
            Informasi kontak & lokasi <Arrow diagonal />
          </Link>
        </div>
        <div className="mh-office-grid">
          <article>
            <span className="mh-office-type">Kantor pusat</span>
            <h3>Sukoharjo</h3>
            <p>
              {setting?.addressPusat || "Gawanan, Sukoharjo, Jawa Tengah 57512"}
            </p>
            <Link href="/kontak" className="mh-text-link">
              Lihat lokasi <Arrow diagonal />
            </Link>
          </article>
          <article>
            <span className="mh-office-type">Kantor cabang</span>
            <h3>Semarang</h3>
            <p>
              {setting?.addressCabang ||
                "Jl. Pleburan VI No.18A, Kota Semarang 50241"}
            </p>
            <Link href="/kontak" className="mh-text-link">
              Lihat lokasi <Arrow diagonal />
            </Link>
          </article>
        </div>
        <p className="mh-office-note">
          Hubungi tim terlebih dahulu untuk menyepakati jadwal kunjungan.
        </p>
      </section>

      <section className="mh-faq-band" aria-labelledby="mh-faq-title">
        <div className="mh-container mh-faq mh-section">
          <div>
            <p className="mh-kicker">Sebelum berkonsultasi</p>
            <h2 id="mh-faq-title">
              Ada yang ingin
              <br />
              Anda ketahui?
            </h2>
            <p>
              Untuk pertanyaan yang lebih spesifik, diskusikan langsung dengan
              tim kami.
            </p>
            <a
              className="mh-text-link"
              href={consultation()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tanyakan kepada konsultan <Arrow diagonal />
            </a>
          </div>
          <div className="mh-questions">
            {questions.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span className="mh-expand" aria-hidden="true" />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Scoped styles keep this page independent of the public layout and admin UI.
const styles = `
.mnco-home{--mh-ink:#203334;--mh-muted:#596765;--mh-line:#d8dfda;--mh-paper:#faf9f5;--mh-accent:#8a4d2d;background:var(--mh-paper);color:var(--mh-ink);font-family:"Segoe UI",Arial,sans-serif;font-size:16px;line-height:1.7;overflow-wrap:break-word}
.mnco-home *{box-sizing:border-box}
.mnco-home .mh-container{width:100%;max-width:1248px;margin-inline:auto;padding-inline:48px}
.mnco-home.mnco-home h1,.mnco-home.mnco-home h2,.mnco-home.mnco-home h3{font-family:"Segoe UI",Arial,sans-serif;color:var(--mh-ink);margin:0;text-wrap:balance;font-weight:600}
.mnco-home.mnco-home h1{font-size:clamp(36px,4.2vw,58px);line-height:1.12;letter-spacing:-.045em;white-space:pre-wrap}
.mnco-home.mnco-home h2{font-size:clamp(28px,3vw,38px);line-height:1.2;letter-spacing:-.035em}
.mnco-home.mnco-home h3{font-size:19px;line-height:1.4;letter-spacing:-.02em}
.mnco-home p{margin:0}
.mnco-home a{color:inherit;text-decoration:none;touch-action:manipulation}
.mnco-home a:focus-visible,.mnco-home summary:focus-visible{outline:2px solid var(--mh-accent);outline-offset:5px;border-radius:3px}
.mnco-home svg{flex-shrink:0}
.mnco-home .mh-kicker{font-size:12px;font-weight:600;letter-spacing:.04em;line-height:1.6;color:var(--mh-accent)}
.mnco-home .mh-hero{display:grid;grid-template-columns:1.16fr 1fr;gap:72px;align-items:center;padding-block:68px 72px}
.mnco-home .mh-hero-copy>.mh-kicker{margin-bottom:23px}
.mnco-home .mh-lead{font-size:17px;line-height:1.8;color:var(--mh-muted);margin-top:25px;max-width:520px;white-space:pre-wrap}
.mnco-home .mh-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}
.mnco-home .mh-button{display:inline-flex;justify-content:center;align-items:center;gap:17px;min-height:50px;padding:12px 18px;border-radius:5px;border:1px solid transparent;font-size:14px;line-height:1.5;font-weight:600;transition:background .2s,border-color .2s}
.mnco-home .mh-primary{background:var(--mh-ink);color:white}
.mnco-home .mh-primary:hover{background:#365252}
.mnco-home .mh-secondary{border-color:#b8c4bd}
.mnco-home .mh-secondary:hover{background:#ecefe9;border-color:#84958c}
.mnco-home .mh-hero-caption{margin-top:24px;font-size:13px;color:var(--mh-muted)}
.mnco-home .mh-consultation{border:1px solid #d2dcd2;background:#edf1e9;padding:29px 28px 22px;border-radius:7px}
.mnco-home .mh-consultation-header{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:27px}
.mnco-home .mh-consultation-header .mh-kicker{color:#536951;font-size:12px}
.mnco-home .mh-mark{font-weight:650;font-size:21px;letter-spacing:-1px;color:#566c5b}
.mnco-home.mnco-home .mh-consultation h2{font-size:31px;letter-spacing:-1px;line-height:1.22}
.mnco-home .mh-panel-intro{color:var(--mh-muted);font-size:14px;line-height:1.75;margin:14px 0 23px;max-width:330px}
.mnco-home .mh-topics{border-top:1px solid #c7d2c5}
.mnco-home .mh-topics>a{display:flex;gap:18px;align-items:center;justify-content:space-between;padding:17px 0;border-bottom:1px solid #c7d2c5;transition:color .2s}
.mnco-home .mh-topics strong{font-size:16px;font-weight:600;display:block;line-height:1.5}
.mnco-home .mh-topics a>span>span{display:block;font-size:13px;line-height:1.65;color:var(--mh-muted);margin-top:5px;max-width:300px}
.mnco-home .mh-topics svg{transition:transform .2s}
.mnco-home .mh-topics a:hover{color:var(--mh-accent)}
.mnco-home .mh-topics a:hover svg{transform:translate(2px,-2px)}
.mnco-home .mh-panel-note{font-size:12px;color:var(--mh-muted);margin-top:17px}
.mnco-home .mh-credentials{border-block:1px solid var(--mh-line);background:#f4f4ee}
.mnco-home .mh-credential-grid{display:grid;grid-template-columns:repeat(3,1fr);padding-block:22px;gap:28px}
.mnco-home .mh-credential-grid p+p{padding-left:30px;border-left:1px solid #d2d9d1}
.mnco-home .mh-credential-grid span{display:block;font-size:12px;color:var(--mh-muted);margin-bottom:3px}
.mnco-home .mh-credential-grid strong{font-size:15px;font-weight:600;line-height:1.6;display:block}
.mnco-home .mh-section{padding-block:76px}
.mnco-home .mh-about{display:grid;grid-template-columns:1fr 1fr;gap:85px}
.mnco-home .mh-about-copy h2{margin:18px 0 23px}
.mnco-home .mh-about-copy>p:not(.mh-kicker){font-size:16px;line-height:1.85;color:var(--mh-muted);margin-bottom:15px;max-width:540px}
.mnco-home .mh-text-link{display:inline-flex;align-items:center;gap:16px;min-height:44px;font-size:14px;font-weight:600;line-height:1.5;border-bottom:1px solid #9cae9f;padding-block:8px;transition:color .2s,border-color .2s}
.mnco-home .mh-text-link:hover{color:var(--mh-accent);border-color:var(--mh-accent)}
.mnco-home .mh-about-copy>.mh-text-link{margin-top:11px}
.mnco-home .mh-principles{padding-top:7px}
.mnco-home .mh-principles article{display:flex;gap:22px;border-top:1px solid var(--mh-line);padding:24px 0}
.mnco-home .mh-principles article:last-child{border-bottom:1px solid var(--mh-line)}
.mnco-home .mh-principle-number{font-size:12px;color:#748278;line-height:2.2;font-variant-numeric:tabular-nums}
.mnco-home .mh-principles p{font-size:15px;line-height:1.8;color:var(--mh-muted);margin-top:9px}
.mnco-home .mh-process-band{background:#203334;color:#eaf0e8}
.mnco-home .mh-process-band h2,.mnco-home .mh-process-band h3{color:#faf9f5}
.mnco-home .mh-process-band .mh-kicker{color:#d5b491}
.mnco-home .mh-section-heading{display:flex;align-items:end;justify-content:space-between;gap:48px;margin-bottom:36px}
.mnco-home .mh-section-heading h2{margin-top:16px}
.mnco-home .mh-section-heading>p{max-width:360px;font-size:15px;line-height:1.85;color:#bbcbc4}
.mnco-home .mh-process{display:grid;grid-template-columns:repeat(3,1fr);gap:36px;list-style:none;padding:0;margin:0}
.mnco-home .mh-process li{border-top:1px solid #ffffff35;padding-top:23px}
.mnco-home .mh-process li>span{color:#c7aa87;font-size:13px;font-variant-numeric:tabular-nums}
.mnco-home .mh-process h3{font-size:19px;margin-top:22px}
.mnco-home .mh-process p{font-size:15px;line-height:1.8;color:#bbcbc4;margin-top:12px}
.mnco-home .mh-office-grid{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--mh-line);border-radius:6px;overflow:hidden}
.mnco-home .mh-office-grid article{padding:30px 34px}
.mnco-home .mh-office-grid article+article{border-left:1px solid var(--mh-line)}
.mnco-home .mh-office-type{font-size:12px;color:var(--mh-muted)}
.mnco-home .mh-office-grid h3{font-size:27px;margin-top:12px}
.mnco-home .mh-office-grid p{font-size:15px;line-height:1.8;color:var(--mh-muted);margin:12px 0 20px;max-width:420px;white-space:pre-wrap}
.mnco-home .mh-office-note{margin-top:17px;font-size:13px;color:var(--mh-muted)}
.mnco-home .mh-faq-band{background:#f0f1eb;border-top:1px solid var(--mh-line)}
.mnco-home .mh-faq{display:grid;grid-template-columns:1fr 1.35fr;gap:85px}
.mnco-home .mh-faq h2{margin:16px 0 20px}
.mnco-home .mh-faq>div>p:not(.mh-kicker){font-size:15px;line-height:1.85;color:var(--mh-muted);max-width:350px;margin-bottom:17px}
.mnco-home .mh-questions details{border-top:1px solid #c9d2c8}
.mnco-home .mh-questions details:last-child{border-bottom:1px solid #c9d2c8}
.mnco-home .mh-questions summary{list-style:none;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:21px 0;cursor:pointer;font-size:16px;font-weight:600;line-height:1.6;transition:color .2s}
.mnco-home .mh-questions summary::-webkit-details-marker{display:none}
.mnco-home .mh-questions summary:hover{color:var(--mh-accent)}
.mnco-home .mh-expand{position:relative;flex:0 0 18px;width:18px;height:18px;color:var(--mh-accent)}
.mnco-home .mh-expand:before,.mnco-home .mh-expand:after{content:"";position:absolute;background:currentColor;top:8px;left:3px;width:12px;height:1.5px}
.mnco-home .mh-expand:after{transform:rotate(90deg);transition:transform .2s}
.mnco-home details[open] .mh-expand:after{transform:rotate(0)}
.mnco-home details[open] summary{color:var(--mh-accent)}
.mnco-home .mh-questions details>p{font-size:15px;line-height:1.85;color:var(--mh-muted);padding:0 34px 23px 0;max-width:600px}
@media(min-width:1440px){.mnco-home .mh-hero{gap:88px}}
@media(max-width:1050px){.mnco-home .mh-container{padding-inline:32px}.mnco-home .mh-hero{gap:36px;padding-block:48px}.mnco-home .mh-consultation{padding:25px 23px 21px}.mnco-home .mh-about,.mnco-home .mh-faq{gap:45px}.mnco-home .mh-section{padding-block:60px}.mnco-home .mh-button{padding-inline:15px;gap:13px}}
@media(max-width:760px){.mnco-home .mh-hero{grid-template-columns:1fr;gap:35px}.mnco-home.mnco-home h1{font-size:44px;max-width:630px}.mnco-home .mh-lead{max-width:590px;font-size:16px}.mnco-home .mh-consultation{padding:27px}.mnco-home .mh-consultation-header{margin-bottom:20px}.mnco-home .mh-consultation h2 br{display:none}.mnco-home .mh-topics a>span>span{max-width:unset}.mnco-home .mh-panel-intro{max-width:unset}.mnco-home .mh-about,.mnco-home .mh-faq{grid-template-columns:1fr;gap:32px}.mnco-home .mh-section-heading{flex-direction:column;align-items:start;gap:22px}.mnco-home .mh-section-heading>p{max-width:580px}.mnco-home .mh-process{gap:24px}.mnco-home .mh-process h3{font-size:18px}.mnco-home .mh-process p{font-size:14px}.mnco-home .mh-credential-grid{gap:20px}.mnco-home .mh-credential-grid p+p{padding-left:20px}.mnco-home .mh-credential-grid strong{font-size:14px}.mnco-home .mh-office-grid article{padding:25px}.mnco-home .mh-offices .mh-section-heading{gap:16px}}
@media(max-width:480px){.mnco-home .mh-container{padding-inline:22px}.mnco-home .mh-hero{padding-block:36px 40px;gap:30px}.mnco-home .mh-hero-copy>.mh-kicker{font-size:12px;max-width:260px;margin-bottom:19px}.mnco-home.mnco-home h1{font-size:38px;letter-spacing:-1.5px;line-height:1.14}.mnco-home .mh-lead{margin-top:21px;line-height:1.8}.mnco-home .mh-actions{flex-direction:column;gap:11px;margin-top:25px}.mnco-home .mh-button{width:100%;justify-content:space-between;min-height:50px;padding-inline:17px}.mnco-home .mh-hero-caption{font-size:13px;margin-top:20px}.mnco-home .mh-consultation{padding:23px 20px 21px}.mnco-home .mh-consultation-header{gap:12px}.mnco-home .mh-consultation-header .mh-kicker{font-size:12px;max-width:180px}.mnco-home .mh-mark{font-size:19px}.mnco-home.mnco-home .mh-consultation h2{font-size:28px}.mnco-home .mh-topics strong{font-size:16px}.mnco-home .mh-topics a>span>span{font-size:14px}.mnco-home .mh-panel-intro{font-size:15px}.mnco-home .mh-credential-grid{grid-template-columns:1fr;gap:0;padding-block:7px}.mnco-home .mh-credential-grid p{display:flex;align-items:baseline;justify-content:space-between;gap:20px;padding-block:14px}.mnco-home .mh-credential-grid p+p{padding-left:0;border-left:0;border-top:1px solid #d2d9d1}.mnco-home .mh-credential-grid span{font-size:12px;margin:0}.mnco-home .mh-credential-grid strong{font-size:13px;text-align:right}.mnco-home .mh-section{padding-block:46px}.mnco-home.mnco-home h2{font-size:29px;letter-spacing:-.8px}.mnco-home .mh-desktop-break{display:none}.mnco-home .mh-about-copy>p:not(.mh-kicker){font-size:16px}.mnco-home .mh-principles article{gap:17px;padding-block:22px}.mnco-home .mh-principles p{font-size:15px}.mnco-home .mh-process{grid-template-columns:1fr;gap:27px}.mnco-home .mh-process li{padding-top:18px}.mnco-home .mh-process h3{margin-top:10px;font-size:19px}.mnco-home .mh-process p{font-size:15px;margin-top:8px}.mnco-home .mh-office-grid{grid-template-columns:1fr}.mnco-home .mh-office-grid article{padding:25px 23px}.mnco-home .mh-office-grid article+article{border-left:0;border-top:1px solid var(--mh-line)}.mnco-home .mh-office-grid p{margin-bottom:14px}.mnco-home .mh-office-grid h3{font-size:25px}.mnco-home .mh-faq{gap:27px}.mnco-home .mh-questions summary{font-size:16px;gap:17px}.mnco-home .mh-questions details>p{padding-right:10px;font-size:15px}}
@media(prefers-reduced-motion:reduce){.mnco-home *,.mnco-home *:before,.mnco-home *:after{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
`;
