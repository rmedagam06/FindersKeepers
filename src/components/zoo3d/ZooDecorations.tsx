/** Small fixed-position decorative props per theme — what actually makes
 * the yard read as a meadow/beach/snowfield instead of a bare colored disc. */

function Bush({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
      <mesh position={[0.17, 0.12, 0.1]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial color="#CEE2B1" />
      </mesh>
      <mesh position={[-0.16, 0.1, -0.08]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
    </group>
  )
}

function Flower({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 6]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
      <mesh position={[0, 0.21, 0]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}

function Pond({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.6, 24]} />
      <meshStandardMaterial color="#71BCB7" />
    </mesh>
  )
}

function PalmTree({ position }: { position: [number, number, number] }) {
  const fronds = [0, 1, 2, 3, 4]
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.05, 0.08, 1, 8]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      {fronds.map((i) => {
        const angle = (i / fronds.length) * Math.PI * 2
        return (
          <mesh key={i} position={[0, 1.05, 0]} rotation={[0.6, angle, 0]}>
            <coneGeometry args={[0.1, 0.5, 6]} />
            <meshStandardMaterial color="#98C48D" />
          </mesh>
        )
      })}
    </group>
  )
}

function PineTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.3, 8]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.28, 0.5, 10]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <coneGeometry args={[0.2, 0.4, 10]} />
        <meshStandardMaterial color="#CEE2B1" />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <coneGeometry args={[0.12, 0.3, 10]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
    </group>
  )
}

function Snowman({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.2, 14, 14]} />
        <meshStandardMaterial color="#FFFDF0" />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.14, 14, 14]} />
        <meshStandardMaterial color="#FFFDF0" />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.1, 14, 14]} />
        <meshStandardMaterial color="#FFFDF0" />
      </mesh>
      <mesh position={[-0.03, 0.62, 0.08]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
      <mesh position={[0.03, 0.62, 0.08]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#3F466F" />
      </mesh>
    </group>
  )
}

export function ZooDecorations({ themeId }: { themeId: string }) {
  if (themeId === 'beach') {
    return (
      <>
        <PalmTree position={[-3.4, 0, -2.6]} />
        <PalmTree position={[3.2, 0, -3.0]} />
        <mesh position={[2.4, 0.03, 3.0]}>
          <sphereGeometry args={[0.12, 10, 10]} />
          <meshStandardMaterial color="#F8F4C9" />
        </mesh>
        <mesh position={[-2.6, 0.02, 3.1]}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshStandardMaterial color="#FFFED6" />
        </mesh>
      </>
    )
  }

  if (themeId === 'snow') {
    return (
      <>
        <PineTree position={[-3.3, 0, -2.4]} />
        <PineTree position={[3.4, 0, -1.8]} />
        <PineTree position={[-3.0, 0, 2.6]} />
        <Snowman position={[2.9, 0, 2.8]} />
      </>
    )
  }

  return (
    <>
      <Bush position={[-3.3, 0, -2.2]} />
      <Bush position={[3.2, 0, -2.6]} />
      <Bush position={[-2.6, 0, 3.0]} />
      <Flower position={[1.8, 0, 3.0]} color="#F292AA" />
      <Flower position={[2.2, 0, 2.6]} color="#FFFED6" />
      <Flower position={[-1.6, 0, -3.1]} color="#F292AA" />
      <Pond position={[3.0, 0.01, 1.4]} />
    </>
  )
}
