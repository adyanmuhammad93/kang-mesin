'use client'

import { useState } from 'react'

type ProductShareProps = {
  title: string
  url: string
  description: string
}

export default function ProductShare({ title, url, description }: ProductShareProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  const shareText = `Lihat produk ${title} dari TeknoMesin: ${url}`
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`

  const handleNativeShare = async () => {
    if (!navigator.share) {
      await handleCopyLink()
      return
    }

    try {
      await navigator.share({
        title,
        text: description,
        url,
      })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      await handleCopyLink()
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopyStatus('copied')
      window.setTimeout(() => setCopyStatus('idle'), 2500)
    } catch {
      setCopyStatus('error')
      window.setTimeout(() => setCopyStatus('idle'), 2500)
    }
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="share-product-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">Bagikan produk</p>
          <h2 id="share-product-title" className="mt-1 text-lg font-bold text-slate-950">
            Rekomendasikan produk ini
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Kirim tautan produk ke rekan atau tim pembelian Anda.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-success-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-success-500/20 transition-colors hover:bg-success-600 focus:outline-none focus:ring-4 focus:ring-success-500/25"
            aria-label={`Bagikan ${title} ke WhatsApp`}
          >
            <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>

          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
          >
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l10-7v14L7 12zM5 12h2" />
            </svg>
            Share
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-500/10"
          >
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7V5a2 2 0 00-2-2H6a2 2 0 00-2 2v9a2 2 0 002 2h0" />
            </svg>
            Salin link
          </button>
        </div>
      </div>

      <p className="mt-3 min-h-5 text-sm font-medium text-slate-500" aria-live="polite">
        {copyStatus === 'copied' && 'Link produk berhasil disalin.'}
        {copyStatus === 'error' && 'Link belum bisa disalin otomatis. Silakan salin dari alamat browser.'}
      </p>
    </section>
  )
}
