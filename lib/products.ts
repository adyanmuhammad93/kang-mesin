import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProductData {
  title: string;
  sku: string;
  category: string;
  image: string;
  images: string[];
  specs: string[];
  whatsapp_number: string;
  meta_description?: string;
}

export interface Product {
  slug: string;
  data: ProductData;
  content: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
  description: string;
  products: Product[];
}

export interface LandingStat {
  value: string;
  label: string;
}

export interface LandingStep {
  title: string;
  desc: string;
}

export interface LandingBenefit {
  icon: string;
  title: string;
  desc: string;
}

export interface LandingInfoCard {
  value: string;
  label: string;
}

export interface SiteSettings {
  og_image: string;
  site_name: string;
  site_tagline: string;
  logo_image: string;
  favicon: string;
  site_title: string;
  meta_description: string;
  whatsapp_number: string;
  whatsapp_message: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_highlight: string;
  hero_description: string;
  hero_primary_label: string;
  hero_primary_url: string;
  hero_secondary_label: string;
  hero_card_eyebrow: string;
  hero_card_title: string;
  hero_feature_points: string[];
  hero_badge_title: string;
  hero_badge_text: string;
  landing_stats: LandingStat[];
  products_eyebrow: string;
  products_title: string;
  products_description: string;
  products_cta_label: string;
  order_eyebrow: string;
  order_title: string;
  order_steps: LandingStep[];
  about_eyebrow: string;
  about_title: string;
  about_benefits: LandingBenefit[];
  about_cards: LandingInfoCard[];
  contact_eyebrow: string;
  contact_title: string;
  contact_description: string;
  contact_cta_label: string;
  maps_eyebrow: string;
  maps_title: string;
  maps_description: string;
  maps_embed_url: string;
  maps_link_url: string;
  footer_text: string;
  footer_tagline: string;
  theme_preset: string;
  font_family: string;
  primary_color: string;
  primary_color_dark: string;
  success_color: string;
  background_color: string;
  surface_color: string;
  text_color: string;
  card_radius: string;
  button_radius: string;
}

const productsDir = path.join(process.cwd(), "content/products");
const siteSettingsPath = path.join(process.cwd(), "content/site/settings.md");

