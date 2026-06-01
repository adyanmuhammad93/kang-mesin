import Link from 'next/link'
import { getCategories } from '@/lib/products'

const whatsappUrl =
  'https://wa.me/6281222397424?text=Halo,%20saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20mesin%20industri'

function Logo() {
  return (
    <Link
      href="/"
      className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500"
      aria-label="Beranda TeknoMesin"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-500 shadow-lg shadow-accent-950/20">
        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <span className="truncate text-xl font-extrabold tracking-tight text-white">TeknoMesin</span>
    </Link>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-semibold text-industrial-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
    >
      {children}
    </Link>
  )
}

export default function SiteHeader() {
  const categories = getCategories()

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-industrial-950/95 text-white shadow-xl shadow-industrial-950/10 backdrop-blur supports-[backdrop-filter]:bg-industrial-950/85">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Lewati ke konten utama
      </a>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6" aria-label="Navigasi utama">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          <NavLink href="/#products">Produk</NavLink>
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-industrial-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500">
              Kategori
              <svg className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-industrial-800 bg-white p-2 text-industrial-900 shadow-2xl">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="block rounded-xl px-4 py-3 transition-colors hover:bg-industrial-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500"
                >
                  <span className="block text-sm font-bold text-industrial-900">{category.name}</span>
                  <span className="mt-1 block text-xs text-industrial-500">{category.products.length} produk tersedia</span>
                </Link>
              ))}
            </div>
          </details>
          <NavLink href="/#about">Keunggulan</NavLink>
          <NavLink href="/#contact">Kontak</NavLink>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-950/20 transition-colors hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Konsultasi
          </a>
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500">
            Menu
            <svg className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <div className="absolute right-0 mt-3 w-[min(88vw,22rem)] overflow-hidden rounded-2xl border border-industrial-800 bg-white p-3 text-industrial-900 shadow-2xl">
            <div className="grid gap-1">
              <Link href="/#products" className="rounded-xl px-4 py-3 font-bold hover:bg-industrial-50">Lihat Katalog</Link>
              <Link href="/#about" className="rounded-xl px-4 py-3 font-bold hover:bg-industrial-50">Keunggulan</Link>
              <Link href="/#contact" className="rounded-xl px-4 py-3 font-bold hover:bg-industrial-50">Kontak</Link>
            </div>
            {categories.length > 0 && (
              <div className="mt-3 border-t border-industrial-100 pt-3">
                <p className="px-4 pb-2 text-xs font-bold uppercase tracking-wide text-industrial-400">Kategori Produk</p>
                <div className="grid max-h-64 gap-1 overflow-y-auto">
                  {categories.map((category) => (
                    <Link key={category.slug} href={`/categories/${category.slug}`} className="rounded-xl px-4 py-3 hover:bg-industrial-50">
                      <span className="block text-sm font-bold">{category.name}</span>
                      <span className="text-xs text-industrial-500">{category.products.length} produk</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white"
            >
              Konsultasi via WhatsApp
            </a>
          </div>
        </details>
      </nav>
    </header>
  )
}
