import type { ThreeElements } from '@react-three/fiber'
import { CuteCreature } from './CuteCreature'

export function Fox3D(props: ThreeElements['group']) {
  return (
    <group {...props}>
      {/* bushy tail peeking from behind */}
      <mesh position={[0, 0.2, -0.32]} scale={[1, 1, 1.3]}>
        <sphereGeometry args={[0.2, 14, 14]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[0, 0.2, -0.46]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <CuteCreature bodyColor="#7078A4" />
      {/* cream muzzle patch */}
      <mesh position={[0, 0.46, 0.42]} scale={[0.85, 0.65, 0.5]}>
        <sphereGeometry args={[0.2, 14, 14]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      {/* pointy ears */}
      <mesh position={[-0.26, 0.98, 0]} rotation={[0, 0, 0.15]}>
        <coneGeometry args={[0.13, 0.26, 10]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[0.26, 0.98, 0]} rotation={[0, 0, -0.15]}>
        <coneGeometry args={[0.13, 0.26, 10]} />
        <meshStandardMaterial color="#7078A4" />
      </mesh>
      <mesh position={[-0.26, 0.95, 0.02]} rotation={[0, 0, 0.15]}>
        <coneGeometry args={[0.07, 0.14, 10]} />
        <meshStandardMaterial color="#F292AA" />
      </mesh>
      <mesh position={[0.26, 0.95, 0.02]} rotation={[0, 0, -0.15]}>
        <coneGeometry args={[0.07, 0.14, 10]} />
        <meshStandardMaterial color="#F292AA" />
      </mesh>
    </group>
  )
}
