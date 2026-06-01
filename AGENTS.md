# AGENTS.md — TeknoMesin Architecture Guide

This document describes the project architecture for AI agents working on this codebase.

## Project Type

Next.js 14 App Router site using Static Site Generation (SSG). No database — content is stored as Markdown files read at build time.

## Directory Structure

```
/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout: fonts, Netlify Identity script
│   ├── globals.css           # Tailwind base imports
│   ├── page.tsx              # Homepage: hero + product grid
│   └── products/[slug]/
│       └── page.tsx          # Dynamic product detail page
├── content/
│   └── products/             # Markdown product files (CMS-managed)
│       └── *.md              # Frontmatter: title, sku, category, images[], specs[], whatsapp_number
├── public/
│   ├── admin/
│   │   ├── index.html        # Decap CMS entry point
│   │   └── config.yml        # CMS backend + collection config
│   └── uploads/              # Media uploaded via CMS
├── netlify.toml              # Build config + @netlify/plugin-nextjs
├── tailwind.config.ts        # Custom colors: industrial-* and accent-*
└── package.json
```

## Key Conventions

- **Content source of truth**: `content/products/*.md` files. The CMS reads/writes these via git-gateway.
- **Product slug**: derived from the filename (without `.md`).
- **Markdown parsing**: `gray-matter` splits frontmatter from body text at build time — no runtime parsing.
- **Images**: either Cloudinary URLs or `/uploads/` relative paths (stored in `public/uploads/`).
- **WhatsApp number**: stored with country code (e.g., `+6281234567890`); non-numeric chars are stripped in code before building the `wa.me` URL.
- **Tailwind colors**: `industrial-*` (dark blue-gray palette) and `accent-*` (orange); defined in `tailwind.config.ts`.

## CMS Schema (content/products/*.md)

```yaml
title: string
sku: string
category: string (select)
images: list of image URLs or paths
specs: list of strings (format: "Key: Value" for table rendering)
whatsapp_number: string (with country code)
body: markdown content (description)
```

## Netlify Identity

Enabled via the skill script. The Identity widget script is loaded in `app/layout.tsx` and redirects to `/admin/` after login. The CMS admin at `public/admin/index.html` also loads the identity widget independently.

## Adding Features

- New pages: add files under `app/`
- New CMS fields: update `public/admin/config.yml` and the TypeScript interfaces in `app/products/[slug]/page.tsx`
- New product categories: add to the `options` list in `config.yml`
- Cloudinary: uncomment the `media_library` block in `config.yml` and set credentials in Netlify environment variables