const defaultSiteSettings: SiteSettings = {
  og_image: "/uploads/1716812295249.jpg",
  site_name: "TeknoMesin",
  site_tagline: "Mesin industri makanan",
  logo_image: "",
  favicon: "/favicon.svg",
  site_title: "TeknoMesin | Mesin Industri Makanan Kustom",
  meta_description:
    "TeknoMesin menyediakan mesin industri makanan baja nirkarat untuk UMKM dan industri, termasuk mesin pemasak-pengaduk, mesin peniris minyak, mesin pengaduk adonan, pengaduk bumbu, dan wajan kustom.",
  whatsapp_number: "+6281222397424",
  whatsapp_message:
    "Halo, saya ingin konsultasi mesin industri makanan untuk kebutuhan produksi saya",
  hero_eyebrow: "Spesialis Mesin Industri Makanan & UMKM",
  hero_title: "Naikkan Kapasitas Produksi dengan",
  hero_highlight: "Mesin Kustom Siap Kerja.",
  hero_description:
    "TeknoMesin membantu pelaku UMKM hingga industri memilih mesin pengolahan makanan baja nirkarat yang higienis, kuat, dan bisa disesuaikan dengan alur produksi.",
  hero_primary_label: "Lihat Katalog Mesin",
  hero_primary_url: "/#products",
  hero_secondary_label: "Tanya Harga & Kapasitas",
  hero_card_eyebrow: "Produk favorit pelanggan",
  hero_card_title: "Mesin siap dikonsultasikan",
  hero_feature_points: [
    "Konsultasi ukuran & kapasitas",
    "Material baja nirkarat aman pangan",
    "Pilihan mesin siap pakai dan kustom",
  ],
  hero_badge_title: "Kustom kapasitas produksi",
  hero_badge_text: "dari UMKM hingga industri",
  landing_stats: [
    { value: "{products}+", label: "Produk katalog" },
    { value: "{categories}+", label: "Kategori mesin" },
    { value: "SS", label: "Material aman pangan" },
    { value: "WA", label: "Konsultasi cepat" },
  ],
  products_eyebrow: "Katalog pilihan",
  products_title: "Mesin Industri Makanan untuk Produksi Harian",
  products_description:
    "Pilih mesin sesuai proses kerja Anda: pengaduk adonan, pengaduk bumbu, pemasak-pengaduk, peniris minyak, hingga wajan baja nirkarat kustom.",
  products_cta_label: "Butuh rekomendasi? Chat WhatsApp",
  order_eyebrow: "Alur pembelian",
  order_title: "Mudah Mulai dari Konsultasi sampai Mesin Siap Produksi",
  order_steps: [
    {
      title: "Ceritakan Produk",
      desc: "Sampaikan jenis makanan, kapasitas harian, dan proses produksi yang ingin dibantu mesin.",
    },
    {
      title: "Pilih Spesifikasi",
      desc: "Kami bantu sesuaikan ukuran, material, sistem penggerak, dan kebutuhan kustom.",
    },
    {
      title: "Konfirmasi Penawaran",
      desc: "Dapatkan arahan produk yang cocok beserta opsi spesifikasi untuk kebutuhan usaha.",
    },
    {
      title: "Mesin Diproduksi",
      desc: "Unit dibuat untuk mendukung proses kerja yang lebih higienis, cepat, dan konsisten.",
    },
  ],
  about_eyebrow: "Alasan pembeli percaya",
  about_title: "Kenapa Memilih TeknoMesin?",
  about_benefits: [
    {
      icon: "⚙️",
      title: "Material Aman Pangan",
      desc: "Produk menggunakan baja nirkarat yang tahan lama, mudah dibersihkan, dan mendukung standar higienis produksi makanan.",
    },
    {
      icon: "🔧",
      title: "Konsultasi Kebutuhan Produksi",
      desc: "Kami membantu memilih kapasitas, desain, dan spesifikasi mesin sesuai kebutuhan usaha Anda.",
    },
    {
      icon: "🚚",
      title: "Pengerjaan Kustom",
      desc: "Ukuran, kapasitas, dan sistem kerja mesin dapat disesuaikan untuk skala UMKM hingga industri.",
    },
    {
      icon: "📋",
      title: "Siap untuk Produksi",
      desc: "Pilihan mesin untuk pengolahan makanan ringan, adonan, bumbu, dodol, selai, dan kebutuhan dapur produksi.",
    },
  ],
  about_cards: [
    { value: "Kustom", label: "Ukuran dan kapasitas menyesuaikan produksi" },
    { value: "UMKM", label: "Cocok untuk pengembangan usaha" },
    { value: "Pangan", label: "Material higienis dan mudah dirawat" },
    { value: "WA", label: "Respons konsultasi via WhatsApp" },
  ],
  contact_eyebrow: "Konsultasi gratis",
  contact_title: "Siap Konsultasi Kebutuhan Mesin?",
  contact_description:
    "Kirim kebutuhan produksi Anda. Tim kami siap membantu merekomendasikan mesin, kapasitas, dan spesifikasi yang paling sesuai.",
  contact_cta_label: "Hubungi via WhatsApp",
  maps_eyebrow: "Lokasi kami",
  maps_title: "Temukan TeknoMesin di Google Maps",
  maps_description:
    "Lihat lokasi kami di Google Maps atau hubungi WhatsApp untuk arahan kunjungan dan konsultasi kebutuhan mesin.",
  maps_embed_url: "https://www.google.com/maps?q=TeknoMesin&output=embed",
  maps_link_url: "https://www.google.com/maps/search/?api=1&query=TeknoMesin",
  footer_text: "TeknoMesin. Hak cipta dilindungi.",
  footer_tagline: "Mesin Industri Makanan • Baja Nirkarat • Kustom",
  theme_preset: "Ant Design Blue",
  font_family: "Inter, system-ui, sans-serif",
  primary_color: "#1677ff",
  primary_color_dark: "#0958d9",
  success_color: "#52c41a",
  background_color: "#f5f7fa",
  surface_color: "#ffffff",
  text_color: "#0f172a",
  card_radius: "1rem",
  button_radius: "0.75rem",
};

function asRecord(value: unknown) {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

function getSettingValue(
  data: Record<string, unknown>,
  section: Record<string, unknown>,
  key: string,
) {
  return section[key] ?? data[key];
}

function asString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function asStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback;

  const items = value.filter(
    (item): item is string => typeof item === "string" && Boolean(item.trim()),
  );
  return items.length > 0 ? items : fallback;
}

