"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/layanan", label: "Layanan" },
  { href: "/insight", label: "Insight" },
];

function isActiveRoute(pathname, href) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-[60] border-b border-slate-200/70 bg-[#f7f6f2]/90 font-sans backdrop-blur-xl">
      <div className="relative mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[84px] lg:px-12">
        <Link
          href="/"
          aria-label="MNCo Juara - Beranda"
          className="group flex shrink-0 items-center gap-2.5 rounded-xl transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
        >
          <img
            src="/logo-mnco.png"
            alt=""
            className="h-9 w-auto object-contain sm:h-10"
          />
          <span className="flex flex-col">
            <span className="text-lg font-bold leading-none tracking-[-0.04em] text-slate-950 sm:text-xl">
              MNCo Juara
            </span>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.17em] text-amber-700 sm:text-[10px]">
              Konsultan & Hukum
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/75 p-1.5 shadow-[0_8px_28px_rgba(31,41,55,0.05)] lg:flex">
          {navItems.map((item, index) => {
            const isActive = isActiveRoute(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                  isActive
                    ? "bg-slate-950 text-white shadow-[0_6px_18px_rgba(15,23,42,0.12)]"
                    : "text-slate-600 hover:bg-amber-50 hover:text-amber-800"
                }`}
              >
                <span
                  className={`text-[9px] font-bold tracking-wide transition-colors ${
                    isActive
                      ? "text-amber-300"
                      : "text-slate-400 group-hover:text-amber-600"
                  }`}
                >
                  0{index + 1}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <Link
            href="/kontak"
            className="group inline-flex items-center gap-3 rounded-full bg-amber-400 px-5 py-3 text-[13px] font-bold text-slate-950 shadow-[0_10px_28px_rgba(180,120,24,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-[0_16px_34px_rgba(180,120,24,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
          >
            Konsultasi
            <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-950/10 transition-transform duration-300 group-hover:translate-x-0.5">
              <svg
                className="h-3.5 w-3.5"
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
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white/80 text-slate-800 shadow-[0_6px_20px_rgba(31,41,55,0.06)] transition duration-300 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 lg:hidden"
        >
          <svg
            className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M6 6l12 12M18 6L6 18"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M4 7h16M4 12h16M4 17h16"
              />
            )}
          </svg>
        </button>

        <div
          id="mobile-navigation"
          className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] origin-top px-4 transition duration-200 ease-out lg:hidden ${
            isOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-[0.98] opacity-0"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-3 shadow-[0_24px_60px_rgba(31,41,55,0.13)] backdrop-blur-xl">
            <div className="mb-2 flex items-center justify-between px-3 pb-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Jelajahi MNCo
              </span>
              <span className="h-px w-10 bg-amber-300" />
            </div>

            <div className="flex flex-col">
              {navItems.map((item, index) => {
                const isActive = isActiveRoute(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    tabIndex={isOpen ? 0 : -1}
                    className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-amber-600 ${
                      isActive
                        ? "bg-amber-50 text-amber-900"
                        : "text-slate-700 hover:bg-slate-50 hover:text-amber-800"
                    }`}
                  >
                    <span
                      className={`w-6 text-[10px] font-bold ${
                        isActive ? "text-amber-700" : "text-slate-400"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    {item.label}
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-500" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 border-t border-slate-100 pt-3">
              <Link
                href="/kontak"
                tabIndex={isOpen ? 0 : -1}
                className="group flex min-h-12 items-center justify-between rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition duration-300 hover:bg-amber-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                Konsultasi Sekarang
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
          </div>
        </div>
      </div>
    </nav>
  );
}
