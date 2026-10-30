"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navGroups = [
  {
    label: "Workspace",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      },
    ],
  },
  {
    label: "Kelola konten",
    items: [
      {
        label: "Layanan Kami",
        href: "/admin/layanan",
        icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      },
      {
        label: "Portofolio",
        href: "/admin/portofolio",
        icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
      },
      {
        label: "Insight / Artikel",
        href: "/admin/insight",
        icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
      },
    ],
  },
  {
    label: "Sistem",
    items: [
      {
        label: "Pengaturan Web",
        href: "/admin/pengaturan",
        icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      },
      {
        label: "Kelola Tim",
        href: "/admin/tim",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      },
    ],
  },
];

function isActiveRoute(pathname, href) {
  return href === "/admin" ? pathname === href : pathname.startsWith(href);
}

function NavigationGroups({ pathname, onNavigate }) {
  return navGroups.map((group) => (
    <div key={group.label} className="mb-7 last:mb-0">
      <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
        {group.label}
      </p>
      <div className="space-y-1">
        {group.items.map((item) => {
          const isActive = isActiveRoute(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={`group flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                isActive
                  ? "bg-amber-300/10 text-amber-200 ring-1 ring-inset ring-amber-200/10"
                  : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <svg
                className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                  isActive
                    ? "text-amber-300"
                    : "text-slate-500 group-hover:text-amber-200"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={item.icon}
                />
              </svg>
              <span>{item.label}</span>
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-300" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  ));
}

function PublicSiteLink({ onClick, className = "" }) {
  return (
    <Link
      href="/"
      target="_blank"
      onClick={onClick}
      className={`group flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-semibold text-slate-300 transition duration-300 hover:border-amber-300/30 hover:bg-amber-300/10 hover:text-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${className}`}
    >
      <svg
        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
      Lihat website publik
    </Link>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const currentPage =
    navGroups.flatMap((group) => group.items).find((item) =>
      isActiveRoute(pathname, item.href),
    )?.label || "Manajemen Konten";

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#f5f3ee] font-sans text-slate-800 md:flex">
      <aside className="relative hidden w-[17rem] shrink-0 flex-col bg-[#111a27] text-white shadow-[12px_0_50px_rgba(31,41,55,0.08)] md:flex">
        <div className="px-6 pb-6 pt-7">
          <Link
            href="/admin"
            className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-300 text-slate-950 shadow-[0_10px_28px_rgba(180,120,24,0.16)] transition duration-300 group-hover:rotate-[-5deg] group-hover:scale-105">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
            <span>
              <span className="block text-lg font-bold leading-none tracking-[-0.04em]">
                MNCo
              </span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-amber-300">
                Admin workspace
              </span>
            </span>
          </Link>
        </div>

        <div className="mx-5 mb-5 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-slate-500">
            Workspace
          </p>
          <p className="mt-1 text-xs font-medium text-slate-300">
            MNCo Juara Sukoharjo
          </p>
        </div>

        <nav
          aria-label="Navigasi admin"
          className="flex-1 overflow-y-auto px-4 py-3"
        >
          <NavigationGroups pathname={pathname} />
        </nav>

        <div className="mx-4 mb-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.08] text-xs font-bold text-amber-200">
              AD
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold text-white">
                Super Admin
              </span>
              <span className="mt-0.5 block truncate text-[10px] text-slate-500">
                admin@mncojuara.com
              </span>
            </span>
          </div>
          <PublicSiteLink className="w-full" />
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-[#f7f6f2]/90 backdrop-blur-xl">
          <div className="flex h-[4.5rem] items-center justify-between px-4 sm:px-7 lg:h-20 lg:px-10">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileNavOpen((open) => !open)}
                aria-label={
                  mobileNavOpen ? "Tutup navigasi admin" : "Buka navigasi admin"
                }
                aria-expanded={mobileNavOpen}
                aria-controls="admin-mobile-navigation"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-[0_6px_18px_rgba(31,41,55,0.05)] transition hover:border-amber-200 hover:text-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 md:hidden"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {mobileNavOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6l12 12M18 6L6 18"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7h16M4 12h16M4 17h16"
                    />
                  )}
                </svg>
              </button>
              <div className="min-w-0">
                <p className="truncate text-[9px] font-bold uppercase tracking-[0.17em] text-amber-700 sm:text-[10px]">
                  MNCo Juara · Admin
                </p>
                <h1 className="truncate text-sm font-semibold tracking-[-0.02em] text-slate-950 sm:text-base">
                  {currentPage}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-semibold leading-tight text-slate-800">
                  Super Admin
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  admin@mncojuara.com
                </p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-2xl border border-amber-200/80 bg-amber-50 text-xs font-bold text-amber-800 shadow-[0_6px_18px_rgba(120,83,30,0.07)]">
                AD
              </span>
            </div>
          </div>

          <div
            id="admin-mobile-navigation"
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${
              mobileNavOpen
                ? "grid-rows-[1fr] opacity-100"
                : "pointer-events-none grid-rows-[0fr] opacity-0"
            }`}
            aria-hidden={!mobileNavOpen}
          >
            <div className="overflow-hidden">
              <nav
                aria-label="Navigasi admin mobile"
                className="border-t border-slate-200/70 bg-[#111a27] px-4 py-5"
              >
                <NavigationGroups
                  pathname={pathname}
                  onNavigate={() => setMobileNavOpen(false)}
                />
                <PublicSiteLink
                  onClick={() => setMobileNavOpen(false)}
                  className="mt-4 w-full"
                />
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