function asTypedArray<T>(
  value: unknown,
  fallback: T[],
  isValid: (item: unknown) => item is T,
) {
  if (!Array.isArray(value)) return fallback;

  const items = value.filter(isValid);
  return items.length > 0 ? items : fallback;
}

function isLandingStat(item: unknown): item is LandingStat {
  return Boolean(
    item &&
    typeof item === "object" &&
    "value" in item &&
    typeof item.value === "string" &&
    "label" in item &&
    typeof item.label === "string",
  );
}

function isLandingStep(item: unknown): item is LandingStep {
  return Boolean(
    item &&
    typeof item === "object" &&
    "title" in item &&
    typeof item.title === "string" &&
    "desc" in item &&
    typeof item.desc === "string",
  );
}

function isLandingBenefit(item: unknown): item is LandingBenefit {
  return Boolean(
    item &&
    typeof item === "object" &&
    "icon" in item &&
    typeof item.icon === "string" &&
    "title" in item &&
    typeof item.title === "string" &&
    "desc" in item &&
    typeof item.desc === "string",
  );
}

function isLandingInfoCard(item: unknown): item is LandingInfoCard {
  return Boolean(
    item &&
    typeof item === "object" &&
    "value" in item &&
    typeof item.value === "string" &&
    "label" in item &&
    typeof item.label === "string",
  );
}

