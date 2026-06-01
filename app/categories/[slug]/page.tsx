import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import { formatProductPrice, getCategories, getCategoryBySlug, getSiteUrl } from "@/lib/products";

export async function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: "Kategori Tidak Ditemukan" };

  return {
    title: `${category.name} | Katalog TeknoMesin`,
    description: category.description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: `/categories/${category.slug}`,
      siteName: "TeknoMesin",
      title: `${category.name} | Katalog TeknoMesin`,
      description: category.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | Katalog TeknoMesin`,
      description: category.description,
    },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const categoryUrl = `${getSiteUrl()}/categories/${category.slug}`;
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.name} TeknoMesin`,
    description: category.description,
    url: categoryUrl,
    numberOfItems: category.products.length,
    itemListElement: category.products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${getSiteUrl()}/products/${product.slug}`,
      name: product.data.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <SiteHeader />

      <main id="main-content" className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,#e6f4ff,transparent_36%),#fff]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
            <Link href="/#products" className="mb-6 inline-flex text-sm font-bold text-primary-600 hover:text-primary-700">← Semua produk</Link>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-primary-600">Kategori Produk</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">{category.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">{category.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-950 md:text-3xl">Produk dalam kategori ini</h2>
              <p className="mt-2 text-slate-500">{category.products.length} produk tersedia untuk konsultasi dan pesanan kustom.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.products.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="group antd-card overflow-hidden">
                <div className="relative h-52 bg-slate-100">
                  {product.data.image ? (
                    <Image src={product.data.image} alt={product.data.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-300">Tidak ada gambar</div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-mono font-semibold text-slate-400">SKU: {product.data.sku}</p>
                  <h3 className="mt-2 line-clamp-2 font-extrabold leading-snug text-slate-950 group-hover:text-primary-600">{product.data.title}</h3>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="font-extrabold text-primary-600">{formatProductPrice(product.data.price)}</p>
                    <span className="text-sm font-bold text-slate-500 group-hover:text-primary-600">Detail →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
