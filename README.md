# TeknoMesin — Industrial Machinery Catalog

A professional B2B industrial machinery catalog built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Decap CMS**, deployed on Netlify.

## Features

- **Product Catalog** — responsive grid homepage listing all machinery products with image, title, and category
- **Product Detail Pages** — full product pages with large image, description, technical specification table, and WhatsApp CTA
- **Decap CMS** — git-based headless CMS at `/admin` for managing products without code
- **Netlify Identity** — admin authentication for CMS access
- **WhatsApp Integration** — floating and inline CTA buttons linking directly to WhatsApp chat

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, SSG) |
| Styling | Tailwind CSS |
| CMS | Decap CMS (git-gateway) |
| Auth | Netlify Identity |
| Content | Markdown files via `gray-matter` |
| Hosting | Netlify |

## Local Development

```bash
npm install
netlify dev   # starts at http://localhost:8888
```

> Use `netlify dev` (not `npm run dev`) to ensure Netlify Identity and git-gateway work correctly in development.

## CMS Access

Navigate to `/admin` to log into the CMS. You must:
1. Enable Identity in your Netlify project settings
2. Invite yourself as a user
3. Enable git-gateway in **Netlify > Identity > Services**

## Content

Product markdown files live in `content/products/`. Each file is named by slug and contains frontmatter with: `title`, `sku`, `category`, `image`, `specs` (list), and `whatsapp_number`.
