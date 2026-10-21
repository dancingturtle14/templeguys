import { useState } from 'react'

const fallback =
  'linear-gradient(145deg, #efe6d8 0%, #d6cbb8 45%, #9a7b4f 100%)'

export function TempleImage({
  src,
  alt,
  priority = false,
  className = '',
  aspect = 'photo',
}: {
  src: string
  alt: string
  priority?: boolean
  className?: string
  aspect?: 'photo' | 'hero' | 'square'
}) {
  const [failed, setFailed] = useState(false)
  const ratio =
    aspect === 'hero' ? 'aspect-[16/10] md:aspect-[21/9]' : aspect === 'square' ? 'aspect-square' : 'aspect-[4/3]'

  return (
    <div
      className={`relative overflow-hidden bg-parchment ${ratio} ${className}`}
      style={failed ? { backgroundImage: fallback } : undefined}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          width={aspect === 'hero' ? 1600 : 800}
          height={aspect === 'hero' ? 900 : 600}
          className="size-full object-cover"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-end p-4">
          <svg viewBox="0 0 120 80" className="h-16 w-24 text-ink/25" aria-hidden="true">
            <path fill="currentColor" d="M60 8 L92 40 H78 V68 H42 V40 H28 Z" />
            <rect x="52" y="48" width="16" height="20" fill="#f7f3eb" opacity="0.5" />
          </svg>
        </div>
      )}
    </div>
  )
}
