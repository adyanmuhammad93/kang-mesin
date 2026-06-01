import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import { getSiteSettings, getSiteUrl, resolveImageUrl } from '@/lib/products'

const siteUrl = getSiteUrl()
const siteDescription =
  'TeknoMesin menyediakan mesin industri makanan stainless steel untuk UMKM dan industri, termasuk cooker mixer, spinner peniris minyak, dough mixer, pengaduk bumbu, dan wajan custom.'
const siteOgImage = resolveImageUrl(getSiteSettings().og_image)

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TeknoMesin | Mesin Industri Makanan Custom',
    template: '%s | TeknoMesin',
  },
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'TeknoMesin',
    title: 'TeknoMesin | Mesin Industri Makanan Custom',
    description: siteDescription,
    images: siteOgImage ? [{ url: siteOgImage, alt: 'Katalog mesin industri makanan TeknoMesin' }] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeknoMesin | Mesin Industri Makanan Custom',
    description: siteDescription,
    images: siteOgImage ? [siteOgImage] : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        {/* Netlify Identity widget — handles /admin/ redirect after login */}
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">{`
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on('init', function(user) {
              if (!user) {
                window.netlifyIdentity.on('login', function() {
                  document.location.href = '/admin/';
                });
              }
            });
          }
        `}</Script>
        {children}
      </body>
    </html>
  )
}
