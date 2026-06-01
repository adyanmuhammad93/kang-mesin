import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCategories, getCategoryBySlug, getSiteUrl } from '@/lib/products'

export async function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug)
  if (!category) return { title: 'Kategori Tidak Ditemukan' }

  return {
    title: `${category.name} | Katalog TeknoMesin`,
    description: category.description,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      url: `/categories/${category.slug}`,
      siteName: 'TeknoMesin',
      title: `${category.name} | Katalog TeknoMesin`,
      description: category.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | Katalog TeknoMesin`,
      description: category.description,
    },
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug)
  if (!category) notFound()

  const categoryUrl = `${getSiteUrl()}/categories/${category.slug}`
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.name} TeknoMesin`,
    description: category.description,
    url: categoryUrl,
    numberOfItems: category.products.length,
    itemListElement: category.products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${getSiteUrl()}/products/${product.slug}`,
      name: product.data.title,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
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
          <Link href="/#products" className="text-sm font-medium text-industrial-300 hover:text-white transition-colors">
            Kembali ke Katalog
          </Link>
        </nav>
      </header>

      <main className="bg-gray-50 min-h-screen">
        <section className="bg-industrial-950 text-white border-t border-industrial-800">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <p className="text-accent-500 font-semibold mb-3">Kategori Produk</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">{category.name}</h1>
            <p className="text-industrial-300 text-lg max-w-3xl leading-relaxed">{category.description}</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-industrial-900">Produk dalam kategori ini</h2>
              <p className="text-industrial-500 mt-2">{category.products.length} produk tersedia untuk konsultasi dan custom.</p>
            </div>
            <Link href="/" className="hidden md:inline-flex text-accent-600 font-semibold hover:text-accent-700">
              Lihat semua produk
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.products.map((product) => (
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
                    <div className="flex items-center justify-center h-full text-industrial-300">Tidak ada gambar</div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-industrial-400 font-mono mb-1.5">SKU: {product.data.sku}</p>
                  <h3 className="font-semibold text-industrial-900 leading-snug group-hover:text-accent-600 transition-colors line-clamp-2">
                    {product.data.title}
                  </h3>
                  <div className="mt-3 flex items-center text-accent-500 text-sm font-medium">Lihat Detail →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
