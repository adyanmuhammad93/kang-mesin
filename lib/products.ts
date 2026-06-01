import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ProductData {
  title: string
  sku: string
  category: string
  image: string
  specs: string[]
  whatsapp_number: string
  meta_description?: string
}

export interface Product {
  slug: string
  data: ProductData
  content: string
}

export interface ProductCategory {
  name: string
  slug: string
  description: string
  products: Product[]
}

export interface SiteSettings {
  og_image: string
}

const productsDir = path.join(process.cwd(), 'content/products')
const siteSettingsPath = path.join(process.cwd(), 'content/site/settings.md')

export function stripMarkdown(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function createMetaDescription(product: Pick<Product, 'data' | 'content'>) {
  const description = product.data.meta_description || stripMarkdown(product.content)
  return description.slice(0, 157).trimEnd() + (description.length > 157 ? '...' : '')
}

export function getProducts(): Product[] {
  if (!fs.existsSync(productsDir)) return []

  return fs
    .readdirSync(productsDir)
    .filter((filename) => filename.endsWith('.md'))
    .sort()
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(productsDir, filename), 'utf-8')
      const { data, content } = matter(raw)

      return {
        slug,
        data: {
          title: data.title ?? '',
          sku: data.sku ?? '',
          category: data.category ?? '',
          image: data.image ?? '',
          specs: data.specs ?? [],
          whatsapp_number: data.whatsapp_number ?? '',
          meta_description: data.meta_description ?? '',
        },
        content,
      }
    })
}

export function getProduct(slug: string) {
  return getProducts().find((product) => product.slug === slug) ?? null
}

export function createCategoryDescription(categoryName: string, productCount: number) {
  return `Temukan ${productCount} pilihan ${categoryName.toLowerCase()} dari TeknoMesin untuk kebutuhan produksi makanan UMKM hingga industri, dengan opsi kustom sesuai kapasitas usaha.`
}

export function getCategories(): ProductCategory[] {
  const categoryMap = new Map<string, Product[]>()

  getProducts().forEach((product) => {
    const category = product.data.category || 'Lainnya'
    categoryMap.set(category, [...(categoryMap.get(category) ?? []), product])
  })

  return Array.from(categoryMap.entries())
    .map(([name, products]) => ({
      name,
      slug: slugify(name),
      description: createCategoryDescription(name, products.length),
      products,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getCategoryBySlug(slug: string) {
  return getCategories().find((category) => category.slug === slug) ?? null
}

export function getSiteSettings(): SiteSettings {
  if (!fs.existsSync(siteSettingsPath)) {
    return { og_image: '' }
  }

  const raw = fs.readFileSync(siteSettingsPath, 'utf-8')
  const { data } = matter(raw)

  return {
    og_image: data.og_image ?? '',
  }
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://teknomesin.com'
}

export function resolveImageUrl(image: string) {
  if (!image) return undefined
  if (image.startsWith('http://') || image.startsWith('https://')) return image

  return new URL(image, getSiteUrl()).toString()
}
