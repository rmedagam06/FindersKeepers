import { getAnimalArt } from '@/lib/assets'

interface AnimalArtProps {
  speciesId: string
  speciesName: string
  stage: 1 | 2
  size?: number
  className?: string
}

/**
 * Renders a species' SVG when its art has been supplied; otherwise falls
 * back to an initial-letter badge in the design-system palette so missing
 * art (most of the V1 catalog, until Phase 3 finishes) never shows a broken
 * image. Swapping in real art later needs no change here — see src/lib/assets.ts.
 */
export function AnimalArt({ speciesId, speciesName, stage, size = 96, className }: AnimalArtProps) {
  const src = getAnimalArt(speciesId, stage)
  if (!src) {
    return (
      <div
        className={['ds-animal-fallback', className].filter(Boolean).join(' ')}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
        aria-label={speciesName}
        title={`${speciesName} — art not yet supplied`}
      >
        {speciesName.charAt(0)}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={speciesName}
      width={size}
      height={size}
      className={className}
      style={{ aspectRatio: '1 / 1' }}
    />
  )
}