function normalizeSiteSettings(data: Record<string, unknown>): SiteSettings {
  const seo = asRecord(data.seo_section);
  const brand = asRecord(data.brand_section);
  const design = asRecord(data.design_section);
  const whatsapp = asRecord(data.whatsapp_section);
  const hero = asRecord(data.hero_section);
  const products = asRecord(data.products_section);
  const order = asRecord(data.order_section);
  const about = asRecord(data.about_section);
  const contact = asRecord(data.contact_section);

  return {
    og_image: asString(
      getSettingValue(data, seo, "og_image"),
      defaultSiteSettings.og_image,
    ),
    site_name: asString(
      getSettingValue(data, brand, "site_name"),
      defaultSiteSettings.site_name,
    ),
    site_tagline: asString(
      getSettingValue(data, brand, "site_tagline"),
      defaultSiteSettings.site_tagline,
    ),
    logo_image: asString(
      getSettingValue(data, brand, "logo_image"),
      defaultSiteSettings.logo_image,
    ),
    favicon: asString(
      getSettingValue(data, brand, "favicon"),
      defaultSiteSettings.favicon,
    ),
    site_title: asString(
      getSettingValue(data, seo, "site_title"),
      defaultSiteSettings.site_title,
    ),
    meta_description: asString(
      getSettingValue(data, seo, "meta_description"),
      defaultSiteSettings.meta_description,
    ),
    whatsapp_number: asString(
      getSettingValue(data, whatsapp, "whatsapp_number"),
      defaultSiteSettings.whatsapp_number,
    ),
    whatsapp_message: asString(
      getSettingValue(data, whatsapp, "whatsapp_message"),
      defaultSiteSettings.whatsapp_message,
    ),
    hero_eyebrow: asString(
      getSettingValue(data, hero, "hero_eyebrow"),
      defaultSiteSettings.hero_eyebrow,
    ),
    hero_title: asString(
      getSettingValue(data, hero, "hero_title"),
      defaultSiteSettings.hero_title,
    ),
    hero_highlight: asString(
      getSettingValue(data, hero, "hero_highlight"),
      defaultSiteSettings.hero_highlight,
    ),
    hero_description: asString(
      getSettingValue(data, hero, "hero_description"),
      defaultSiteSettings.hero_description,
    ),
    hero_primary_label: asString(
      getSettingValue(data, hero, "hero_primary_label"),
      defaultSiteSettings.hero_primary_label,
    ),
    hero_primary_url: asString(
      getSettingValue(data, hero, "hero_primary_url"),
      defaultSiteSettings.hero_primary_url,
    ),
    hero_secondary_label: asString(
      getSettingValue(data, hero, "hero_secondary_label"),
      defaultSiteSettings.hero_secondary_label,
    ),
    hero_card_eyebrow: asString(
      getSettingValue(data, hero, "hero_card_eyebrow"),
      defaultSiteSettings.hero_card_eyebrow,
    ),
    hero_card_title: asString(
      getSettingValue(data, hero, "hero_card_title"),
      defaultSiteSettings.hero_card_title,
    ),
    hero_feature_points: asStringArray(
      getSettingValue(data, hero, "hero_feature_points"),
      defaultSiteSettings.hero_feature_points,
    ),
    hero_badge_title: asString(
      getSettingValue(data, hero, "hero_badge_title"),
      defaultSiteSettings.hero_badge_title,
    ),
    hero_badge_text: asString(
      getSettingValue(data, hero, "hero_badge_text"),
      defaultSiteSettings.hero_badge_text,
    ),
    landing_stats: asTypedArray(
      data.landing_stats,
      defaultSiteSettings.landing_stats,
      isLandingStat,
    ),
    products_eyebrow: asString(
      getSettingValue(data, products, "products_eyebrow"),
      defaultSiteSettings.products_eyebrow,
    ),
    products_title: asString(
      getSettingValue(data, products, "products_title"),
      defaultSiteSettings.products_title,
    ),
    products_description: asString(
      getSettingValue(data, products, "products_description"),
      defaultSiteSettings.products_description,
    ),
    products_cta_label: asString(
      getSettingValue(data, products, "products_cta_label"),
      defaultSiteSettings.products_cta_label,
    ),
    order_eyebrow: asString(
      getSettingValue(data, order, "order_eyebrow"),
      defaultSiteSettings.order_eyebrow,
    ),
    order_title: asString(
      getSettingValue(data, order, "order_title"),
      defaultSiteSettings.order_title,
    ),
    order_steps: asTypedArray(
      getSettingValue(data, order, "order_steps"),
      defaultSiteSettings.order_steps,
      isLandingStep,
    ),
    about_eyebrow: asString(
      getSettingValue(data, about, "about_eyebrow"),
      defaultSiteSettings.about_eyebrow,
    ),
    about_title: asString(
      getSettingValue(data, about, "about_title"),
      defaultSiteSettings.about_title,
    ),
    about_benefits: asTypedArray(
      getSettingValue(data, about, "about_benefits"),
      defaultSiteSettings.about_benefits,
      isLandingBenefit,
    ),
    about_cards: asTypedArray(
      getSettingValue(data, about, "about_cards"),
      defaultSiteSettings.about_cards,
      isLandingInfoCard,
    ),
    contact_eyebrow: asString(
      getSettingValue(data, contact, "contact_eyebrow"),
      defaultSiteSettings.contact_eyebrow,
    ),
    contact_title: asString(
      getSettingValue(data, contact, "contact_title"),
      defaultSiteSettings.contact_title,
    ),
    contact_description: asString(
      getSettingValue(data, contact, "contact_description"),
      defaultSiteSettings.contact_description,
    ),
    contact_cta_label: asString(
      getSettingValue(data, contact, "contact_cta_label"),
      defaultSiteSettings.contact_cta_label,
    ),
    maps_eyebrow: asString(
      getSettingValue(data, contact, "maps_eyebrow"),
      defaultSiteSettings.maps_eyebrow,
    ),
    maps_title: asString(
      getSettingValue(data, contact, "maps_title"),
      defaultSiteSettings.maps_title,
    ),
    maps_description: asString(
      getSettingValue(data, contact, "maps_description"),
      defaultSiteSettings.maps_description,
    ),
    maps_embed_url: asString(
      getSettingValue(data, contact, "maps_embed_url"),
      defaultSiteSettings.maps_embed_url,
    ),
    maps_link_url: asString(
      getSettingValue(data, contact, "maps_link_url"),
      defaultSiteSettings.maps_link_url,
    ),
    footer_text: asString(
      getSettingValue(data, contact, "footer_text"),
      defaultSiteSettings.footer_text,
    ),
    footer_tagline: asString(
      getSettingValue(data, contact, "footer_tagline"),
      defaultSiteSettings.footer_tagline,
    ),
    theme_preset: asString(
      getSettingValue(data, design, "theme_preset"),
      defaultSiteSettings.theme_preset,
    ),
    font_family: asString(
      getSettingValue(data, design, "font_family"),
      defaultSiteSettings.font_family,
    ),
    primary_color: asString(
      getSettingValue(data, design, "primary_color"),
      defaultSiteSettings.primary_color,
    ),
    primary_color_dark: asString(
      getSettingValue(data, design, "primary_color_dark"),
      defaultSiteSettings.primary_color_dark,
    ),
    success_color: asString(
      getSettingValue(data, design, "success_color"),
      defaultSiteSettings.success_color,
    ),
    background_color: asString(
      getSettingValue(data, design, "background_color"),
      defaultSiteSettings.background_color,
    ),
    surface_color: asString(
      getSettingValue(data, design, "surface_color"),
      defaultSiteSettings.surface_color,
    ),
    text_color: asString(
      getSettingValue(data, design, "text_color"),
      defaultSiteSettings.text_color,
    ),
    card_radius: asString(
      getSettingValue(data, design, "card_radius"),
      defaultSiteSettings.card_radius,
    ),
    button_radius: asString(
      getSettingValue(data, design, "button_radius"),
      defaultSiteSettings.button_radius,
    ),
  };
}
export function stripMarkdown(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createMetaDescription(
  product: Pick<Product, "data" | "content">,
) {
  const description =
    product.data.meta_description || stripMarkdown(product.content);
  return (
    description.slice(0, 157).trimEnd() +
    (description.length > 157 ? "..." : "")
  );
}

function getImageValue(value: unknown) {
  if (typeof value === "string") return value.trim();
  if (
    value &&
    typeof value === "object" &&
    "image" in value &&
    typeof value.image === "string"
  ) {
    return value.image.trim();
  }

  return "";
}

function normalizeProductImages(data: Record<string, unknown>) {
  const imageList = Array.isArray(data.images)
    ? data.images.map(getImageValue).filter(Boolean)
    : [];

  const legacyImage = getImageValue(data.image);
  const images =
    imageList.length > 0 ? imageList : legacyImage ? [legacyImage] : [];

  return {
    image: images[0] ?? "",
    images,
  };
}

export function getProducts(): Product[] {
  if (!fs.existsSync(productsDir)) return [];

  return fs
    .readdirSync(productsDir)
    .filter((filename) => filename.endsWith(".md"))
    .sort()
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(productsDir, filename), "utf-8");
      const { data, content } = matter(raw);

      const images = normalizeProductImages(data);

      return {
        slug,
        data: {
          title: data.title ?? "",
          sku: data.sku ?? "",
          category: data.category ?? "",
          image: images.image,
          images: images.images,
          specs: data.specs ?? [],
          whatsapp_number: data.whatsapp_number ?? "",
          meta_description: data.meta_description ?? "",
        },
        content,
      };
    });
}

