import { useState } from 'react'

const fallback = 'linear-gradient(160deg, #e7e0d2 0%, #d4cbba 50%, #3f3a34 100%)'

export function TempleImage({
  src,
  alt,
  priority = false,
  defer = false,
  className = '',
  aspect = 'photo',
}: {
  src: string
  alt: string
  priority?: boolean
  /** Hidden until the visitor opens the stop. Lazy and low priority. */
  defer?: boolean
  className?: string
  aspect?: 'photo' | 'hero' | 'square' | 'tall'
}) {
  const [failed, setFailed] = useState(false)
  const ratio =
    aspect === 'hero'
      ? 'aspect-[16/10] md:aspect-[21/9]'
      : aspect === 'square'
        ? 'aspect-square'
        : aspect === 'tall'
          ? 'aspect-[3/4]'
          : 'aspect-[4/3]'

  return (
    <div
      className={`relative overflow-hidden bg-stone ${ratio} ${className}`}
      style={failed ? { backgroundImage: fallback } : undefined}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          width={aspect === 'hero' ? 1600 : aspect === 'tall' ? 800 : 960}
          height={aspect === 'hero' ? 900 : aspect === 'tall' ? 1066 : 720}
          className="size-full object-cover"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : defer ? 'low' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-end p-4">
          <svg viewBox="0 0 32 32" className="size-10 text-ink/20" aria-hidden="true">
            <path fill="currentColor" d="M8 26V10h4v16H8zm12 0V10h4v16h-4z" />
            <rect x="14" y="6" width="4" height="4" fill="#9C3B2E" opacity="0.5" />
          </svg>
        </div>
      )}
    </div>
  )
}
