import Image from "next/image";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import {
  createWhatsAppUrl,
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

      <main id="main-content">
        {/* Bagian Hero */}
        <section className="relative overflow-hidden bg-industrial-950 text-white">
          {/* Pola latar belakang */}
          <div className="absolute inset-0 opacity-5">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="absolute -right-28 top-16 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/20 px-4 py-1.5 text-sm font-medium text-accent-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent-500"></span>
                {settings.hero_eyebrow}
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                {settings.hero_title}
                <span className="block text-accent-500">
                  {settings.hero_highlight}
                </span>
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-industrial-300 md:text-xl">
                {settings.hero_description}
              </p>
              <div className="mb-10 grid gap-3 sm:grid-cols-3">
                {settings.hero_feature_points.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-industrial-100"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-xs text-white">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={settings.hero_primary_url}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-accent-600"
                >
                  {settings.hero_primary_label}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
                <a
                  href={whatsappConsultationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {settings.hero_secondary_label}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
                <div className="rounded-[1.5rem] bg-white p-4 text-industrial-900">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-accent-600">
                        {settings.hero_card_eyebrow}
                      </p>
                      <h2 className="text-xl font-bold">
                        {settings.hero_card_title}
                      </h2>
                    </div>
                    <span className="rounded-full bg-industrial-100 px-3 py-1 text-xs font-bold text-industrial-600">
                      {products.length} produk
                    </span>
                  </div>
                  {featuredProducts.length > 0 ? (
                    <div className="grid gap-3">
                      {featuredProducts.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/products/${product.slug}`}
                          className="group grid grid-cols-[5.5rem_1fr] gap-3 rounded-2xl border border-industrial-100 p-3 transition-all hover:border-accent-500 hover:shadow-md"
                        >
                          <div className="relative h-20 overflow-hidden rounded-xl bg-industrial-100">
                            {product.data.image ? (
                              <Image
                                src={product.data.image}
                                alt={product.data.title}
                                fill
                                sizes="88px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-industrial-300">
                                ⚙️
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-accent-600">
                              {product.data.category}
                            </p>
                            <h3 className="line-clamp-2 font-bold leading-snug group-hover:text-accent-600">
                              {product.data.title}
                            </h3>
                            <p className="mt-1 text-xs text-industrial-500">
                              Lihat detail & konsultasi spesifikasi →
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-industrial-50 p-6 text-center text-industrial-500">
                      Produk akan tampil setelah ditambahkan melalui CMS.
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute -bottom-5 -left-4 rounded-2xl bg-accent-500 px-5 py-4 font-bold text-white shadow-xl">
                {settings.hero_badge_title}
                <span className="block text-sm font-medium text-orange-100">
                  {settings.hero_badge_text}
                </span>
              </div>
            </div>
          </div>

          {/* Bilah statistik */}
          <div className="relative border-t border-industrial-800">
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {landingStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white md:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-industrial-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bagian Produk */}
        <section id="products" className="scroll-mt-24 bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-accent-600">
                  {settings.products_eyebrow}
                </p>
                <h2 className="mb-3 text-3xl font-bold text-industrial-900 md:text-4xl">
                  {settings.products_title}
                </h2>
                <p className="max-w-2xl text-lg text-industrial-500">
                  {settings.products_description}
                </p>
              </div>
              <a
                href={whatsappConsultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-xl bg-industrial-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-industrial-800"
              >
                {settings.products_cta_label}
              </a>
            </div>

            {categories.length > 0 && (
              <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-accent-500 hover:shadow-md"
                  >
                    <div className="mb-2 text-sm font-semibold text-accent-600">
                      {category.products.length} produk
                    </div>
                    <h3 className="mb-2 font-bold text-industrial-900">
                      {category.name}
                    </h3>
                    <p className="line-clamp-2 text-sm text-industrial-500">
                      {category.description}
                    </p>
                  </Link>
                ))}
              </div>
            )}

            {products.length === 0 ? (
              <div className="py-20 text-center text-industrial-400">
                <svg
                  className="mx-auto mb-4 h-16 w-16 opacity-40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <p className="text-lg font-medium">Belum ada produk</p>
                <p className="mt-1 text-sm">
                  Tambahkan produk melalui CMS di /admin
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:border-accent-500 hover:shadow-lg"
                  >
                    <div className="relative h-52 overflow-hidden bg-industrial-100">
                      {product.data.image ? (
                        <Image
                          src={product.data.image}
                          alt={product.data.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-industrial-300">
                          <svg
                            className="h-16 w-16"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-industrial-900/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {product.data.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="mb-1.5 font-mono text-xs text-industrial-400">
                        SKU: {product.data.sku}
                      </p>
                      <h3 className="line-clamp-2 font-semibold leading-snug text-industrial-900 transition-colors group-hover:text-accent-600">
                        {product.data.title}
                      </h3>
                      {product.data.specs.length > 0 && (
                        <ul className="mt-3 space-y-1 border-t border-industrial-100 pt-3 text-xs text-industrial-500">
                          {product.data.specs.slice(0, 2).map((spec) => (
                            <li key={spec} className="line-clamp-1">
                              • {spec}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-4 flex items-center justify-between text-sm font-medium text-accent-500">
                        <span>Lihat Detail</span>
                        <span className="rounded-full bg-accent-50 px-3 py-1 transition-transform group-hover:translate-x-1">
                          Konsultasi →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Cara Pemesanan */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 max-w-2xl">
              <p className="mb-2 text-sm font-bold uppercase tracking-wide text-accent-600">
                {settings.order_eyebrow}
              </p>
              <h2 className="text-3xl font-bold text-industrial-900 md:text-4xl">
                {settings.order_title}
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-4">
              {settings.order_steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-industrial-100 bg-industrial-50 p-6"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-accent-500 font-extrabold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-industrial-900">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-industrial-500">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Keunggulan */}
        <section
          id="about"
          className="scroll-mt-24 border-t border-gray-100 bg-white py-20"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-16 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-accent-600">
                  {settings.about_eyebrow}
                </p>
                <h2 className="mb-6 text-3xl font-bold text-industrial-900 md:text-4xl">
                  {settings.about_title}
                </h2>
                <div className="space-y-5">
                  {settings.about_benefits.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <span className="mt-0.5 flex-shrink-0 text-2xl">
                        {item.icon}
                      </span>
                      <div>
                        <h3 className="mb-1 font-semibold text-industrial-900">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-industrial-500">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {settings.about_cards.map((card, index) => {
                  const styles = [
                    "bg-industrial-950 text-white [&_div:last-child]:text-industrial-300 [&_div:first-child]:text-accent-500",
                    "mt-8 bg-accent-500 text-white [&_div:last-child]:text-orange-100",
                    "mt-[-16px] bg-industrial-100 text-industrial-900 [&_div:last-child]:text-industrial-500",
                    "bg-industrial-800 text-white [&_div:last-child]:text-industrial-300",
                  ];

                  return (
                    <div
                      key={`${card.value}-${card.label}`}
                      className={`rounded-2xl p-6 ${styles[index % styles.length]}`}
                    >
                      <div className="mb-2 text-4xl font-extrabold">
                        {card.value}
                      </div>
                      <div className="text-sm">{card.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Kontak / Ajakan Bertindak */}
        <section
          id="contact"
          className="scroll-mt-24 bg-industrial-950 py-20 text-white"
        >
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-accent-500">
              {settings.contact_eyebrow}
            </p>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              {settings.contact_title}
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-industrial-300">
              {settings.contact_description}
            </p>
            <a
              href={whatsappConsultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-green-900/30 transition-colors hover:bg-[#20bd5a]"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {settings.contact_cta_label}
            </a>

            <div className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-3 text-left shadow-2xl shadow-black/20 backdrop-blur">
              <div className="grid gap-0 overflow-hidden rounded-[1.5rem] bg-white text-industrial-900 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="p-8 md:p-10">
                  <p className="mb-3 text-sm font-bold uppercase tracking-wide text-accent-600">
                    {settings.maps_eyebrow}
                  </p>
                  <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                    {settings.maps_title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-industrial-500">
                    {settings.maps_description}
                  </p>
                  {settings.maps_link_url && (
                    <a
                      href={settings.maps_link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-industrial-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-industrial-800"
                    >
                      Buka di Google Maps
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-6-10h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
                {settings.maps_embed_url ? (
                  <iframe
                    src={settings.maps_embed_url}
                    title={settings.maps_title}
                    className="min-h-[22rem] w-full border-0 lg:min-h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex min-h-[22rem] items-center justify-center bg-industrial-100 p-8 text-center text-industrial-500">
                    Peta akan tampil setelah URL embed Google Maps ditambahkan
                    melalui CMS.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Kaki halaman */}
      <footer className="border-t border-industrial-800 bg-industrial-950 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-industrial-500 md:flex-row">
          <div>
            © {new Date().getFullYear()} {settings.footer_text}
          </div>
          <div>{settings.footer_tagline}</div>
        </div>
      </footer>
    </>
  );
}
