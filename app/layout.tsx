import type { CSSProperties } from "react";
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { getSiteSettings, getSiteUrl, resolveImageUrl } from "@/lib/products";

const siteUrl = getSiteUrl();
const siteSettings = getSiteSettings();
const siteName = siteSettings.site_name;
const siteTitle = siteSettings.site_title;
const siteDescription = siteSettings.meta_description;
const siteOgImage = resolveImageUrl(siteSettings.og_image);
const siteFavicon = siteSettings.favicon || "/favicon.ico";

type ThemeStyle = CSSProperties & Record<`--${string}`, string>;

const themeStyle: ThemeStyle = {
  "--theme-primary": siteSettings.primary_color,
  "--theme-primary-dark": siteSettings.primary_color_dark,
  "--theme-success": siteSettings.success_color,
  "--theme-background": siteSettings.background_color,
  "--theme-surface": siteSettings.surface_color,
  "--theme-text": siteSettings.text_color,
  "--theme-font": siteSettings.font_family,
  "--theme-card-radius": siteSettings.card_radius,
  "--theme-button-radius": siteSettings.button_radius,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: siteFavicon,
    shortcut: siteFavicon,
    apple: siteFavicon,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: siteOgImage
      ? [{ url: siteOgImage, alt: `Katalog mesin industri makanan ${siteName}` }]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: siteOgImage ? [siteOgImage] : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sans antialiased"
        data-theme-preset={siteSettings.theme_preset}
        style={themeStyle}
      >
        {/* Widget Netlify Identity — menangani pengalihan ke /admin/ setelah masuk */}
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
  );
}
