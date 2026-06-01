import Image from "next/image";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import {
  createWhatsAppUrl,
  formatProductPrice,
  getCategories,
  getProducts,
  getSiteSettings,
} from "@/lib/products";

export default function HomePage() {
  const products = getProducts();
  const categories = getCategories();
  const featuredProducts = products.slice(0, 3);
  const settings = getSiteSettings();
  const whatsappConsultationUrl = createWhatsAppUrl(
    settings.whatsapp_number,
    settings.whatsapp_message,
  );
  const landingStats = settings.landing_stats.map((stat) => ({
    ...stat,
    value: stat.value
      .replace("{products}", products.length.toString())
      .replace("{categories}", categories.length.toString()),
  }));

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="overflow-hidden bg-slate-50">
        <section className="relative bg-[radial-gradient(circle_at_top_left,#e6f4ff,transparent_34%),linear-gradient(135deg,#ffffff_0%,#f5f7fa_55%,#eef4ff_100%)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-bold text-primary-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-success-500" />
                {settings.hero_eyebrow}
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-6xl">
                {settings.hero_title}
                <span className="block bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  {settings.hero_highlight}
                </span>
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
                {settings.hero_description}
              </p>
              <div className="mb-9 grid gap-3 sm:grid-cols-3">
                {settings.hero_feature_points.map((item) => (
                  <div key={item} className="antd-card flex items-start gap-3 p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success-50 text-sm font-black text-success-600">
                      ✓
                    </span>
                    <span className="text-sm font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={settings.hero_primary_url} className="antd-button-primary">
                  {settings.hero_primary_label}
                  <span aria-hidden="true" className="ml-2">↓</span>
                </Link>
                <a href={whatsappConsultationUrl} target="_blank" rel="noopener noreferrer" className="antd-button-default">
                  {settings.hero_secondary_label}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary-200/70 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-success-50 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white bg-white/80 p-4 shadow-2xl shadow-primary-900/10 backdrop-blur">
                <div className="mb-4 flex items-center justify-between gap-4 px-2 pt-2">
                  <div>
                    <p className="text-sm font-bold text-primary-600">{settings.hero_card_eyebrow}</p>
                    <h2 className="text-2xl font-extrabold text-slate-950">{settings.hero_card_title}</h2>
                  </div>
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
                    {products.length} produk
                  </span>
                </div>
                <div className="grid gap-3">
                  {featuredProducts.map((product) => (
                    <Link key={product.slug} href={`/products/${product.slug}`} className="group grid grid-cols-[6rem_1fr] gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-primary-200 hover:shadow-antd">
                      <div className="relative h-24 overflow-hidden rounded-xl bg-slate-100">
                        {product.data.image ? (
                          <Image src={product.data.image} alt={product.data.title} fill sizes="96px" className="object-cover transition duration-300 group-hover:scale-105" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-slate-300">⚙️</div>
                        )}
                      </div>
                      <div className="min-w-0 py-1">
                        <p className="text-xs font-bold uppercase tracking-wide text-primary-600">{product.data.category}</p>
                        <h3 className="mt-1 line-clamp-2 font-extrabold leading-snug text-slate-900 group-hover:text-primary-600">{product.data.title}</h3>
                        <p className="mt-2 text-sm font-bold text-slate-700">{formatProductPrice(product.data.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 p-5 text-white shadow-lg shadow-primary-600/20">
                  <p className="text-lg font-extrabold">{settings.hero_badge_title}</p>
                  <p className="text-sm text-primary-100">{settings.hero_badge_text}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-y border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 md:grid-cols-4">
              {landingStats.map((stat) => (
                <div key={stat.label} className="px-4 py-6 text-center">
                  <div className="text-3xl font-black text-primary-600">{stat.value}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="scroll-mt-24 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-sm font-black uppercase tracking-[0.2em] text-primary-600">{settings.products_eyebrow}</p>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">{settings.products_title}</h2>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">{settings.products_description}</p>
              </div>
              <a href={whatsappConsultationUrl} target="_blank" rel="noopener noreferrer" className="antd-button-default w-fit">
                {settings.products_cta_label}
              </a>
            </div>

            {categories.length > 0 && (
              <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Link key={category.slug} href={`/categories/${category.slug}`} className="shrink-0 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-primary-300 hover:text-primary-600">
                    {category.name} <span className="text-slate-400">({category.products.length})</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`} className="group antd-card overflow-hidden">
                  <div className="relative h-56 bg-slate-100">
                    {product.data.image ? (
                      <Image src={product.data.image} alt={product.data.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-300">Tidak ada gambar</div>
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-primary-700 shadow-sm">{product.data.category}</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-mono font-semibold text-slate-400">SKU: {product.data.sku}</p>
                    <h3 className="mt-2 line-clamp-2 text-lg font-extrabold leading-snug text-slate-950 group-hover:text-primary-600">{product.data.title}</h3>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="font-extrabold text-primary-600">{formatProductPrice(product.data.price)}</p>
                      <span className="text-sm font-bold text-slate-500 group-hover:text-primary-600">Detail →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="scroll-mt-24 bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-black uppercase tracking-[0.2em] text-primary-600">{settings.order_eyebrow}</p>
              <h2 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">{settings.order_title}</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-4">
              {settings.order_steps.map((step, index) => (
                <div key={step.title} className="antd-card p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-lg font-black text-primary-600">{index + 1}</div>
                  <h3 className="text-lg font-extrabold text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 bg-slate-50 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-[0.2em] text-primary-600">{settings.about_eyebrow}</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">{settings.about_title}</h2>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {settings.about_cards.map((card) => (
                  <div key={`${card.value}-${card.label}`} className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm">
                    <div className="text-2xl font-black text-primary-600">{card.value}</div>
                    <div className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">{card.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {settings.about_benefits.map((benefit) => (
                <div key={benefit.title} className="antd-card p-6">
                  <div className="mb-4 text-3xl">{benefit.icon}</div>
                  <h3 className="text-lg font-extrabold text-slate-950">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-primary-300">{settings.contact_eyebrow}</p>
            <h2 className="text-3xl font-extrabold md:text-4xl">{settings.contact_title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">{settings.contact_description}</p>
            <a href={whatsappConsultationUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-xl bg-success-500 px-8 py-4 text-base font-black text-white shadow-lg shadow-success-500/20 transition hover:-translate-y-0.5 hover:bg-success-600">
              {settings.contact_cta_label}
            </a>

            <div className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-white p-3 text-left shadow-2xl shadow-black/20">
              <div className="grid overflow-hidden rounded-[1.5rem] text-slate-950 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="p-8 md:p-10">
                  <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-primary-600">{settings.maps_eyebrow}</p>
                  <h3 className="text-2xl font-extrabold md:text-3xl">{settings.maps_title}</h3>
                  <p className="mt-4 leading-relaxed text-slate-600">{settings.maps_description}</p>
                  {settings.maps_link_url && (
                    <a href={settings.maps_link_url} target="_blank" rel="noopener noreferrer" className="antd-button-primary mt-6">
                      Buka di Google Maps
                    </a>
                  )}
                </div>
                {settings.maps_embed_url ? (
                  <iframe src={settings.maps_embed_url} title={settings.maps_title} className="min-h-[22rem] w-full border-0 lg:min-h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                ) : (
                  <div className="flex min-h-[22rem] items-center justify-center bg-slate-100 p-8 text-center text-slate-500">Peta akan tampil setelah URL embed Google Maps ditambahkan melalui CMS.</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-400 sm:px-6 md:flex-row">
          <div>© {new Date().getFullYear()} {settings.footer_text}</div>
          <div>{settings.footer_tagline}</div>
        </div>
      </footer>
    </>
  );
}
