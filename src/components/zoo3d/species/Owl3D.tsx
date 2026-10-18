import type { ThreeElements } from '@react-three/fiber'
import { CuteCreature } from './CuteCreature'

export function Owl3D(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <CuteCreature bodyColor="#98C48D" noseColor="#F292AA" />
      {/* wings, bigger than the base arm nubs so they read as wings instead */}
      <mesh position={[-0.3, 0.2, 0]} rotation={[0, 0, 0.4]} scale={[0.6, 1, 0.6]}>
        <sphereGeometry args={[0.2, 14, 14]} />
        <meshStandardMaterial color="#CEE2B1" />
      </mesh>
      <mesh position={[0.3, 0.2, 0]} rotation={[0, 0, -0.4]} scale={[0.6, 1, 0.6]}>
        <sphereGeometry args={[0.2, 14, 14]} />
        <meshStandardMaterial color="#CEE2B1" />
      </mesh>
      {/* ear tufts */}
      <mesh position={[-0.18, 0.98, 0.04]} rotation={[0, 0, 0.2]}>
        <coneGeometry args={[0.07, 0.16, 8]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
      <mesh position={[0.18, 0.98, 0.04]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.07, 0.16, 8]} />
        <meshStandardMaterial color="#98C48D" />
      </mesh>
      {/* small beak, below the base nose */}
      <mesh position={[0, 0.42, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.045, 0.1, 8]} />
        <meshStandardMaterial color="#F292AA" />
      </mesh>
    </group>
  )
}
