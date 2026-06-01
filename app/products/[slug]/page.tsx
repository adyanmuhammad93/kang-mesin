import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  createMetaDescription,
  getProduct,
  getProducts,
  getSiteUrl,
  resolveImageUrl,
  stripMarkdown,
} from '@/lib/products'

export async function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = getProduct(params.slug)
  if (!product) return { title: 'Produk Tidak Ditemukan' }

  const description = createMetaDescription(product)
  const image = resolveImageUrl(product.data.image)

  return {
    title: product.data.title,
    description,
    alternates: {
      canonical: `/products/${params.slug}`,
    },
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      url: `/products/${params.slug}`,
      siteName: 'TeknoMesin',
      title: `${product.data.title} | TeknoMesin`,
      description,
      images: image ? [{ url: image, alt: product.data.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.data.title} | TeknoMesin`,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug)
  if (!product) notFound()

  const { data, content } = product
  const whatsappUrl = `https://wa.me/${data.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Halo, saya tertarik dengan produk ${data.title}`
  )}`

  const description = createMetaDescription(product)
  const productUrl = `${getSiteUrl()}/products/${params.slug}`
  const imageUrl = resolveImageUrl(data.image)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.title,
    description,
    sku: data.sku,
    category: data.category,
    image: imageUrl ? [imageUrl] : undefined,
    brand: {
      '@type': 'Brand',
      name: 'TeknoMesin',
    },
    url: productUrl,
  }

  const paragraphs = content
    .split('\n\n')
    .map((paragraph) => stripMarkdown(paragraph.trim()))
    .filter(Boolean)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {/* Navigasi */}
      <header className="bg-industrial-950 text-white sticky top-0 z-40 shadow-md">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-industrial-300 hover:text-white transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Katalog
          </Link>
          <span className="text-industrial-700">/</span>
          <span className="text-industrial-400 text-sm truncate max-w-xs">{data.title}</span>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Gambar Produk */}
          <div className="sticky top-24">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-industrial-100 shadow-xl">
              {data.image ? (
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-industrial-300">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Label kategori di bawah gambar */}
            <div className="mt-4 flex items-center gap-3">
              <span className="bg-industrial-100 text-industrial-700 text-sm font-medium px-3 py-1.5 rounded-full">
                {data.category}
              </span>
              <span className="text-industrial-400 text-sm font-mono">SKU: {data.sku}</span>
            </div>
          </div>

          {/* Detail Produk */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-industrial-900 leading-tight mb-4">
                {data.title}
              </h1>

              {/* Deskripsi */}
              <div className="prose prose-slate max-w-none text-industrial-600 leading-relaxed space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Spesifikasi Teknis */}
            {data.specs && data.specs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-industrial-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Spesifikasi Teknis
                </h2>
                <div className="bg-industrial-50 rounded-xl border border-industrial-200 overflow-hidden">
                  {data.specs.map((spec, index) => {
                    const [key, ...valueParts] = spec.split(':')
                    const value = valueParts.join(':').trim()
                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-4 px-5 py-3.5 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-industrial-50'
                        } ${index !== data.specs.length - 1 ? 'border-b border-industrial-100' : ''}`}
                      >
                        <span className="text-industrial-500 font-medium text-sm min-w-0 flex-1">
                          {value ? key.trim() : spec}
                        </span>
                        {value && (
                          <span className="text-industrial-900 font-semibold text-sm text-right flex-1">
                            {value}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Ajakan WhatsApp (sebaris untuk layar besar) */}
            <div className="bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 border border-[#25D366]/30 rounded-2xl p-6">
              <p className="text-industrial-700 font-medium mb-1">Tertarik dengan produk ini?</p>
              <p className="text-industrial-500 text-sm mb-4">
                Hubungi tim kami melalui WhatsApp untuk konsultasi harga, ketersediaan, dan kebutuhan kustom.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-md shadow-green-900/20 text-base"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Tombol WhatsApp mengambang — selalu terlihat di perangkat seluler */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-5 py-3.5 rounded-full shadow-2xl shadow-green-900/40 transition-all hover:scale-105 active:scale-95"
          aria-label="Hubungi via WhatsApp"
        >
          <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="text-sm">Hubungi via WhatsApp</span>
        </a>
      </div>

      {/* Kaki halaman */}
      <footer className="mt-20 bg-industrial-950 border-t border-industrial-800 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-industrial-500 text-sm">
          <div>© {new Date().getFullYear()} TeknoMesin. Hak cipta dilindungi.</div>
          <Link href="/" className="hover:text-white transition-colors">← Kembali ke Katalog</Link>
        </div>
      </footer>
    </>
  )
}
