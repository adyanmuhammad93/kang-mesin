import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  createMetaDescription,
  formatProductPrice,
  getProduct,
  getProducts,
  getSiteSettings,
  getSiteUrl,
  resolveImageUrls,
  stripMarkdown,
} from "@/lib/products";
import SiteHeader from "@/app/components/SiteHeader";
import ProductGallery from "./ProductGallery";
import ProductShare from "./ProductShare";

export async function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProduct(params.slug);
  const settings = getSiteSettings();
  if (!product) return { title: "Produk Tidak Ditemukan" };

  const description = createMetaDescription(product);
  const images = resolveImageUrls(product.data.images);

  return {
    title: product.data.title,
    description,
    alternates: { canonical: `/products/${params.slug}` },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: `/products/${params.slug}`,
      siteName: settings.site_name,
      title: `${product.data.title} | ${settings.site_name}`,
      description,
      images: images.length > 0 ? images.map((image) => ({ url: image, alt: product.data.title })) : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.data.title} | ${settings.site_name}`,
      description,
      images: images.length > 0 ? images : undefined,
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const { data, content } = product;
  const settings = getSiteSettings();
  const whatsappUrl = `https://wa.me/${data.whatsapp_number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Halo, saya tertarik dengan produk ${data.title}`,
  )}`;

  const description = createMetaDescription(product);
  const productUrl = `${getSiteUrl()}/products/${params.slug}`;
  const imageUrls = resolveImageUrls(data.images);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.title,
    description,
    sku: data.sku,
    category: data.category,
    image: imageUrls.length > 0 ? imageUrls : undefined,
    brand: { "@type": "Brand", name: settings.site_name },
    url: productUrl,
  };

  const paragraphs = content
    .split("\n\n")
    .map((paragraph) => stripMarkdown(paragraph.trim()))
    .filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <SiteHeader />

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-slate-500 sm:px-6">
          <Link href="/" className="font-bold hover:text-[var(--theme-primary)]">Katalog</Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-slate-800">{data.title}</span>
        </div>
      </div>

      <main id="main-content" className="bg-[var(--theme-background)]">
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:py-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={data.images} title={data.title} />
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-[var(--theme-primary-dark)]">{data.category}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-mono font-bold text-slate-500">SKU: {data.sku}</span>
              </div>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl">{data.title}</h1>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-bold text-[var(--theme-primary)]">Harga & kapasitas</p>
                <p className="mt-1 text-2xl font-black text-slate-950">Konsultasikan via WhatsApp</p>
                <p className="mt-2 text-sm text-slate-600">Harga tidak ditampilkan agar tim bisa memberi rekomendasi sesuai kapasitas, material, dan kebutuhan kustom Anda.</p>
              </div>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
                {paragraphs.map((p, i) => (<p key={i}>{p}</p>))}
              </div>
            </div>

            {data.specs && data.specs.length > 0 && (
              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8" aria-labelledby="spec-title">
                <h2 id="spec-title" className="mb-5 text-xl font-extrabold text-slate-950">Spesifikasi Teknis</h2>
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  {data.specs.map((spec, index) => {
                    const [key, ...valueParts] = spec.split(":");
                    const value = valueParts.join(":").trim();
                    return (
                      <div key={index} className={`grid gap-2 px-5 py-4 sm:grid-cols-[0.9fr_1.1fr] ${index % 2 === 0 ? "bg-white" : "bg-slate-50"} ${index !== data.specs.length - 1 ? "border-b border-slate-200" : ""}`}>
                        <span className="text-sm font-bold text-slate-500">{value ? key.trim() : spec}</span>
                        {value && <span className="text-sm font-extrabold text-slate-950 sm:text-right">{value}</span>}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            <ProductShare title={data.title} url={productUrl} description={description} siteName={settings.site_name} />

            <section className="rounded-[2rem] border border-success-500/20 bg-gradient-to-br from-success-50 to-white p-6 shadow-sm md:p-8">
              <p className="text-lg font-extrabold text-slate-950">Tertarik dengan produk ini?</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">Hubungi tim kami untuk konsultasi harga, ketersediaan, kapasitas, dan kebutuhan kustom.</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-xl bg-[var(--theme-success)] px-7 py-3.5 text-base font-black text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:brightness-95">
                Hubungi via WhatsApp
              </a>
            </section>
          </div>
        </section>
      </main>

      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-full bg-[var(--theme-success)] px-5 py-3.5 text-sm font-black text-white shadow-2xl shadow-slate-900/20 transition active:scale-95" aria-label="Hubungi via WhatsApp">
          WhatsApp
        </a>
      </div>

      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-400 sm:px-6 md:flex-row">
          <div>© {new Date().getFullYear()} {settings.footer_text}</div>
          <Link href="/" className="font-semibold transition hover:text-white">← Kembali ke Katalog</Link>
        </div>
      </footer>
    </>
  );
}
