export function CompassMark({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? 'compass-mark compass-mark--small' : 'compass-mark'} aria-hidden="true">
      <span className="compass-mark__heart" />
      <span className="compass-mark__needle" />
    </span>
  )
}
