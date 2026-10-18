import type { ThreeElements } from '@react-three/fiber'
import { CuteCreature } from './CuteCreature'

export function Bunny3D(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <CuteCreature bodyColor="#FFFED6" />
      {/* long tall ears */}
      <mesh position={[-0.16, 1.1, 0]} rotation={[0, 0, -0.08]}>
        <capsuleGeometry args={[0.09, 0.42, 4, 10]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[0.16, 1.1, 0]} rotation={[0, 0, 0.08]}>
        <capsuleGeometry args={[0.09, 0.42, 4, 10]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
      <mesh position={[-0.16, 1.1, 0.03]} scale={[0.5, 0.85, 0.3]} rotation={[0, 0, -0.08]}>
        <capsuleGeometry args={[0.07, 0.36, 4, 10]} />
        <meshStandardMaterial color="#F292AA" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.16, 1.1, 0.03]} scale={[0.5, 0.85, 0.3]} rotation={[0, 0, 0.08]}>
        <capsuleGeometry args={[0.07, 0.36, 4, 10]} />
        <meshStandardMaterial color="#F292AA" transparent opacity={0.6} />
      </mesh>
      {/* tiny round tail */}
      <mesh position={[0, 0.15, -0.3]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#FFFED6" />
      </mesh>
    </group>
  )
}
