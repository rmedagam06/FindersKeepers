/**
 * Shared kawaii/chibi base: a dominant big head, a small mostly-hidden
 * body, big glossy eyes (pupil + highlight), nose, and blush. Every
 * species wraps this and adds its own accent shapes (ears/tail/beak/etc.)
 * on top — keeping proportions consistent is what reads as "cute" rather
 * than the earlier more anatomically-literal, more geometric attempt.
 */
export function CuteCreature({
  bodyColor,
  noseColor = '#3F466F',
  blushColor = '#F292AA',
}: {
  bodyColor: string
  noseColor?: string
  blushColor?: string
}) {
  return (
    <>
      {/* body — small, tucked low and behind so the head dominates */}
      <mesh position={[0, 0.17, -0.08]} scale={[1, 0.8, 0.85]}>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      {/* little arm nubs */}
      <mesh position={[-0.25, 0.17, 0]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      <mesh position={[0.25, 0.17, 0]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      {/* head — the dominant feature */}
      <mesh position={[0, 0.56, 0.04]}>
        <sphereGeometry args={[0.46, 24, 24]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      {/* small simple dot eyes, closely spaced — not big glossy spheres */}
      <mesh position={[-0.14, 0.58, 0.49]} scale={[0.8, 1, 0.6]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      <mesh position={[0.14, 0.58, 0.49]} scale={[0.8, 1, 0.6]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      <mesh position={[-0.11, 0.61, 0.52]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.17, 0.61, 0.52]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* nose */}
      <mesh position={[0, 0.46, 0.53]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={noseColor} />
      </mesh>
      {/* big prominent blush — bolder than a subtle highlight */}
      <mesh position={[-0.32, 0.44, 0.32]} scale={[1, 0.75, 0.4]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color={blushColor} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0.32, 0.44, 0.32]} scale={[1, 0.75, 0.4]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color={blushColor} transparent opacity={0.7} />
      </mesh>
    </>
  )
}
