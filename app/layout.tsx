import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'TeknoMesin | Industrial Machinery Catalog',
  description:
    'Leading supplier of heavy-duty industrial machinery — conveyor systems, hydraulic equipment, CNC machinery, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
