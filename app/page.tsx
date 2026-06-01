import Image from 'next/image'
import Link from 'next/link'
import { getCategories, getProducts } from '@/lib/products'

export default function HomePage() {
  const products = getProducts()
  const categories = getCategories()

  return (
    <>
      {/* Navigation */}
      <header className="bg-industrial-950 text-white">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent-500 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">TeknoMesin</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-industrial-300">
            <Link href="/#products" className="hover:text-white transition-colors">Produk</Link>
            <Link href="/#about" className="hover:text-white transition-colors">Keunggulan</Link>
            <Link href="/#contact" className="hover:text-white transition-colors">Kontak</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-industrial-950 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent-500/20 border border-accent-500/30 rounded-full px-4 py-1.5 text-accent-500 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></span>
              Spesialis Mesin Industri Makanan & UMKM
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              Mesin Industri Makanan
              <span className="block text-accent-500">Custom & Siap Produksi.</span>
            </h1>
            <p className="text-industrial-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Katalog mesin pengolahan makanan stainless steel untuk UMKM dan industri: cooker mixer, pengaduk bumbu, dough mixer, spinner peniris minyak, dan wajan stainless custom.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#products"
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
              >
                Lihat Katalog
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <a
                href="https://wa.me/6281222397424?text=Halo,%20saya%20ingin%20mengetahui%20lebih%20lanjut%20tentang%20produk%20mesin%20industri%20Anda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Konsultasi WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-industrial-800">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: 'Custom', label: 'Ukuran & Kapasitas' },
                { value: 'SS', label: 'Material Food Grade' },
                { value: 'UMKM', label: 'hingga Industri' },
                { value: 'WA', label: 'Konsultasi Cepat' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-industrial-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Produk Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 mb-3">Katalog Mesin Industri Makanan</h2>
            <p className="text-industrial-500 text-lg max-w-2xl">
              Pilih mesin pengolahan makanan sesuai kebutuhan produksi Anda, mulai dari mesin mixer adonan, pengaduk bumbu, cooker mixer, spinner minyak, hingga wajan stainless custom.
            </p>
          </div>

          {categories.length > 0 && (
            <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:border-accent-500 hover:shadow-md transition-all"
                >
                  <div className="text-sm font-semibold text-accent-600 mb-2">{category.products.length} produk</div>
                  <h3 className="font-bold text-industrial-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-industrial-500 line-clamp-2">{category.description}</p>
                </Link>
              ))}
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-center py-20 text-industrial-400">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-lg font-medium">Belum ada produk</p>
              <p className="text-sm mt-1">Tambahkan produk melalui CMS di /admin</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-accent-500 hover:shadow-lg transition-all duration-200"
                >
                  <div className="relative h-52 bg-industrial-100 overflow-hidden">
                    {product.data.image ? (
                      <Image
                        src={product.data.image}
                        alt={product.data.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-industrial-300">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-industrial-900/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {product.data.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-industrial-400 font-mono mb-1.5">SKU: {product.data.sku}</p>
                    <h3 className="font-semibold text-industrial-900 leading-snug group-hover:text-accent-600 transition-colors line-clamp-2">
                      {product.data.title}
                    </h3>
                    <div className="mt-3 flex items-center text-accent-500 text-sm font-medium">
                      Lihat Detail
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Keunggulan / Value Props */}
      <section id="about" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 mb-6">
                Kenapa Memilih TeknoMesin?
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: '⚙️',
                    title: 'Material Food Grade',
                    desc: 'Mesin dibuat dengan material stainless steel yang higienis, kuat, dan mudah dibersihkan untuk produksi makanan.',
                  },
                  {
                    icon: '🔧',
                    title: 'Konsultasi Kebutuhan Produksi',
                    desc: 'Kami membantu memilih kapasitas, desain, dan spesifikasi mesin sesuai kebutuhan usaha Anda.',
                  },
                  {
                    icon: '🚚',
                    title: 'Pengerjaan Custom',
                    desc: 'Ukuran, kapasitas, dan sistem kerja mesin dapat disesuaikan untuk skala UMKM hingga industri.',
                  },
                  {
                    icon: '📋',
                    title: 'Siap untuk Produksi',
                    desc: 'Pilihan mesin untuk pengolahan snack, adonan, bumbu, dodol, selai, dan kebutuhan dapur produksi.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-industrial-900 mb-1">{item.title}</h3>
                      <p className="text-industrial-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-industrial-950 rounded-2xl p-6 text-white">
                <div className="text-4xl font-extrabold text-accent-500 mb-2">Custom</div>
                <div className="text-industrial-300 text-sm">Pengalaman produksi mesin</div>
              </div>
              <div className="bg-accent-500 rounded-2xl p-6 text-white mt-8">
                <div className="text-4xl font-extrabold mb-2">UMKM</div>
                <div className="text-orange-100 text-sm">Konsultasi kebutuhan usaha</div>
              </div>
              <div className="bg-industrial-100 rounded-2xl p-6 text-industrial-900 mt-[-16px]">
                <div className="text-4xl font-extrabold mb-2">Food</div>
                <div className="text-industrial-500 text-sm">Mesin custom dan siap pakai</div>
              </div>
              <div className="bg-industrial-800 rounded-2xl p-6 text-white">
                <div className="text-4xl font-extrabold text-white mb-2">WA</div>
                <div className="text-industrial-300 text-sm">Respons via WhatsApp</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontak / CTA */}
      <section id="contact" className="py-20 bg-industrial-950 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Konsultasi Kebutuhan Mesin?</h2>
          <p className="text-industrial-300 text-lg mb-10 max-w-xl mx-auto">
            Tim kami siap membantu memilih mesin industri makanan yang sesuai dengan kapasitas dan alur produksi Anda.
          </p>
          <a
            href="https://wa.me/6281222397424?text=Halo,%20saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20mesin%20industri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-green-900/30"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Hubungi via WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-industrial-950 border-t border-industrial-800 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-industrial-500 text-sm">
          <div>© {new Date().getFullYear()} TeknoMesin. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/admin" className="hover:text-white transition-colors">Admin CMS</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
