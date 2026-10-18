const LEG_POSITIONS: [number, number, number][] = [
  [-0.18, 0.08, -0.15],
  [0.18, 0.08, -0.15],
  [-0.18, 0.08, 0.15],
  [0.18, 0.08, 0.15],
]

export function Legs({ color }: { color: string }) {
  return (
    <>
      {LEG_POSITIONS.map((position, i) => (
        <mesh key={i} position={position}>
          <cylinderGeometry args={[0.07, 0.07, 0.16, 8]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </>
  )
}
