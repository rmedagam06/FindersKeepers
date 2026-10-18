import type { ThreeElements } from '@react-three/fiber'
import { CuteCreature } from './CuteCreature'

export function Otter3D(props: ThreeElements['group']) {
  return (
    <group {...props}>
      {/* flat tail behind */}
      <mesh position={[0, 0.14, -0.34]} rotation={[0.2, 0, 0]} scale={[0.6, 0.3, 1]}>
        <boxGeometry args={[0.2, 0.2, 0.44]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <CuteCreature bodyColor="#7078A4" />
      {/* cream muzzle patch */}
      <mesh position={[0, 0.47, 0.42]} scale={[0.9, 0.68, 0.55]}>
        <sphereGeometry args={[0.2, 14, 14]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      {/* small round ears */}
      <mesh position={[-0.3, 0.88, -0.02]}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[0.3, 0.88, -0.02]}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      {/* little shell held on the belly */}
      <mesh position={[0, 0.26, 0.2]} rotation={[-0.3, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.03, 10]} />
        <meshStandardMaterial color="#CEE2B1" />
      </mesh>
    </group>
  )
}