export function getProduct(slug: string) {
  return getProducts().find((product) => product.slug === slug) ?? null;
}

export function createCategoryDescription(
  categoryName: string,
  productCount: number,
) {
  return `Temukan ${productCount} pilihan ${categoryName.toLowerCase()} dari TeknoMesin untuk kebutuhan produksi makanan UMKM hingga industri, dengan opsi kustom sesuai kapasitas usaha.`;
}

export function getCategories(): ProductCategory[] {
  const categoryMap = new Map<string, Product[]>();

  getProducts().forEach((product) => {
    const category = product.data.category || "Lainnya";
    categoryMap.set(category, [...(categoryMap.get(category) ?? []), product]);
  });

  return Array.from(categoryMap.entries())
    .map(([name, products]) => ({
      name,
      slug: slugify(name),
      description: createCategoryDescription(name, products.length),
      products,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCategoryBySlug(slug: string) {
  return getCategories().find((category) => category.slug === slug) ?? null;
}

export function getSiteSettings(): SiteSettings {
  if (!fs.existsSync(siteSettingsPath)) {
    return defaultSiteSettings;
  }

  const raw = fs.readFileSync(siteSettingsPath, "utf-8");
  const { data } = matter(raw);

  return normalizeSiteSettings(data);
}


export function createWhatsAppUrl(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  const text = encodeURIComponent(message);

  return `https://wa.me/${digits}${text ? `?text=${text}` : ""}`;
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://teknomesin.com";
}

export function resolveImageUrl(image: string) {
  if (!image) return undefined;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;

  return new URL(image, getSiteUrl()).toString();
}

export function resolveImageUrls(images: string[]) {
  return images
    .map((image) => resolveImageUrl(image))
    .filter((image): image is string => Boolean(image));
}
