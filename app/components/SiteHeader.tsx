import Link from "next/link";
import { createWhatsAppUrl, getCategories, getSiteSettings } from "@/lib/products";

export default function SiteHeader() {
  const settings = getSiteSettings();
  const categories = getCategories();
  const whatsappUrl = createWhatsAppUrl(
    settings.whatsapp_number,
    settings.whatsapp_message,
  );

  const navItems = [
    { href: "/#products", label: "Produk" },
    { href: "/#process", label: "Proses" },
    { href: "/#about", label: "Keunggulan" },
    { href: "/#contact", label: "Kontak" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Lewati ke konten utama
      </a>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="TeknoMesin Beranda">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 text-lg font-black text-white shadow-lg shadow-primary-600/25 transition-transform group-hover:-translate-y-0.5">
            TM
          </span>
          <span>
            <span className="block text-lg font-extrabold tracking-tight text-slate-950">
              TeknoMesin
            </span>
            <span className="block text-xs font-semibold text-slate-500">
              Mesin industri makanan
            </span>
          </span>
        </Link>

        <div className="hidden items-center rounded-full border border-slate-200 bg-slate-50/80 p-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-primary-600 hover:shadow-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {categories.length > 0 && (
            <details className="group relative">
              <summary className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-200 hover:text-primary-600">
                Kategori
                <span className="text-xs transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="block rounded-xl px-4 py-3 transition hover:bg-primary-50"
                  >
                    <span className="block text-sm font-bold text-slate-900">{category.name}</span>
                    <span className="text-xs text-slate-500">{category.products.length} produk tersedia</span>
                  </Link>
                ))}
              </div>
            </details>
          )}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary-600/25 transition hover:-translate-y-0.5 hover:bg-primary-700"
          >
            Konsultasi WA
          </a>
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm">
            <span className="sr-only">Buka menu</span>
            ☰
          </summary>
          <div className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/15">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-primary-50 hover:text-primary-700">
                  {item.label}
                </Link>
              ))}
            </div>
            {categories.length > 0 && (
              <div className="mt-3 border-t border-slate-100 pt-3">
                <p className="px-4 pb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Kategori Produk</p>
                {categories.map((category) => (
                  <Link key={category.slug} href={`/categories/${category.slug}`} className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex justify-center rounded-xl bg-primary-600 px-4 py-3 text-sm font-bold text-white">
              Konsultasi via WhatsApp
            </a>
          </div>
        </details>
      </nav>
    </header>
  );
}
